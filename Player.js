'use strict'

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 30;
  this.width = 20;
  this.x = (this.canvas.width / 2) - (this.width / 2)
  this.y = 30;
  this.lives = 1;
  this.velocity = 3;
  this.direction = 0;
  this.color = 'blue';
  
}

/*Player.prototype.move = function() {
  this.y = this.y + (this.direction * this.velocity);
}

Player.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect( this.x, this.y, this.width, this.height);
}

Player.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
  //this.move();
}*/