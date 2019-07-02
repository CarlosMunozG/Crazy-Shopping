'use strict'

function Game(canvas) {
  this.player = null;
  this.enemies = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.onGameOver = null;
}


Game.prototype.startGame = function() {
  //inicializar  players y enemies
  //this.player = new Player(this.canvas);

  var loop = () => {
    
    /*if(Math.random()> 0.97){
      var randomY = Math.random() * this.canvas.height - 10;
      var newEnemy = new Enemy(this.canvas, randomY);
      this.enemies.push(newEnemy);
    }*/

    //update
    //this.update();

    //clear
    //this.clear();

    //draw
    //this.draw();

    //comprobar colisiones
    //this.checkCollisions();

    //parar el juego si no hay mas vidas
    /*if(!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver();
    }*/
  
    
  }
loop();

}