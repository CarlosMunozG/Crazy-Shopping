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
  this.direction = 0;
  this.color = 'blue';
  this.img = null;
}

Player.prototype.checkBorders = function(){
  if(this.x < 0 ){
    this.x = 0;
  } else if(this.x > (this.canvas.width - this.width) ){
    this.x = this.canvas.width - this.width;
  }
}

Player.prototype.move = function() {
  this.x = this.x + (this.direction * this.velocity);
}

Player.prototype.draw = function() {
  this.img = new Image();
  this.img.src = 'images/player/basket.png';
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  
}

Player.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
  this.move();
}



