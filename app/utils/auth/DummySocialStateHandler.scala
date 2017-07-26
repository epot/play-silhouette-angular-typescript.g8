package utils.auth

import com.mohiva.play.silhouette.api.util.ExtractableRequest
import com.mohiva.play.silhouette.impl.providers.{ PublishableSocialStateItemHandler, SocialState, SocialStateHandler, SocialStateItemHandler }
import play.api.mvc.Result

import scala.concurrent.{ ExecutionContext, Future }

class DummySocialStateHandler(override val handlers: Set[SocialStateItemHandler])
  extends SocialStateHandler {

  override type Self = DummySocialStateHandler

  override def withHandler(handler: SocialStateItemHandler): DummySocialStateHandler = {
    new DummySocialStateHandler(handlers + handler)
  }

  override def state(implicit ec: ExecutionContext): Future[SocialState] = {
    Future.sequence(handlers.map(_.item)).map(items => SocialState(items.toSet))
  }

  override def unserialize[B](state: String)(
    implicit
    request: ExtractableRequest[B],
    ec: ExecutionContext
  ): Future[SocialState] = {
    Future.successful(SocialState(Set()))
  }

  override def serialize(state: SocialState): String = ""

  override def publish[B](result: Result, state: SocialState)(implicit request: ExtractableRequest[B]): Result = {
    handlers.collect { case h: PublishableSocialStateItemHandler => h }.foldLeft(result) { (r, handler) =>
      state.items.foldLeft(r) { (r, item) =>
        handler.canHandle(item).map(item => handler.publish(item, r)).getOrElse(result)
      }
    }
  }
}
