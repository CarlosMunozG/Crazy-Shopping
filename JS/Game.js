"use strict";

function Game(canvas) {
  this.player = null;
  this.enemies1 = [];
  this.enemies2 = [];
  this.bonus1 = [];
  this.bonus2 = [];
  this.score = 0;
  this.isGameOver = false;
  this.isWin = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.onGameOver = null;
  this.time = 2000;
  this.paused = false;
  this.gameSong = new Audio('sounds/Benny-hill-theme.mp3');
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  this.endTime();
  this.gameSong.play()
  
  var loop = () => {
    if(!this.paused){
      this.createThings()
    }
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

Game.prototype.checkLimits = function() {
  this.player.checkBorders();
};

Game.prototype.printData = function() {
  var scoreText = document.querySelector('#score-text');
  var timeText = document.querySelector('#time');
  scoreText.innerHTML = 'Score: ' + this.score;
  timeText.innerHTML = 'Time: ' + this.time;
}

Game.prototype.update = function() {
  this.printData();
  this.player.move();
  this.enemies1.forEach(function(enemy) {
    enemy.move();
  });
  this.enemies2.forEach(function(enemy) {
    enemy.move();
  });
  this.bonus1.forEach(function(bonus) {
    bonus.move();
  });
  this.bonus2.forEach(function(bonus) {
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
  this.enemies2.forEach(function(enemy) {
    enemy.draw();
  });
  this.bonus1.forEach(function(bonus) {
    bonus.draw();
  });
  this.bonus2.forEach(function(bonus) {
    bonus.draw();
  });

  Game.prototype.kick = function() {
    var intervalID = setInterval(() => {
      this.player.setDirectionX(-1); 
    }, 0);
  
    setTimeout(() => {
      clearInterval(intervalID);
      this.player.setDirectionX(-1);
    }, 2000);
  }

  Game.prototype.stop = function() {
    var intervalID = setInterval(() => {
      this.enemies1.velocity = 0;
      this.enemies2.velocity = 0;
      this.bonus1.velocity = 0;
      this.bonus2.velocity = 0;
    }, 0);
    setTimeout(() => {
      clearInterval(intervalID);
      this.enemies1.velocity = 3;
      this.enemies2.velocity = 3;
      this.bonus1.velocity = 4;
      this.bonus2.velocity = 3;
    }, 2000);
    
  }

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

    this.enemies2.forEach((enemy, index) => {
      var rightLeft = this.player.x + this.player.width >= enemy.x;
      var leftRight = this.player.x <= enemy.x + enemy.width;
      var bottomTop = this.player.y + this.player.height >= enemy.y;
      var topBottom = this.player.y <= enemy.y + enemy.height;

      if (rightLeft && leftRight && bottomTop && topBottom) {
        this.paused = true;
        this.gameSong.pause();
        var intervalID = setInterval(() => {
          this.enemies1.forEach( function(enemy){
            enemy.velocity = 0;
          });
          this.enemies2.forEach( function(enemy){
            enemy.velocity = 0;
          });
          this.bonus1.forEach( function(bonus){
            bonus.velocity = 0;
          });
          this.bonus2.forEach( function(bonus){
            bonus.velocity = 0;
          })
        }, 0);
        setTimeout(() => {
          clearInterval(intervalID);
          this.paused = false;
          this.gameSong.play()
          this.enemies2.splice(index, 1);
          this.enemies1.forEach( function(enemy){
            enemy.velocity = 3;
          });
          this.enemies2.forEach( function(enemy){
            enemy.velocity = 3;
          });
          this.bonus1.forEach( function(bonus){
            bonus.velocity = 4;
          });
          this.bonus2.forEach( function(bonus){
            bonus.velocity = 3;
          })
        }, 2000);
        if( (this.player.x + this.player.width / 2 ) > (this.canvas.width / 2 ) ){
        }
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
        this.printData();
        if(this.score >= 1000000){
          this.isWin = true;
        }
      }
    });

    this.bonus2.forEach((bonus, index) => {
      var rightLeft = this.player.x + this.player.width >= bonus.x;
      var leftRight = this.player.x <= bonus.x + bonus.width;
      var bottomTop = this.player.y + this.player.height >= bonus.y;
      var topBottom = this.player.y <= bonus.y + bonus.height;

      if (rightLeft && leftRight && bottomTop && topBottom) {
        this.bonus2.splice(index, 1);
        this.score += bonus.strength;
        this.printData();
        if(this.score >= 1000000){
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

Game.prototype.endTime = function() {
  var countdownTimer = setInterval(() => {
    //document.getElementById("progressBar").value = 10 - timeleft;
    if(this.isWin === true){
      this.time = this.time;
      clearInterval(countdownTimer);
    } else {
      this.time -= 1;
      if(this.time < 0){
        clearInterval(countdownTimer);
        this.isGameOver = true;
      }
    }
  }, 1000);
}

Game.prototype.createThings = function(){
  if (Math.random() > 0.985) {
    var randomX = Math.random() * this.canvas.width - 50;
    var newEnemy1 = new Enemy1(this.canvas, randomX);
    this.enemies1.push(newEnemy1);
  }
  if (Math.random() > 0.987) {
    var randomX = Math.random() * this.canvas.width - 10;
    var newEnemy2 = new Enemy2(this.canvas, randomX);
    this.enemies2.push(newEnemy2);
  }
  if (Math.random() > 0.992) {
    var imgBonus1Names = ['images/bonus2/fruit.png', 'images/bonus2/meat.png', 'images/bonus2/prawn.png', 'images/bonus2/tomato.png'];
    var randomBonus1Img = Math.floor(Math.random() * (imgBonus1Names.length) );
    var randomX = Math.random() * this.canvas.width - 40;
    var newBonus1 = new Bonus1(this.canvas, randomX, imgBonus1Names, randomBonus1Img);
    this.bonus1.push(newBonus1);
  }
  if (Math.random() > 0.997) {
    var imgBonus2Names = ['images/bonus1/cheese.png', 'images/bonus1/pizza.png', 'images/bonus1/donut.png', 'images/bonus1/pie.png'];
    var randomX = Math.random() * this.canvas.width - 40;
    var randomBonus2Img = Math.floor(Math.random() * (imgBonus2Names.length) );
    var newBonus2 = new Bonus2(this.canvas, randomX, imgBonus2Names, randomBonus2Img);
    this.bonus2.push(newBonus2);
  }
}
