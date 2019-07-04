'use strict'

function Enemy2(canvas, randomX, ctx, height, width, y, direction) {
  Enemy1.call(this, canvas, ctx, height, width, y, direction);
  this.x = randomX;
  this.velocity = 3;
  this.img = new Image();
  this.src = 'images/enemy1/stain-milk.png';
  //this.position = randomEnemy2Img;
  //this.imgNames = imgEnemy2Names;
  //this.color = 'green';
}

Enemy2.prototype = Object.create(Enemy1.prototype);
Enemy2.prototype.constructor = Enemy2;

