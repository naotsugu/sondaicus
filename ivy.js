var Ivy = (function() {
  return {
    load : function(dependencies) {

      var URL = java.net.URL;
      var File = java.io.File;
      var Channels = java.nio.channels.Channels;
      var URLClassLoader = java.net.URLClassLoader;
      var FileOutputStream = java.io.FileOutputStream;
      var URLArrayType = Java.type('java.net.URL[]');
      var StringArrayType = Java.type('java.lang.String[]');
      var ObjectArrayType = Java.type('java.lang.Object[]');

      // create lib dir.
      var libDir = new File('lib/');
      if (!libDir.exists()) libDir.mkdir();

      // download ivy.jar.
      var ivyJar = new File('lib/ivy.jar');
      if (!ivyJar.exists()) {
        var ivyJarUrl = new URL('https://repo1.maven.org/maven2/org/apache/ivy/ivy/2.4.0/ivy-2.4.0.jar');
        var fos = new FileOutputStream(ivyJar);
        fos.getChannel().transferFrom(Channels.newChannel(ivyJarUrl.openStream()), 0, 10000000);
      }

      // call Ivy Main.run method.
      var urls = new URLArrayType(1);
      urls[0] = ivyJar.toURI().toURL();
      var ivyMain = new URLClassLoader(urls).loadClass("org.apache.ivy.Main")

      var parserMethod = ivyMain.getDeclaredMethod('getParser');
      parserMethod.accessible = true;
      var parser = parserMethod.invoke(null);

      var ivyRunMethod = ivyMain.getDeclaredMethod('run', parser.class, StringArrayType.class);
      ivyRunMethod.accessible = true;

      // create ivy option, and invoke.
      for each (var dependency in dependencies) {
        var opts = ['-dependency'];
        opts = opts.concat(dependency.split(':'));
        opts = opts.concat(['-retrieve', 'lib/[artifact]-[revision](-[classifier]).[ext]']);

        var ivyArgs = new ObjectArrayType(2);
        ivyArgs[0] = parser;
        ivyArgs[1] = Java.to(opts, StringArrayType);
        ivyRunMethod.invoke(null, ivyArgs);
      }

      // add classpath to ClassLoader.
      var addUrlMethod = URLClassLoader.class.getDeclaredMethod('addURL', URL.class);
      addUrlMethod.accessible = true;
      for each (var file in new File('lib/').listFiles()) {
        if (file.isFile &&
            file.name.endsWith('.jar') &&
            !file.name.endsWith('-javadoc.jar') &&
            !file.name.endsWith('-sources.jar')) {
          var addUrlArgs = new ObjectArrayType(1);
          addUrlArgs[0] = file.toURI().toURL();
          addUrlMethod.invoke(java.lang.ClassLoader.getSystemClassLoader(), addUrlArgs);
        }
      }
    }
  };
})();
