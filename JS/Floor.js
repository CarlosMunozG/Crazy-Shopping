'use strict'

function Floor(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.x = 0;
  this.y = - this.canvas.height;
  this.velocity = 3;
  this.img = new Image();
  this.img.src = 'images/floor/floor.jpg';
  this.height = this.img.height;
  this.width = this.img.width;
}

Floor.prototype.move = function() {
  this.y = this.y + this.velocity;
  this.y = this.y % this.canvas.height;
}

Floor.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.x, this.y);
    if (this.velocity > 0) {
      this.ctx.drawImage(this.img, this.x, this.y - this.canvas.height);
    }
}


