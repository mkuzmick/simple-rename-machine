global.__basedir = __dirname;
var simplyRename = require('./modules/simply-rename');

const rename = async function (settings) {
  console.log("starting rename");
  await simplyRename(settings);
}

module.exports.rename = rename;
