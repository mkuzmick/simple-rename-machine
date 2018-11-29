var chalk = require('chalk');
function snapshot(name, obj){
  console.log(chalk.rgb(255, 0, 150).bold(name + ":"));
  console.log(chalk.rgb(155, 155, 255)(JSON.stringify(obj, null, 4)));
}

module.exports = snapshot;
