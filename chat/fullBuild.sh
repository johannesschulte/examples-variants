#!/bin/sh
(cd /Users/johannesschulte/Desktop/Uni/IMPL/scala-loci ; sbt -java-home /Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home 'project lociCoreJVM'  'package')
(cd /Users/johannesschulte/Desktop/Uni/IMPL/scala-loci ; sbt -java-home /Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home 'project lociCoreJS'  'package')
#cp ../../scala-loci/scala-loci-core/jvm/target/scala-2.11/scala-loci-core_2.11-0.1.0.jar multitier.observer/.jvm/lib/

#cp ../../scala-loci/scala-loci-core/js/target/scala-2.11/scala-loci-core_sjs0.6_2.11-0.1.0.jar multitier.observer/.js/lib/

cp ../../scala-loci/scala-loci-*/.jvm/target/scala-2.11/scala-loci-*.jar multitier.observer/.jvm/lib/
cp ../../scala-loci/scala-loci-*/jvm/target/scala-2.11/scala-loci-*.jar multitier.observer/.jvm/lib/

cp ../../scala-loci/scala-loci-*/js/target/scala-2.11/*.jar multitier.observer/.js/lib
cp ../../scala-loci/scala-loci-*/.js/target/scala-2.11/*.jar multitier.observer/.js/lib

sbt -java-home /Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home 'project chatMultiObserveJS' 'fastOptJS' 
sbt -java-home /Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home 'project chatMultiObserveJVM' 'package'
