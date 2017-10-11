
import Ship from './ship.js';
import Asteroid from './asteroid.js';

export default class Game {
  constructor() {
    //Num Objects
    this.numAsteroids = 10;
    //Objects/Arrays
    this.ship = new Ship();
    //this.asteroids = [];
    //this.createAsteroids();

    //HUD
    /*
    this.HUDcanvas = document.getElementById('ui');
    this.HUDcanvas.width = 200;
    this.HUDcanvas.height = 1000;
    this.HUDcontext = this.HUDcanvas.getContext('2d');
    document.body.appendChild(this.HUDcanvas);
    */
    //Back Buffer
    this.backBufferCanvas = document.getElementById("canvas");
    this.backBufferCanvas.width = 1000;
    this.backBufferCanvas.height = 1000;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');

    //Canvas that actually gets put on the screen
    this.screenBufferCanvas = document.getElementById("canvas");
    this.screenBufferCanvas.width = 1000;
    this.screenBufferCanvas.height = 1000;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

    //Binders
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);

    this.interval = setInterval(this.loop, 10);
  }

  createAsteroids() {
    while(this.asteroids.length < this.numAsteroids) {
      this.addAsteroid();
    }
  }

  addAsteroid() {

  }

  update() {
    this.ship.update();
  }
  render() {
    this.backBufferContext.fillStyle = 'black';
    this.backBufferContext.fillRect(0,0, 1000, 1000);
    this.ship.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }
  loop() {
    this.update();
    this.render();
  }
}
