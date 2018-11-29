const cp = require('child_process');
const path = require('path');

function slackIt(settings){
  try {
    var thePayload = '{"text":"<@' + settings.slackName + '> finished transcoding ' + settings.outputPath + '"}'
    cp.spawnSync("curl", ['-X', 'POST', 'H', 'Content-type: application/json', '--data', thePayload, process.env.SLACK_NOTIFICATION_WEBHOOK_URL]);
    console.log("\n\n");
  } catch (e) {
    console.log("Couldn't slackIt.  See if you've set a slackName in --config and have a SLACK_NOTIFICATION_WEBHOOK_URL environment variable.");
  }
}
//
//
// var thePayload = 'payload={"channel": "#ll-tests", "username": "theworkflow-bot", "text": "<@marlon>: the shoot with id ' + theResult.shootId + ' has been ingested and renamed.", "icon_emoji": ":desktop_computer:"}';
// cp.spawnSync("curl", ['-X', 'POST', '--data-urlencode', thePayload, process.env.SLACK_WEBHOOK_URL]);


module.exports = slackIt;
