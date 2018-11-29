#!/usr/bin/env node

var yargs = require('yargs').argv;
var defaults = require('./modules/defaults');
var simpleRenameMachine = require('./index');
var cliTools = require('./modules/cli-tools');
var chalk = require('chalk');
var path = require('path');


cliTools.printTitle(['simple\nrename']);

if (yargs.config) {
  cliTools.setConfig(yargs, defaults);
} else {
  yargs.shootFolder = cliTools.getTarget(yargs, "shootFolder");
  var jobSettings = cliTools.mergeSettings(yargs, defaults);
  simpleRenameMachine.rename(jobSettings)
    .then(()=>console.log("done."));
}
