import play.sbt.routes.RoutesKeys
import play.sbt.PlayImport.PlayKeys.playRunHooks
import com.typesafe.sbt.SbtScalariform._
import scalariform.formatter.preferences._

name := "play-silhouette-angular4-seed"

version := "1.0.0"

scalaVersion := "2.12.2"

resolvers += Resolver.jcenterRepo

lazy val root = (project in file(".")).enablePlugins(PlayScala)

lazy val silhouetteVersion = "5.0.0-RC2"

libraryDependencies ++= Seq(
  // back-end
  "com.mohiva" %% "play-silhouette" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-persistence" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-password-bcrypt" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-crypto-jca" % silhouetteVersion,
  "net.codingwell" %% "scala-guice" % "4.1.0",
  "com.iheart" %% "ficus" % "1.4.1",
  "com.adrianhurt" %% "play-bootstrap" % "1.2-P26-B3-RC2",
  "com.mohiva" %% "play-silhouette-testkit" % silhouetteVersion % "test",
  // frontend
  "org.webjars" %% "webjars-play" % "2.6.1",
  "org.webjars" % "bootstrap" % "3.3.7-1",

  guice,
  ehcache,
  filters
)


//Prevent documentation of API for production bundles
sources in (Compile, doc) := Seq.empty
publishArtifact in (Compile, packageDoc) := false

lazy val isWin = System.getProperty("os.name").toUpperCase().contains("WIN")
val appPath = if (isWin) "\\app\\frontend" else "./app/frontend"
val webpackBuild = taskKey[Unit]("Webpack build task.")

webpackBuild := {
  if (isWin) Process("cmd /c npm run build", file(appPath)).run
  else Process("npm run build", file(appPath)).run
}

(packageBin in Universal) := ((packageBin in Universal) dependsOn webpackBuild).value

// Webpack server process when running locally and build actions for production bundle
lazy val frontendDirectory = baseDirectory {_ / appPath}
playRunHooks += frontendDirectory.map(WebpackServer(_)).value

routesGenerator := InjectedRoutesGenerator
RoutesKeys.routesImport -= "controllers.Assets.Asset"

scalacOptions ++= Seq(
  "-deprecation", // Emit warning and location for usages of deprecated APIs.
  "-feature", // Emit warning and location for usages of features that should be imported explicitly.
  "-unchecked", // Enable additional warnings where generated code depends on assumptions.
  // disable fatal warnings for the moment because of https://github.com/playframework/playframework/issues/7382
  // "-Xfatal-warnings", // Fail the compilation if there are any warnings.
  "-Xlint", // Enable recommended additional warnings.
  "-Ywarn-adapted-args", // Warn if an argument list is modified to match the receiver.
  "-Ywarn-dead-code", // Warn when dead code is identified.
  "-Ywarn-inaccessible", // Warn about inaccessible types in method signatures.
  "-Ywarn-nullary-override", // Warn when non-nullary overrides nullary, e.g. def foo() over def foo.
  "-Ywarn-numeric-widen", // Warn when numerics are widened.
  "-Ywarn-unused:-imports,_" // Play generates a routes with unused imports
)

//********************************************************
// Scalariform settings
//********************************************************

defaultScalariformSettings

ScalariformKeys.preferences := ScalariformKeys.preferences.value
  .setPreference(FormatXml, false)
  .setPreference(DoubleIndentClassDeclaration, false)
  .setPreference(DanglingCloseParenthesis, Preserve)
