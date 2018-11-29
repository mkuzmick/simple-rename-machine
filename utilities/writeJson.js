var fs = require('fs');
var path = require('path');

function writeJson(object, path){

  var theJson = JSON.stringify(object, null, 4);
  fs.writeFileSync(path, theJson);

};

module.exports = writeJson;
