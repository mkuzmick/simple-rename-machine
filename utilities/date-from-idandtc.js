function dateFromIdTc(shootId, timecode) {
  var regexTest = /^\d{8}/;
  var dateRoot = shootId.slice(0,8);
  if (regexTest.test(dateRoot)) {
    var y = dateRoot.substr(0,4),
        m = (dateRoot.substr(4,2) - 1),
        d = dateRoot.substr(6,2);
    var theHours = parseInt(timecode.split(':')[0]),
        theMinutes = parseInt(timecode.split(':')[1]),
        theSeconds = parseInt(timecode.split(':')[2]),
        theFrames = parseInt(timecode.split(':')[3]);
    var D = new Date(y,m,d, theHours, theMinutes, theSeconds);
    return D;
  }
  else {
    console.log(shootId + "'s dateRoot " + dateRoot + " is not a valid date string");
  }
}

module.exports = dateFromIdTc;
