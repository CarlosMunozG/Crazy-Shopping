'use strict'

function Enemy1(canvas, randomX) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 50;
  this.width = 50;
  this.x = randomX;
  this.y = 0;
  this.velocity = 3;
  this.direction = 1;
  //this.color = 'red';
  this.img = new Image();
  this.src = 'images/enemy1/stain.png';
}

Enemy1.prototype.move = function() {
  this.y = this.y + (this.direction * this.velocity);
}

Enemy1.prototype.draw = function() {
  this.img.src = this.src;
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}
