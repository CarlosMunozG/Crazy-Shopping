'use strict'

function Enemy1(canvas, randomX) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 20;
  this.width = 20;
  this.x = randomX;
  this.y = 0;
  this.velocity = 3;
  this.direction = 1;
  this.color = 'red';
}

Enemy1.prototype.move = function() {
  this.y = this.y + (this.direction * this.velocity);
}

Enemy1.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect( this.x, this.y, this.width, this.height);
}
