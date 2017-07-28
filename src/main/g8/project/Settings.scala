
import NpmPlugin.autoImport._
import sbt.Keys.{ baseDirectory, unmanagedResourceDirectories, _ }
import sbt._

////*******************************
//// NPM settings
////*******************************
object NpmSettings extends AutoPlugin {
  import com.typesafe.sbt.web.Import._

  override def requires: Plugins = NpmPlugin

  override def trigger: PluginTrigger = noTrigger

  override def projectSettings: Seq[Setting[_]] = Seq(
    // We use the dev command to start the server in development mode, otherwise it cannot be killed
    npmStart in Npm := "start",

    // We must define the directory in which the NPM project is located
    npmDir in Npm := "app-ui",

    // Make the dist files available for Play, so that they can be accessed with `routes.Assets.at`.
    // This does only work in production mode. In development mode the files where served through the
    // node.js server.
    unmanagedResourceDirectories in Assets += baseDirectory.value / "target/npm/dist"
  )
}