'use strict'

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 30;
  this.width = 20;
  this.x = (this.canvas.width / 2) - (this.width / 2)
  this.y = this.canvas.height - 60;
  this.lives = 1;
  this.velocity = 3;
  this.direction = 0;
  this.color = 'blue';
}

/*Player.prototype.checkBorders = function(newDirection){
  if(this.x > 0 && this.x + this.width < this.canvas.width){
    console.log('in if');
    this.setDirection(newDirection);
  } else {
    console.log('fuera if');
    this.setDirection(0);
  }
}*/

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
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect( this.x, this.y, this.width, this.height);
}

Player.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
  this.move();
}



