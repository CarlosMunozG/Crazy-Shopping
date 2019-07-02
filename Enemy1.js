'use strict'

function Enemy1(canvas, randomX) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 20;
  this.width = 20;
  this.x = randomX;
  this.y = this.canvas.height;
  this.velocity = 3;
  this.direction = -1;
  this.color = 'red';
}

/*Enemy.prototype.move = function() {
  this.x = this.x + (this.direction * this.velocity);
}

Enemy.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect( this.x, this.y, this.width, this.height);
}*/

