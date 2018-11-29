var fs = require("fs");
// var ffmpeg = require('fluent-ffmpeg');
const cp = require('child_process');

// function ffprobe (filePath, array) {
//   ffmpeg.ffprobe(filePath, array, function(err, metadata) {
//       console.log("in the ffprobe function");
//       // console.log(JSON.stringify(metadata));
//       array.push(JSON.stringify(metadata));
//       // array.push({file: filePath, ffprobe: metadata})
//   });
// }

function ffmpegSegmentSync(request){
  console.log("about to throw the following object into ffmpegSegmentSync:\n\n" + JSON.stringify(request, null, 2));
}

function ffprobeSync(videoFilePath){
  // this is equivalent of running "ffprobe -v quiet -print_format json -show_format -show_streams [file]"
  var output = cp.spawnSync(process.env.FFPROBE_PATH, ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', videoFilePath], { encoding : 'utf8' });
  // console.log('\n\n\nGoing to add this, we hope.\n\n');
  // console.log(output.stdout);
  // var video_meta = JSON.parse(output.stdout);
  return output.stdout;
  // console.log(video_meta.streams[0].codec_long_name);
}

function ffprobeSyncSimple(videoFilePath, options){
  options.push(videoFilePath);
  var output = cp.spawnSync(process.env.FFPROBE_PATH, options, { encoding : 'utf8' });
  return output.stdout;
}

// module.exports.ffprobe = ffprobe;
module.exports.ffprobeSync = ffprobeSync;
module.exports.ffprobeSyncSimple = ffprobeSyncSimple;
