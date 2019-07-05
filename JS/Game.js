"use strict";

function Game(canvas) {
  this.player = null;
  this.floor = [];
  this.enemies1 = [];
  this.enemies3 = [];
  this.bonus1 = [];
  this.bonus2 = [];
  this.score = 0;
  this.isGameOver = false;
  this.isWin = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.onGameOver = null;
  this.time = 60;
  this.paused = false;
  this.gameSong = new Audio("sounds/Benny-hill-theme.mp3");
  this.catchSound = new Audio("sounds/catch-sound.mp3");
  this.hitSound = new Audio("sounds/error-sound.mp3");
  this.gameOverSound = new Audio("sounds/game-over.mp3");
  this.countEnemies = 0;
  this.runLoop = true;
  this.timeCounter = 300;
  this.minimum = 260;
  this.maximum = 340;
  this.enemie3IsCreate=false;
}



Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  this.endTime();
  this.gameSong.play();
  this.floor = new Floor(this.canvas);

  var loop = () => {
    if (this.runLoop) {
      this.countEnemies++;
      if (!this.paused) {
        this.createThings();
      }
      this.checkLimits();
      this.update();
      this.clear();
      this.draw();
      this.checkCollisions();
      if (this.isGameOver) {
        this.onGameOver();
      } else if (this.isWin) {
        this.onGameWin();
      } else {
        requestAnimationFrame(loop);
      }
    }
  };
  loop();
};

Game.prototype.checkLimits = function() {
  this.player.checkBorders();
};

Game.prototype.printData = function() {
  var scoreValue = document.querySelector("#score-value");
  var timeValue = document.querySelector("#time-value");
  scoreValue.innerHTML = this.score;
  timeValue.innerHTML = this.time;
};

