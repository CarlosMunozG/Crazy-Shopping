'use strict'

function Enemy3(canvas, randomX, ctx, height, width, y, direction) {
  Enemy1.call(this, canvas, ctx, height, width, y, direction);
  this.x = randomX;
  this.velocity = 3;
  this.img = new Image();
  this.src = 'images/enemy1/stain-milk.png';
}

Enemy3.prototype = Object.create(Enemy1.prototype);
Enemy3.prototype.constructor = Enemy3;