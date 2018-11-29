var path = require('path');

function Shoot(folder){
  this.shootPath = folder;
  this.cameraArray = [];
  this.clipArray = [];
  this.stillArray = [];
  this.shootId = path.basename(folder);
  this.shootIdDate = this.shootId.split('_')[0];
  this.shootCounter = this.shootId.split('_')[1];
  this.projectId = this.shootId.split('_')[2];
  this.subId = this.shootId.split('_')[3];
};

module.exports = Shoot;
