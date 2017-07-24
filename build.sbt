import com.typesafe.sbt.SbtScalariform._
import play.sbt.routes.RoutesKeys

import scalariform.formatter.preferences._

name := "play-silhouette-angular4-seed"

version := "1.0.0"

scalaVersion := "2.12.2"

resolvers += Resolver.jcenterRepo

lazy val silhouetteVersion = "5.0.0-RC2"
lazy val ngVersion="4.2.5"

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
  "org.webjars.npm" % "ng2-ui-auth" % "7.0.2",
  "org.webjars.npm" % "angular__common" % ngVersion,
  "org.webjars.npm" % "angular__compiler" % ngVersion,
  "org.webjars.npm" % "angular__animations" % ngVersion,
  "org.webjars.npm" % "angular__core" % ngVersion,
  "org.webjars.npm" % "angular__http" % ngVersion,
  "org.webjars.npm" % "angular__forms" % ngVersion,
  "org.webjars.npm" % "angular__router" % ngVersion,
  "org.webjars.npm" % "angular__platform-browser-dynamic" % ngVersion,
  "org.webjars.npm" % "angular__platform-browser" % ngVersion,
  "org.webjars.npm" % "systemjs" % "0.20.14",
  "org.webjars.npm" % "rxjs" % "5.4.2",
  "org.webjars.npm" % "reflect-metadata" % "0.1.8",
  "org.webjars.npm" % "zone.js" % "0.8.4",
  "org.webjars.npm" % "core-js" % "2.4.1",
  "org.webjars.npm" % "symbol-observable" % "1.0.1",
  "org.webjars.npm" % "ng2-toastr" % "4.1.2",

  "org.webjars.npm" % "typescript" % "2.4.1",

  //tslint dependency
  "org.webjars.npm" % "tslint-eslint-rules" % "3.4.0",
  "org.webjars.npm" % "tslint-microsoft-contrib" % "4.0.0",
  //"org.webjars.npm" % "codelyzer" % "3.1.1", see below
  "org.webjars.npm" % "types__jasmine" % "2.5.53" % "test",
  //test
  "org.webjars.npm" % "jasmine-core" % "2.6.4",

  guice,
  ehcache,
  filters
)

dependencyOverrides += "org.webjars.npm" % "minimatch" % "3.0.0"

// use the webjars npm directory (target/web/node_modules ) for resolution of module imports of angular2/core etc
resolveFromWebjarsNodeModulesDir := true

(projectTestFile in typescript) := Some("tsconfig.test.json")

// use the combined tslint and eslint rules plus ng2 lint rules
(rulesDirectories in tslint) := Some(List(
  tslintEslintRulesDir.value,
  ng2LintRulesDir.value //codelyzer uses 'cssauron' which can't resolve 'through' see https://github.com/chrisdickinson/cssauron/pull/10
))

// the naming conventions of our test files
jasmineFilter in jasmine := GlobFilter("*Test.js") | GlobFilter("*Spec.js") | GlobFilter("*.spec.js")
logLevel in jasmine := Level.Info
logLevel in tslint := Level.Info

lazy val root = (project in file(".")).enablePlugins(PlayScala)

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
