global.__basedir = __dirname;
var shootprocessor = require('./modules/shootprocessor');

const rename = async function (settings) {
  console.log("starting rename");
  await shootprocessor.rename(settings);
}

module.exports.rename = rename;
