'use strict'


function main() {
  var mainElement = document.querySelector('#site-main');


  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  };


  function createSplashScreen1 () {
    var splashScreen = buildDom(`
      <section id="previous-splash-01"></section>
      <section id="previous-splash-02"></section>
      <section id="site-main">
        <section class="section-buttons">
          <button class=" button start">start</button>
          <button class="button skip">skip intro</button>
        </section>
      </section>
    `);
    var startButton = splashScreen.querySelector('.start');
    startButton.addEventListener('click', createSplashScreen2);
    var skipButton = splashScreen.querySelector('.skip');
    skipButton.addEventListener('click', createGameScreen);
  };


  function createSplashScreen2 () {
    var splashScreen = buildDom(`
      <section id="previous-splash-21"></section>
      <section id="previous-splash-22"></section>
      <section id="splash-2">
        <section class="title">
          <h1>Crazy Shopping!!!</h1>
          <p>You are chilling on your couch doing shit...</p>
          <p>when you suddenly remember your INLAWS ARE COMMING FOR DINNER!!!!</p>
        </section>
        <section class="section-buttons">
          <button class="button start">continue</button>
          <button class="button skip">skip intro</button>
        </section>
      </section>
    `);
    var startButton = splashScreen.querySelector('.start');
    startButton.addEventListener('click', createSplashScreen3);
    var skipButton = splashScreen.querySelector('.skip');
    skipButton.addEventListener('click', createGameScreen);
  };


  function createSplashScreen3 () {
    var splashScreen = buildDom(`
      <section id="previous-splash-31"></section>
      <section id="previous-splash-32"></section>
      <section id="splash-3">
        <section class="title">
          <h1>Crazy Shopping!!!</h1>
          <p>Your fridge sucks</p>
          <p>You have to go to the supermarket</p>
        </section>
        <section class="section-buttons">
          <button class="button start">continue</button>
          <button class="button skip">skip intro</button>
        </section>
      </section>
    `);
    var startButton = splashScreen.querySelector('.start');
    startButton.addEventListener('click', createSplashScreen4);
    var skipButton = splashScreen.querySelector('.skip');
    skipButton.addEventListener('click', createGameScreen);
  };


  function createSplashScreen4 () {
    var splashScreen = buildDom(`
      <section id="previous-splash-40"></section>
      <section id="previous-splash-41"></section>
      <section id="previous-splash-42"></section>
      <section id="previous-splash-43"></section>
      <section id="previous-splash-44"></section>
      <section id="previous-splash-45"></section> 
      <section id="splash-4">
        <section class="title">
          <h1>Crazy Shopping!!!</h1>
          <p>It's 20:59!!</p>
          <p>The supeermarket closes in 1 minute!!</p>
          <p>You need to get the hell out!!!!</p>
        </section>
        <section class="section-buttons">
          <button class="button start">start</button>
        </section>
      </section>
    `);
    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', createGameScreen);
  };


  function createGameScreen() {
    var gameScreen = buildDom(`
      <section id="game">
        <section id="canvas">
          <canvas width="450" height="600"></canvas>
          <section class="data">
            <div>
              <p id="score-text">Score: </p>
              <p id="score-value"></p>
            </div>
            <div>
              <p id="time">Time: </p>
              <p id="time-value"></p>
            </div>
          </section>
        </section>
      </section>
    `);
    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);
    game.gameOverCallback(createGameOverScreen);
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


  function createGameOverScreen() {
    var gameOverScreen = buildDom(`
      <section id="gameover">
        <section class="title">
          <h1>Game Over Looser</h1>
          <p>Your inlaws will hate you for the rest of their lives!</p>
        </section>
        <section class="section-buttons">
          <button class="button start">restart</button>
        </section>
      </section>
    `);
    var reStartButton = gameOverScreen.querySelector('button');
    reStartButton.addEventListener('click', createGameScreen);
  };  


  function createWinScreen1() {
    var winScreen = buildDom(`
      <section id="win-1">
        <section class="title">
          <h1>You win!!!</h1>
          <p>You're the fucking supermarket's master!</p>
        </section>
        <section class="section-buttons">
          <button class="button start">restart</button>
        </section>
      </section>
    `);
    var reStartButton = winScreen.querySelector('button');
    reStartButton.addEventListener('click', createWinScreen2);
  };  


  function createWinScreen2() {
    var winScreen = buildDom(`
      <section id="revious-splash-40"></section>
      <section id="win-2">
        <section class="title">
          <h1>You forgot the wine!!!</h1>
        </section>
        <section class="section-buttons">
          <button class="button start">restart</button>
        </section>
      </section>
    `);
    var reStartButton = winScreen.querySelector('button');
    reStartButton.addEventListener('click', createGameScreen);
  };  



  createSplashScreen1();
}
window.addEventListener('load', main);