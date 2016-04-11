organization in ThisBuild := "de.tuda.stg"

version in ThisBuild := "0.0.0"

scalaVersion in ThisBuild := "2.11.7"

scalacOptions in ThisBuild ++= Seq("-feature", "-deprecation", "-unchecked")


val librariesUpickle = libraryDependencies +=
  "com.lihaoyi" %%% "upickle" % "0.3.6"

val librariesAkkaHttp = libraryDependencies +=
  "com.typesafe.akka" %% "akka-http-experimental" % "2.0.2"

val librariesMultitier = libraryDependencies ++= Seq(
  "de.tuda.stg" %%% "retier-core" % "0+",
  "de.tuda.stg" %%% "retier-architectures-basic" % "0+",
  "de.tuda.stg" %%% "retier-serializable-upickle" % "0+",
  "de.tuda.stg" %%% "retier-network-ws-akka" % "0+",
  "de.tuda.stg" %%% "retier-network-webrtc" % "0+",
  "de.tuda.stg" %%% "retier-transmitter-basic" % "0+",
  "de.tuda.stg" %%% "retier-transmitter-rescala" % "0+",
  "org.scala-js" %%%! "scalajs-dom" % "0.9.0")

val librariesClientServed = Seq(
  dependencyOverrides += "org.webjars.bower" % "jquery" % "1.12.0",
  libraryDependencies += "org.webjars.bower" % "bootstrap" % "3.3.6",
  libraryDependencies += "org.webjars.bower" % "webrtc-adapter" % "0.2.5")

val macroparadise = addCompilerPlugin(
  "org.scalamacros" % "paradise" % "2.1.0" cross CrossVersion.full)


val sharedDirectories = Seq(
  unmanagedSourceDirectories in Compile +=
    baseDirectory.value.getParentFile / "src" / "main" / "scala",
  unmanagedResourceDirectories in Compile +=
    baseDirectory.value.getParentFile / "src" / "main" / "resources",
  unmanagedSourceDirectories in Test +=
    baseDirectory.value.getParentFile / "src" / "test" / "scala",
  unmanagedResourceDirectories in Test +=
    baseDirectory.value.getParentFile / "src" / "test" / "resources")

val settingsMultitier =
  sharedDirectories ++ Seq(macroparadise, librariesMultitier)


lazy val chat = (project in file(".")
  aggregate (chatTraditional, chatMultiReact, chatMultiObserve))


lazy val chatTraditional = (project in file("traditional")
  settings (librariesAkkaHttp, librariesUpickle)
  settings (librariesClientServed: _*))


lazy val chatMultiObserve = (project in file("multitier.observer") / ".all"
  settings (run in Compile <<=
    (run in Compile in chatMultiObserveJVM) dependsOn
    (fastOptJS in Compile in chatMultiObserveJS))
  aggregate (chatMultiObserveJVM, chatMultiObserveJS))

lazy val chatMultiObserveJVM = (project in file("multitier.observer") / ".jvm"
  settings (settingsMultitier: _*)
  settings (librariesClientServed: _*)
  settings (resources in Compile ++=
    ((crossTarget in Compile in chatMultiObserveJS).value ** "*.js").get))

lazy val chatMultiObserveJS = (project in file("multitier.observer") / ".js"
  settings (settingsMultitier: _*)
  settings (persistLauncher in Compile := true)
  enablePlugins ScalaJSPlugin)


lazy val chatMultiReact = (project in file("multitier.reactive") / ".all"
  settings (run in Compile <<=
    (run in Compile in chatMultiReactJVM) dependsOn
    (fastOptJS in Compile in chatMultiReactJS))
  aggregate (chatMultiReactJVM, chatMultiReactJS))

lazy val chatMultiReactJVM = (project in file("multitier.reactive") / ".jvm"
  settings (settingsMultitier: _*)
  settings (librariesClientServed: _*)
  settings (resources in Compile ++=
    ((crossTarget in Compile in chatMultiReactJS).value ** "*.js").get))

lazy val chatMultiReactJS = (project in file("multitier.reactive") / ".js"
  settings (settingsMultitier: _*)
  settings (persistLauncher in Compile := true)
  enablePlugins ScalaJSPlugin)
