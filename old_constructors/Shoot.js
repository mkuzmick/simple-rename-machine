function Shoot(shootPath){
  this.shootPath = shootPath;
  this.cameraArray = [];
  this.clipArray = [];
  this.shootId = path.basename(shootPath);
  this.shootIdDate = this.shootId.split('_')[0];
  this.shootCounter = this.shootId.split('_')[1];
  this.projectId = this.shootId.split('_')[2];
  this.subId = this.shootId.split('_')[3];
};

module.exports = Shoot;
