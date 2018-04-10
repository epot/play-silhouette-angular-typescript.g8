package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import play.api.{ Environment, Mode }
import play.api.i18n.I18nSupport
import play.api.libs.json.Json
import play.api.mvc._
import utils.auth.DefaultEnv
import play.api.libs.ws._

import scala.concurrent.{ ExecutionContext, Future }

/**
 * The basic application controller.
 *
 * @param components The ControllerComponents.
 * @param environment Environment.
 * @param silhouette The Silhouette stack.
 */
class ApplicationController @Inject() (
  ws: WSClient,
  assets: Assets,
  components: ControllerComponents,
  environment: Environment,
  silhouette: Silhouette[DefaultEnv],
  implicit val executionContext: ExecutionContext)
  extends AbstractController(components) with I18nSupport {

  /**
   * Returns the user.
   *
   * @return The result to display.
   */

  def user = silhouette.SecuredAction.async { implicit request =>
    Future.successful(Ok(Json.toJson(request.identity)))
  }

  /**
   * Manages the sign out action.
   */
  def signOut = silhouette.SecuredAction.async { implicit request =>
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, Ok)
  }

  /*
   * Handles the index action.
   *
   * @return The result to display.
   */
  def index = silhouette.UnsecuredAction.async { implicit request: Request[AnyContent] =>
    Future.successful(Ok(views.html.index()))
  }

  def oauth2 = silhouette.UnsecuredAction.async { implicit request: Request[AnyContent] =>
    Future.successful(Ok(views.html.oauth2()))
  }

  def bundle(file: String): Action[AnyContent] = if (environment.mode == Mode.Dev) Action.async {
    ws.url(s"http://localhost:8080/bundles/$file").get().map { response =>
      val contentType = response.headers.get("Content-Type").flatMap(_.headOption).getOrElse("application/octet-stream")
      val headers = response.headers
        .toSeq.filter(p => List("Content-Type", "Content-Length").indexOf(p._1) < 0).map(p => (p._1, p._2.mkString))
      Ok(response.bodyAsBytes).withHeaders(headers: _*).as(contentType)
    }
  }
  else {
    assets.at("/public/bundles", file)
  }
}
