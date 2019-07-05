"use strict";

function Enemy3(canvas, x, randomWidth, ctx, y, velocity, direction) {
  Enemy1.call(this, canvas, ctx, y, velocity, direction);
  this.gap = this.canvas.width / 9;
  this.widthBlocks = this.canvas.width / 50 - 2;
  this.width = randomWidth;
  this.height = 80;
  this.x = x;
  this.color = "purple";
  this.img = new Image();
  this.img.src = "images/enemy3/shelving.png";
}

Enemy3.prototype = Object.create(Enemy1.prototype);
Enemy3.prototype.constructor = Enemy3;

Enemy3.prototype.draw = function() {
  this.pattern = this.ctx.createPattern(this.img, 'repeat');
  this.ctx.fillStyle = this.pattern;
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.restore();
};
