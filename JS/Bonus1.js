'use strict'

function Bonus1(canvas, randomX, imgBonus1Names, randomBonus1Img) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 40;
  this.width = 40;
  this.x = randomX;
  this.y = 0;
  this.velocity = 4;
  this.direction = 1;
  this.strength = 20;
  this.img = null;
  this.position = randomBonus1Img;
  this.imgNames = imgBonus1Names;
}

Bonus1.prototype.move = function() {
  this.y = this.y + (this.direction * this.velocity);
}

Bonus1.prototype.draw = function() {
  this.img = new Image();
  this.img.src = this.imgNames[this.position];
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}


