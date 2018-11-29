var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StillSchema = Schema(
  {
    tcString: {type: String, required: false},
    fileName: {type: String, required: false},
    filePath: {type: String, required: false},
    secondsIn: {type: String, required: false},
    tcFcpxml: {type: String, required: false},
    people: String;
    creationTs: {type: String, required: false}
  }
);

ShootSchema
  .virtual('url')
  .get(function () {
    return '/database/still/' + this._id;
});

module.exports = mongoose.model('still', StillSchema);
