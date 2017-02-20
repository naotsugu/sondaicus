# Sondaicus

Nashorn tools.


## Requirements

Only Java SE 8.


## Ivy.js

Dependency management with Ivy.

The following is an example of using `commons-lang` and `guava`:

```
// load script.
load("./ivy.js");

// DoWnload dependencies and add classpath.
Ivy.load([
  'org.apache.commons:commons-lang3:3.5',
  'com.google.guava:guava:19.0'
]);
```

Then, you can use external library :

```
var StringUtils = Java.type('org.apache.commons.lang3.StringUtils');
print('[' + StringUtils.trim('  XX  ') + ']');

var Strings = Java.type('com.google.common.base.Strings');
print('[' + Strings.repeat('*', 10) + ']');
```

When run, it prints the following:

```
[XX]
[**********]
```
