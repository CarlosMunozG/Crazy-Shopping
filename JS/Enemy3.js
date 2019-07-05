'use strict'

function Enemy3(canvas, randomX, ctx, y, velocity, direction) {
  Enemy1.call(this, canvas, ctx, y, velocity, direction);
  this.gap = ( this.canvas.width / 9 ) * 3;
  //this.width = this.canvas.width - this.gap;
  this.width = this.canvas.width - this.gap;
  this.height = 20;
  this.x = 0;
  this.gapX = randomX * 50;
  this.color = 'purple';
  //this.img = new Image();
  //this.src = 'images/enemy1/stain-milk.png';
}

Enemy3.prototype = Object.create(Enemy1.prototype);
Enemy3.prototype.constructor = Enemy3;

Enemy3.prototype.draw = function() {
  //this.img.src = this.src;
  //this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect( this.x, this.y, this.width, this.height);
}