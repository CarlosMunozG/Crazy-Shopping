'use strict'

function Bonus2(canvas, randomX, ctx, height, width, x, y, direction) {
  Bonus1.call(this, canvas, ctx, height, width, y, direction);
  this.x = randomX;
  this.velocity = 5;
  this.color = 'pink';
  this.strength = 40;
}

Bonus2.prototype = Object.create(Bonus1.prototype);
Bonus2.prototype.constructor = Bonus2;