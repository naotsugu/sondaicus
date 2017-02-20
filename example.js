#!/usr/bin/jjs

load("./ivy.js");

Ivy.load([
  'org.apache.commons:commons-lang3:3.5',
  'com.google.guava:guava:19.0'
]);


var StringUtils = Java.type('org.apache.commons.lang3.StringUtils');
print('[' + StringUtils.trim('  XX  ') + ']');

var Strings = Java.type('com.google.common.base.Strings');
print('[' + Strings.repeat('*', 10) + ']');
