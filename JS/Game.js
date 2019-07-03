"use strict";

function Game(canvas) {
  this.player = null;
  this.enemies1 = [];
  this.bonus1 = [];
  this.score = 0;
  this.isGameOver = false;
  this.isWin = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.onGameOver = null;
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  this.endGame();
  
  var loop = () => {
    if (Math.random() > 0.985) {
      var randomX = Math.random() * this.canvas.width - 10;
      var newEnemy1 = new Enemy1(this.canvas, randomX);
      this.enemies1.push(newEnemy1);
    }
    if (Math.random() > 0.99) {
      var randomX = Math.random() * this.canvas.width - 10;
      var newBonus1 = new Bonus1(this.canvas, randomX);
      this.bonus1.push(newBonus1);
 
    }
    
    //console.log(this.score);
    
    this.checkLimits();
    this.update();
    this.clear();
    this.draw();
    this.checkCollisions();

    if(this.isGameOver){
      this.onGameOver();
    } else if(this.isWin){
      this.onGameWin();
    } else {
      requestAnimationFrame(loop);
    }
  };
  loop();
};

/*Game.prototype.countdownTime = function(){
  var timeleft = 3;
  var downloadTimer = setInterval(function(){
    //document.getElementById("progressBar").value = 10 - timeleft;
    timeleft -= 1;
    if(timeleft <= 0)
      clearInterval(downloadTimer);
  }, 1000);
  console.log(timeleft);
}*/

Game.prototype.checkLimits = function() {
  this.player.checkBorders();
};

Game.prototype.update = function() {
  this.player.move();
  this.enemies1.forEach(function(enemy) {
    enemy.move();
  });
  this.bonus1.forEach(function(bonus) {
    bonus.move();
  });

};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.player.draw();
  this.enemies1.forEach(function(enemy) {
    enemy.draw();
  });
  this.bonus1.forEach(function(bonus) {
    bonus.draw();
  });

  Game.prototype.checkCollisions = function() {
    this.enemies1.forEach((enemy, index) => {
      var rightLeft = this.player.x + this.player.width >= enemy.x;
      var leftRight = this.player.x <= enemy.x + enemy.width;
      var bottomTop = this.player.y + this.player.height >= enemy.y;
      var topBottom = this.player.y <= enemy.y + enemy.height;

      if (rightLeft && leftRight && bottomTop && topBottom) {
        this.enemies1.splice(index, 1);
        var intervalID = setInterval(() => {
          this.player.velocity = 0; 
        }, 0);

        setTimeout(() => {
          clearInterval(intervalID);
          this.player.velocity = 3;
        }, 3000);
      }
    });

    this.bonus1.forEach((bonus, index) => {
      var rightLeft = this.player.x + this.player.width >= bonus.x;
      var leftRight = this.player.x <= bonus.x + bonus.width;
      var bottomTop = this.player.y + this.player.height >= bonus.y;
      var topBottom = this.player.y <= bonus.y + bonus.height;

      if (rightLeft && leftRight && bottomTop && topBottom) {
        this.bonus1.splice(index, 1);
        this.score += bonus.strength;

        //this.player.score --;
        if(this.score === 100){
          this.isWin = true;
        }
      }
    });
  };
};

Game.prototype.gameOverCallback = function(callback){
  this.onGameOver = callback;
}

Game.prototype.gameWinCallback = function(callback){
  this.onGameWin = callback;
}

Game.prototype.endGame = function() {
  var timeleft = 30;
  var countdownTimer = setInterval(() => {
    //document.getElementById("progressBar").value = 10 - timeleft;
    console.log(timeleft);
    
    if(this.isWin === true){
      timeleft = timeleft;
      clearInterval(countdownTimer);
    } else {
      timeleft -= 1;
      if(timeleft < 0){
        clearInterval(countdownTimer);
        this.isGameOver = true;
      }
    }
  }, 1000);
}
