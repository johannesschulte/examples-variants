# Scala-Loci Wasm Example
Chat Multitier Observer contains a working example of scala loci using WebAssembly.

It requires the following libraries to be available (local Maven repository is supported as well and needed for TeaVM):

https://github.com/johannesschulte/scala-loci Modified scala loci
https://github.com/konsoletyper/teavm TeaVM. This is also required by the sbt-teavm so needs to be published first
https://github.com/johannesschulte/sbt-teavm SBT plugin for TeaVM

If all this is available, all messages send in the chat application should be appended with a number (length of the message +2). The "+2" is computed in WebAssembly, all code is generated from Application.scala.

The server can be run normally from within sbt.

The client can be (re-)built with "clean teaVMWasm fastOptJS"

The resulting HTML should be in "chat/multitier.observer/.js/target/scala-2.11/classes/index.xhtml" with correct links to the generated JS files.
