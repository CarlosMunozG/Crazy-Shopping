'use strict'


function main() {
  var mainElement = document.querySelector('#site-main');


  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  };


  function createSplashScreen1 () {
    var splashScreen = buildDom(`
      <section>
        <h1>Crazy Shopping!!!</h1>
        <button class="start">start</button>
        <button class="skip">skip intro</button>
      </section>
    `);
    var startButton = splashScreen.querySelector('.start');
    startButton.addEventListener('click', createSplashScreen2);
    var skipButton = splashScreen.querySelector('.skip');
    skipButton.addEventListener('click', createGameScreen);
  };


  function createSplashScreen2 () {
    var splashScreen = buildDom(`
      <section>
        <h1>Crazy Shopping 2!!!</h1>
        <button class="start">start</button>
        <button class="skip">skip intro</button>
      </section>
    `);
    var startButton = splashScreen.querySelector('.start');
    startButton.addEventListener('click', createSplashScreen3);
    var skipButton = splashScreen.querySelector('.skip');
    skipButton.addEventListener('click', createGameScreen);
  };


  function createSplashScreen3 () {
    var splashScreen = buildDom(`
      <section>
        <h1>Crazy Shopping 3!!!</h1>
        <button class="start">start</button>
        <button class="skip">skip intro</button>
      </section>
    `);
    var startButton = splashScreen.querySelector('.start');
    startButton.addEventListener('click', createSplashScreen4);
    var skipButton = splashScreen.querySelector('.skip');
    skipButton.addEventListener('click', createGameScreen);
  };


  function createSplashScreen4 () {
    var splashScreen = buildDom(`
      <section>
        <h1>Crazy Shopping 4!!!</h1>
        <button>start</button>
      </section>
    `);
    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', createGameScreen);
  };


  function createGameScreen() {
    var gameScreen = buildDom(`
      <section>
        <canvas width="450" height="600"></canvas>
      </section>
      <section id="score-text"></section>
      <section id="time"></section>
    `);
    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);
    game.gameOverCallback(createGameOverScreen1);
    game.gameWinCallback(createWinScreen1);
    game.startGame();
    document.addEventListener('keydown', function(event){
      if(event.key === 'ArrowLeft'){
        game.player.setDirectionX(-1);
        game.player.setImg('images/player/basket-left.png');
        console.log(game.player.img.src);
      } else if(event.key === 'ArrowRight'){
        game.player.setDirectionX(1);
        game.player.setImg('images/player/basket-right.png');
      } else if(event.key === 'ArrowUp'){
        game.player.setDirectionY(-1);
      } else if(event.key === 'ArrowDown'){
        game.player.setDirectionY(1);
      }
      event.preventDefault();
    })
    document.addEventListener('keyup', function(){
      game.player.setDirectionX(0);
      game.player.setDirectionY(0);
      game.player.setImg('images/player/basket.png');
    })
  };


  function createGameOverScreen1() {
    var gameOverScreen = buildDom(`
      <section>
        <h1>Game Over</h1>
        <button>restart</button>
      </section>
    `);
    var reStartButton = gameOverScreen.querySelector('button');
    reStartButton.addEventListener('click', createGameOverScreen2);
  };  


  function createGameOverScreen2() {
    var gameOverScreen = buildDom(`
      <section>
        <h1>Game Over 2</h1>
        <button>start</button>
      </section>
    `);
    var reStartButton = gameOverScreen.querySelector('button');
    reStartButton.addEventListener('click', createGameScreen);
  };  


  function createWinScreen1() {
    var winScreen = buildDom(`
      <section>
        <h1>You win!!!</h1>
        <button>restart</button>
      </section>
    `);
    var reStartButton = winScreen.querySelector('button');
    reStartButton.addEventListener('click', createWinScreen2);
  };  


  function createWinScreen2() {
    var winScreen = buildDom(`
      <section>
        <h1>You win 2!!!</h1>
        <button>restart</button>
      </section>
    `);
    var reStartButton = winScreen.querySelector('button');
    reStartButton.addEventListener('click', createGameScreen);
  };  



  createSplashScreen1();
}
window.addEventListener('load', main);