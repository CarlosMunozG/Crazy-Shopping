'use strict'

function Bonus2(canvas, randomX, imgBonus2Names, randomBonus2Img, ctx, height, width, y, direction) {
  Bonus1.call(this, canvas, ctx, height, width, y, direction);
  this.x = randomX;
  this.velocity = 3;
  this.strength = 50;
  this.img = null;
  this.position = randomBonus2Img;
  this.imgNames = imgBonus2Names;
}

Bonus2.prototype = Object.create(Bonus1.prototype);
Bonus2.prototype.constructor = Bonus2;