Game.prototype.update = function() {
  this.printData();
  this.player.move();
  this.floor.move();
  this.enemies1.forEach(function(enemy) {
    enemy.move();
  });
  this.enemies3.forEach(function(enemy) {
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
  this.floor.draw();
  this.player.draw();
  this.enemies1.forEach(function(enemy) {
    enemy.draw();
  });
  this.enemies3.forEach(function(enemy) {
    enemy.draw();
  });
  this.bonus1.forEach(function(bonus) {
    bonus.draw();
  });
  this.bonus2.forEach(function(bonus) {
    bonus.draw();
  });

  Game.prototype.stop = function(array) {
    array.forEach(function(element) {
      element.velocity = 0;
    });
  };

  Game.prototype.checkCollisions = function() {
    this.enemies1.forEach((enemy, index) => {
      var rightLeft = this.player.x + this.player.width >= enemy.x;
      var leftRight = this.player.x <= enemy.x + enemy.width;
      var bottomTop = this.player.y + this.player.height >= enemy.y;
      var topBottom = this.player.y <= enemy.y + enemy.height;
      if (rightLeft && leftRight && bottomTop && topBottom) {
        this.hitSound.play();
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

    this.enemies3.forEach((enemy, index) => {
      var rightLeft = this.player.x + this.player.width >= enemy.x;
      var leftRight = this.player.x <= enemy.x + enemy.width;
      var bottomTop = this.player.y + this.player.height >= enemy.y;
      var topBottom = this.player.y <= enemy.y + enemy.height;
      if (rightLeft && leftRight && bottomTop && topBottom) {
        this.runLoop = false;
        this.gameSong.pause();
        this.hitSound.play();
        setTimeout(() => {
          this.gameOverSound.play();
        }, 300);
        setTimeout(() => {
          this.isWin = true;
          this.onGameOver();
        }, 4000);
        this.paused = true;
        if (this.enemies1) {
          this.stop(this.enemies1);
        }
        if (this.enemies3) {
          this.stop(this.enemies3);
        }
        if (this.bonus1) {
          this.stop(this.bonus1);
        }
        if (this.bonus2) {
          this.stop(this.bonus2);
        }
      }
    });

    this.bonus1.forEach((bonus, index) => {
      var rightLeft = this.player.x + this.player.width >= bonus.x;
      var leftRight = this.player.x <= bonus.x + bonus.width;
      var bottomTop = this.player.y + this.player.height >= bonus.y;
      var topBottom = this.player.y <= bonus.y + bonus.height;

      if (rightLeft && leftRight && bottomTop && topBottom) {
        var timeTextEnding = document.querySelector("#score-value");
        timeTextEnding.classList.add("touching");

        this.catchSound.play();
        this.bonus1.splice(index, 1);
        this.score += bonus.strength;
        this.printData();
        if (this.score >= 1000) {
          this.isWin = true;
          this.gameSong.pause();
        }
      }
    });

    this.bonus2.forEach((bonus, index) => {
      var rightLeft = this.player.x + this.player.width >= bonus.x;
      var leftRight = this.player.x <= bonus.x + bonus.width;
      var bottomTop = this.player.y + this.player.height >= bonus.y;
      var topBottom = this.player.y <= bonus.y + bonus.height;

      if (rightLeft && leftRight && bottomTop && topBottom) {
        var timeTextEnding = document.querySelector("#score-value");
        timeTextEnding.classList.add("touching");
        this.catchSound.play();
        this.bonus2.splice(index, 1);
        this.score += bonus.strength;
        this.printData();
        if (this.score >= 1000) {
          this.isWin = true;
          this.gameSong.pause();
        }
      }
    });
  };
};

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
};

Game.prototype.gameWinCallback = function(callback) {
  this.onGameWin = callback;
};

Game.prototype.createEnemies3 = function() {
  var gapWidth = this.canvas.width / 50;
  var randomValue = Math.floor(Math.random() * gapWidth) - 2;
  var randomWidth = randomValue * 50;
  var newEnemy3 = new Enemy3(this.canvas, 0, randomWidth);
  var newEnemy4 = new Enemy3(
    this.canvas,
    newEnemy3.width + 150,
    this.canvas.width
  );
  this.enemies3.push(newEnemy3, newEnemy4);
};

Game.prototype.deleteEnemies3 = function(enemy, index) {
  if (enemy.y > this.canvas.height) {
    enemy.splice(index, 1);
  }
};

Game.prototype.endTime = function() {
  var countdownTimer = setInterval(() => {
    if (this.isWin === true) {
      this.time = this.time;
      clearInterval(countdownTimer);
    } else {
      this.time -= 1;
      if (this.time <= 10) {
        var timeTextEnding = document.querySelector("#time-value");
        timeTextEnding.classList.add("scaling");
      }
      if (this.time < 0) {
        clearInterval(countdownTimer);
        this.isGameOver = true;
      }
    }
  }, 1000);
};

Game.prototype.createThings = function() {
  if (!this.enemie3IsCreate) {
    if (Math.random() > 0.985) {
      var randomX = Math.random() * (this.canvas.width - 50);
      var newEnemy1 = new Enemy1(this.canvas, randomX);
      this.enemies1.push(newEnemy1);
    }
  }
  if (this.countEnemies % 300 === 0) {
    this.createEnemies3();
    this.enemie3IsCreate = true;
    setTimeout(() => {
      this.enemie3IsCreate = false;
    }, 500);
  }

  if (Math.random() > 0.985) {
    var imgBonus1Names = [
      "images/bonus2/fruit.png",
      "images/bonus2/meat.png",
      "images/bonus2/prawn.png",
      "images/bonus2/tomato.png"
    ];
    var randomBonus1Img = Math.floor(Math.random() * imgBonus1Names.length);
    var randomX = Math.random() * (this.canvas.width - 40);
    var newBonus1 = new Bonus1(
      this.canvas,
      randomX,
      imgBonus1Names,
      randomBonus1Img
    );
    this.bonus1.push(newBonus1);
  }
  if (Math.random() > 0.985) {
    var imgBonus2Names = [
      "images/bonus1/cheese.png",
      "images/bonus1/pizza.png",
      "images/bonus1/donut.png",
      "images/bonus1/pie.png"
    ];
    var randomX = Math.random() * (this.canvas.width - 40);
    var randomBonus2Img = Math.floor(Math.random() * imgBonus2Names.length);
    var newBonus2 = new Bonus2(
      this.canvas,
      randomX,
      imgBonus2Names,
      randomBonus2Img
    );
    this.bonus2.push(newBonus2);
  }
};
