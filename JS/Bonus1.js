'use strict'

function Bonus1(canvas, randomX) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 10;
  this.width = 10;
  this.x = randomX;
  this.y = 0;
  this.velocity = 4;
  this.direction = 1;
  this.color = 'green';
  this.strength = 20;
}

Bonus1.prototype.move = function() {
  this.y = this.y + (this.direction * this.velocity);
}

Bonus1.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect( this.x, this.y, this.width, this.height);
}
