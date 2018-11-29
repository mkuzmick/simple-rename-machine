var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// TODO: needs to be written

var ClipSchema = new Schema({
    shootId : String,
    currentPath: String,
    oldPath: String,
    newPath: String,
    pathHistory: [],
    ll_id: String,
    filename: String,
    paths: [String],
    proxy: Boolean,
    proxyLoc: String,
    ffprobeData: {},
    statData: {},
    length: String,
    inTc: String,
    outTc: String,
    inUnixTime: Number,
    outUnixTime: Number,
}, {strict: false});

ClipSchema
  .virtual('url')
  .get(function () {
    return '/database/clip/' + this.ll_Id;
});

ClipSchema
  .virtual('deleteUrl')
  .get(function () {
    return ('/database/clip/' + this.ll_Id + '/delete');
});





module.exports = mongoose.model('clip', ClipSchema );
