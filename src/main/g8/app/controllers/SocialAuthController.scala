package controllers

import akka.util.ByteString
import javax.inject.Inject
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.impl.providers._
import models.services.UserService
import play.api.Logger
import play.api.cache.AsyncCacheApi
import play.api.http.HttpEntity
import play.api.i18n.{ I18nSupport, Messages }
import play.api.libs.json.{ JsNull, JsObject, JsValue, Json }
import play.api.mvc._
import play.shaded.ahc.io.netty.handler.codec.http.QueryStringDecoder
import utils.auth.DefaultEnv

import scala.collection.JavaConverters._
import scala.concurrent.{ ExecutionContext, Future }
import scala.concurrent.duration._

/**
 * The social auth controller.
 *
 * @param components The ControllerComponents.
 * @param silhouette The Silhouette stack.
 * @param userService The user service implementation.
 * @param authInfoRepository The auth info service implementation.
 * @param socialProviderRegistry The social provider registry.
 */
class SocialAuthController @Inject() (
  components: ControllerComponents,
  silhouette: Silhouette[DefaultEnv],
  userService: UserService,
  authInfoRepository: AuthInfoRepository,
  socialProviderRegistry: SocialProviderRegistry,
  cache: AsyncCacheApi)(implicit ec: ExecutionContext)
  extends AbstractController(components) with I18nSupport {

  def getAuthenticationPayload(maybeBody: Option[JsValue]): JsValue = {
    maybeBody match {
      case Some(body) =>
        body.\("oauthData").asOpt[JsObject] match {
          case Some(data) =>
            // this request is coming from a successful flow on ng2-ui-auth, let's take this part only
            data
          case None =>
            body
        }
      case _ =>
        JsNull
    }
  }

  /**
   * Authenticates a user against a social provider.
   *
   * @param provider The ID of the provider to authenticate against.
   * @return The result to display.
   */
  def authenticate(provider: String) = Action.async { r =>
    cacheAuthTokenForOauth1(r) { implicit request =>
      (socialProviderRegistry.get[SocialProvider](provider) match {
        case Some(p: SocialProvider with CommonSocialProfileBuilder) =>
          // build a new JSON body as our ng2-ui-auth client put the data somewhere specific
          p.authenticate()(request.withBody(AnyContentAsJson(getAuthenticationPayload(request.body.asJson)))).flatMap {
            case Left(result) =>
              // ng2-ui-auth client does not expect a redirect, but rather a
              // HTTP 200 with a json payload in case of oauth1 flow
              val updatedResult = result.header.status match {
                case SEE_OTHER if result.header.headers.get(LOCATION).isDefined =>
                  val url = new java.net.URI(result.header.headers.get(LOCATION).get)
                  val scalaParams = new QueryStringDecoder(url).parameters().asScala.map {
                    case (k, v) =>
                      k -> v.asScala
                  }
                  result.copy(
                    header = result.header.copy(status = OK),
                    body = HttpEntity.Strict(ByteString(Json.toJson(scalaParams).toString), Some("application/json"))
                  )
                case _ =>
                  result
              }
              Future.successful(updatedResult)
            case Right(authInfo) => for {
              profile <- p.retrieveProfile(authInfo)
              user <- userService.save(profile)
              _ <- authInfoRepository.save(profile.loginInfo, authInfo)
              authenticator <- silhouette.env.authenticatorService.create(profile.loginInfo)
              token <- silhouette.env.authenticatorService.init(authenticator)
            } yield {
              silhouette.env.eventBus.publish(LoginEvent(user, request))
              Ok(Json.obj("token" -> token))
            }
          }
        case _ => Future.failed(new ProviderException(s"Cannot authenticate with unexpected social provider $provider"))
      }).recover {
        case e: ProviderException =>
          Logger.error("Unexpected provider error", e)
          Unauthorized(Json.obj("message" -> Messages("could.not.authenticate")))
        case e: Exception =>
          Logger.error("Unexpected error", e)
          Unauthorized(Json.obj("message" -> Messages("could.not.authenticate")))
      }
    }
  }

  /**
   * Satellizer executes multiple requests to the same application endpoints for OAuth1.
   *
   * So this function caches the response from the OAuth provider and returns it on the second
   * request. Not nice, but it works as a temporary workaround until the bug is fixed.
   *
   * @param request The current request.
   * @param f The action to execute.
   * @return A result.
   * @see https://github.com/sahat/satellizer/issues/287
   */
  private def cacheAuthTokenForOauth1(request: Request[AnyContent])(f: Request[AnyContent] => Future[Result]): Future[Result] = {
    request.getQueryString("oauth_token") -> request.getQueryString("oauth_verifier") match {
      case (Some(token), Some(verifier)) => cache.get[Result](token + "-" + verifier).flatMap {
        case Some(result) => Future.successful(result)
        case None => f(request).map { result =>
          cache.set(token + "-" + verifier, result, 1 minute)
          result
        }
      }
      case _ => f(request)
    }
  }
}
