// performs the operations required in all LL cliTools
// title
// take yargs and config and create settings for job
// handle congiguration

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fse = require('fs-extra');
var pkg = require('../package.json');
// var configurator = require('../modules/configurator');
var Configstore = require('configstore');
var conf = new Configstore(pkg.name);
var cp = require("child_process");

exports.mergeSettings = function(yargs, defaults){
  console.log("package defaults: " + JSON.stringify(defaults));
  console.log("your config: " + JSON.stringify(conf.all));
  console.log("new args: " + JSON.stringify(yargs));
  return ({...defaults, ...conf.all, ...yargs});
}

exports.printTitle = function(title){
  clear();
  console.log('\n' +
    chalk.bold.magenta(
      figlet.textSync(title, { horizontalLayout: 'full', verticalLayout: 'fitted'})
    ) + '\n\n'
  );
}

exports.getConfig = function(){
  var config = conf.all
  return config;
}

exports.printJson = function(obj){
  console.log(JSON.stringify(obj, null, 4));
}

exports.getTarget = function(args, propName){
  // figure out whether to use prop or first element of `_` array
  return (args[propName]===true ? args._[0] : args[propName]);
}

// TODO: a lame thing left over here.  Let's just loop through all
// the properties in defaults and not bother adding that defaults.configOptions array.

exports.setConfig = function(yargs, defaults){
  for (var i = 0; i < defaults.configOptions.length; i++) {
    if (yargs[defaults.configOptions[i]]) {
      if (yargs[defaults.configOptions[i]]=="delete") {
        console.log("found a delete request for " + defaults.configOptions[i]);
        conf.delete(defaults.configOptions[i]);
      } else if (yargs[defaults.configOptions[i]]=="false") {
        console.log("found a false request for " + defaults.configOptions[i]);
        conf.set(defaults.configOptions[i], false);
      } else if (yargs[defaults.configOptions[i]]=="true") {
        console.log("found a true request for " + defaults.configOptions[i]);
        conf.set(defaults.configOptions[i], true);
      } else {
        conf.set(defaults.configOptions[i], yargs[defaults.configOptions[i]])
      }
    }
  };
  console.log("set your configuration to");
  console.log(JSON.stringify(conf.all, null, 4));
  console.log("total list of options = " + defaults.configOptions);
}
