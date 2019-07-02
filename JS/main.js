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
        <button>start</button>
        <button>skip intro</button>
      </section>
    `);
    var startButton = splashScreen.querySelector('button:first-child');
    startButton.addEventListener('click', createSplashScreen2);
  };



  createSplashScreen1();
}

window.addEventListener('load', main);