import sbt._

object Dependencies {

  object Version {
    val silhouette = "5.0.3"
    val playVersion = play.core.PlayVersion.current
  }

  val resolvers = Seq(
    Resolver.jcenterRepo
  )

  val common = Seq(
    "com.mohiva" %% "play-silhouette" % Version.silhouette,
    "com.mohiva" %% "play-silhouette-password-bcrypt" % Version.silhouette,
    "com.mohiva" %% "play-silhouette-persistence" % Version.silhouette,
    "com.mohiva" %% "play-silhouette-crypto-jca" % Version.silhouette,
    "com.mohiva" %% "play-silhouette-testkit" % Version.silhouette,

    "com.iheart" %% "ficus" % "1.4.3",
    "net.codingwell" %% "scala-guice" % "4.2.0",
    "com.adrianhurt" %% "play-bootstrap" % "1.2-P26-B3-RC2",
    "org.webjars" %% "webjars-play" % "2.6.3"
  )
}