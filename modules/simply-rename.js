var fs = require("fs");
var path = require("path");
const Clip = require("../models/Clip");
const Shoot = require("../constructors/Shoot");
const Still = require("../constructors/Still");
const Device = require("../constructors/Device");
var snapshot = require("../utilities/snapshot");
var dotRe = /^\./; // regex to cope with hidden files
var hiddenRe = /^_/; // regex for folders to skip

function rename(settings) {
  var theShoot = new Shoot(settings.shootFolder);
  snapshot("settings", settings);
  var allFiles = [];
  var deviceArray = [];
  var l12Re =/L12/i;
  var stillsRe =/still/i;
  // console.log("grabbing new Shoot object for " + settings.shootFolder);
  var folders = fs.readdirSync(settings.shootFolder);
  // snapshot("shootFolder's folders", folders);
  folders.forEach(folder => {
    var folderPath = path.join(settings.shootFolder, folder);
    // snapshot('folders foreach running with', folderPath);
    if (dotRe.test(folder) || hiddenRe.test(folder)) {
      // console.log(folderPath + " is not a folder we'll processs");
      return;
    }
// thisShoot.cameraArray.push(camFolder);
//  check if it's a folder?
    else if (fs.statSync(folderPath).isDirectory()) {
      // console.log("pushing this folder into cameraArray: " + folderPath);
      theShoot.cameraArray.push(folder);
      if (l12Re.test(folder)) {
        // console.log(folderPath + " is for the L12");
        var newData = handleL12Folder(folderPath, theShoot.shootPath);
      } else if (stillsRe.test(folder)){
        var newData = handleStillsFolder(folderPath, folder, theShoot.shootId);
      } else {
        var newData = handleCameraFolder(folderPath, folder, theShoot.shootId);
      }
      allFiles = allFiles.concat(newData);
    }
  // var pathForJson = (theResult.shootPath + "/_notes/" + theResult.shootId + "_shootObject.json");
  })
  console.log("done");
  // snapshot('allFiles', allFiles);
  logRenameOperations(allFiles, theShoot);
  // console.log(allFiles.length);
  // snapshot("theShoot", theShoot);
}

function handleL12Folder(folderPath, shootFolder) {
  var filenameCounter;
  var newFiles = [];
  var tracks = [];
  fs.readdirSync(folderPath).forEach(function(file) {
    if (!dotRe.test(file)) {
      var ext = path.extname(file);
      var trackId = file.split("TRACK")[1];
      trackId = trackId.substring(0,2);
      trackFolder = path.join(shootFolder, ("L12Tr" + trackId));
      if (!tracks.includes(trackId)) {
        filenameCounter = 1;
        tracks.push(trackId);
        fs.mkdirSync(trackFolder);
        var thisClip = new Clip({
          currentPath: path.join(folderPath, file),
          newPath: path.join(trackFolder, (path.basename(shootFolder) + "_L12Tr" + trackId + "_" + (("000" + (filenameCounter)).slice(-3)) + ext))
        });
        filenameCounter++;
      } else {
        var thisClip = new Clip({
          currentPath: path.join(folderPath, file),
          newPath: path.join(trackFolder, (path.basename(shootFolder) + "_L12Tr" + trackId + "_" + (("000" + (filenameCounter)).slice(-3)) + ext))
        });
        filenameCounter++;
      }
      fs.renameSync(thisClip.currentPath, thisClip.newPath);
      newFiles.push(thisClip);
    }
  });
  var theFolderFilesNow = fs.readdirSync(folderPath);
  if (theFolderFilesNow < 1) {
    try {
      fs.rmdirSync(folderPath);
    } catch (e) {
      console.log("Something went wrong trying to remove L12 folder: \n" + e);
    }
  } else if (theFolderFilesNow.length == 1) {
    console.log("maybe there's a random hidden file in the L12 folder?  If just .DS_Store, we'll delete it.");
    try {
      fs.unlinkSync(folderPath + "/.DS_Store");
      fs.rmdirSync(folderPath);
    } catch (e) {
      console.log("Something went wrong: \n" + e);
    }
  } else {
    console.log("there seem to be more things in the L12 folder--going to leave it there for now.");
  }
    console.log(JSON.stringify(theFolderFilesNow));
  return newFiles;
}

function handleCameraFolder(folderPath, cameraId, shootId) {
  var numericalCounter = 1;
  var newFiles = [];
  fs.readdirSync(folderPath).forEach(function(file) {
    if (!dotRe.test(file)) {
      var filenameCounter = ("000" + (numericalCounter)).slice(-3);
      var ext = path.extname(file);
      var cameraId = path.basename(folderPath);
      var newBasenameExt = (shootId + "_" + cameraId + "_" + filenameCounter + ext);
      var thisClip = new Clip({
        currentPath: path.join(folderPath, file),
        newPath: path.join(folderPath, newBasenameExt)
      });
      fs.renameSync(thisClip.currentPath, thisClip.newPath);
      numericalCounter++;
      newFiles.push(thisClip);
    }

  })
  return newFiles;
}

function handleStillsFolder(folderPath, cameraId, shootId) {
  var numericalCounter = 1;
  var newFiles = [];
  fs.readdirSync(folderPath).forEach(function(file) {
    if (!dotRe.test(file)) {
      var filenameCounter = ("000" + (numericalCounter)).slice(-3);
      var ext = path.extname(file);
      var cameraId = path.basename(folderPath);
      var newBasenameExt = (shootId + "_" + cameraId + "_" + filenameCounter + ext);
      var thisClip = new Clip({
        currentPath: path.join(folderPath, file),
        newPath: path.join(folderPath, newBasenameExt)
      });
      fs.renameSync(thisClip.currentPath, thisClip.newPath);
      numericalCounter++;
      newFiles.push(thisClip);


    }
  })
  return newFiles;
}

function logRenameOperations(clips, shoot) {
  shootNotes=("Log of renaming operations for " + shoot.shootId + ":\n");
  clips.forEach(function(clip, index){
    shootNotes=(shootNotes+(index+1)+". Renamed " + clip.currentPath + " to " + clip.newPath + "\n" )
  });
  notesFolderPath=path.join(shoot.shootPath, "_notes");
  console.log("notesFolderPath is " + notesFolderPath);
  if (fs.existsSync(notesFolderPath)) {
    console.log();
  }
  else {
    fs.mkdirSync(notesFolderPath);
  }
  var notesPath = path.join(notesFolderPath, "rename_log.txt");
  console.log(notesPath);
  try {
    fs.writeFileSync(notesPath, shootNotes);
  } catch (e) {
    console.log("couldn't write shootNotes file:\n" + e);
  }
}

module.exports = rename;
