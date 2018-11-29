function tcToFcpxmlString24(timecode){
  var theHours = parseInt(timecode.split(':')[0]);
  var theMinutes = parseInt(timecode.split(':')[1]);
  var theSeconds = parseInt(timecode.split(':')[2]);
  var theFrames = parseInt(timecode.split(':')[3]);
  var theTotalFrames = (theFrames)+(24*(theSeconds+(60*(theMinutes+(60*theHours)))));
  var theFcpxmlString = (theTotalFrames*1001) + "/24000s";
  return theFcpxmlString;
};

module.exports = timeCodeToFcpxmlFormat;
