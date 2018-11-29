var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShootSchema = new Schema({
    shootId : String,
    shootIdRoot : String,
    fcpxmlAsObject : {},
    clips : [],
    people: [],
    fcpxml : String,
}, {strict: false});

ShootSchema
  .virtual('url')
  .get(function () {
    return '/database/shoot/' + this._id;
});

ShootSchema
  .virtual('deleteUrl')
  .get(function () {
    return ('/database/shoot/' + this._id + '/delete');
});

module.exports = mongoose.model('shoot', ShootSchema );


// TODO: finalize the data structure for shoots.  Notes below
//
// shootId: String,
// shootTitle: String,
// shootContact: String,
// people: [],
// cameras: [],
// clips: [],
// shootStartTs: Date,
// shootEndTs: Date,
// fcpxmls: [],
// pathLog: [],
// mcStartTc:
// mcEndTc:
// mcStartUtc:
// mcStopUtc:
//
// ----VIRTUALS----
// SHOULD we make these virtual?  or store them for spreadsheet export?
// .virtual('duration')
// .virtual('startLlFormatted')
// .virtual('endLlFormatted')
// .virtual('shootReport')
//
//
//
//
//
//
//
