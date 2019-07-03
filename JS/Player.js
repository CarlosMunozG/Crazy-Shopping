'use strict'
 
function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 50;
  this.width = 35;
  this.x = (this.canvas.width / 2) - (this.width / 2)
  this.y = this.canvas.height - 60;
  this.lives = 1;
  this.velocity = 3;
  this.directionX = 0;
  this.directionY = 0;
  this.img = new Image();
  this.img.src = 'images/player/basket.png';
}

Player.prototype.checkBorders = function(){
  if(this.x < 0 ){
    this.x = 0;
  } else if(this.x > (this.canvas.width - this.width) ){
    this.x = this.canvas.width - this.width;
  } else if(this.y < 0){
    this.y = 0;
  } else if(this.y > (this.canvas.height - this.height)){
    this.y = this.canvas.height - this.height;
  }
}

Player.prototype.move = function() {
  this.x = this.x + (this.directionX * this.velocity);
  this.y = this.y + (this.directionY * this.velocity);
}

Player.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Player.prototype.setImg = function(newImg) {
  this.img.src = newImg;
}

Player.prototype.setDirectionX = function(newDirection){
  this.directionX = newDirection;
}

Player.prototype.setDirectionY = function(newDirection){
  this.directionY = newDirection;
}



