addSbtPlugin("org.scala-js" % "sbt-scalajs" % "0.6.15")
addSbtPlugin("de.tuda.stg" % "sbt-teavm" % "0.1.0")

resolvers += Resolver.mavenLocal

libraryDependencies += "org.teavm" % "teavm-tooling" % "0.6.0-SNAPSHOT"
