
import Ship from './ship.js';
import Asteroid from './asteroid.js';

export default class Game {
  constructor() {
    //Num Objects
    this.numAsteroids = 10;
    //Objects/Arrays
    this.ship = new Ship();
    this.asteroids = [];
    this.createAsteroids();
    //this.addAsteroid(false);
    //this.asteroids.push(new Asteroid(1000, -100, 25, 10, false));

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
      this.addAsteroid(false);
    }
  }

    /** @function addAsteroid()
    * Function to add new asteroid to the list while making sure it is not spawned where a object already is
    */
  addAsteroid(exploded) {
    //Variables to establish the particle
    var x;
    var y;
    var radius;
    var mass;
    //Var to control the while loop
    var currLength = this.asteroids.length;
    //Loop that generates random values for the particle and makes sure the space is not already occupied
    while (currLength === this.asteroids.length) {
      //Var to determine if it would have spawned inside something
      var collision = false;
      var spawnSide = this.randomInt(1, 5);
      radius = this.random(10, 50);
      //Top
      if(spawnSide === 1) {
        x = this.random(-2 * radius, 1000 + 2 * radius);
        y = - 2 * radius;
      }
      //Right
      else if(spawnSide === 2) {
        x = 1000 + 2 * radius;
        y = this.random(-2 * radius, 1000 + 2 * radius);
      }
      //Bottom
      else if(spawnSide === 3) {
        x = this.random(-2 * radius, 1000 + 2 * radius);
        y = 1000 + 2 * radius;
      }
      //Left
      else {
        x = - 2 * radius;
        y = this.random(-2 * radius, 1000 + 2 * radius);
      }
      mass = this.random(1, 10);
      //Checks if the position is occupied by another asteroid
      this.asteroids.forEach(asteroid => {
        if(asteroid.collisionDetection(x, y, radius)) {
          collision = true;
        }
      });
      if(!collision) {
        this.asteroids.push(new Asteroid(x, y, radius, mass, exploded));
      }
    }
    //Updates the Amplied variable because it only tracks the current state of the particles
    this.amplified = 100;
  }

  /** @function random()
    * Function to get a random number between to values
    * @param int min is the minimum desired value
    * @param int max is the maximum desired value
    */
  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  /** @function randomInt()
    * @param int min is the minimum desire value
    * @param int max is the maximum desire value
    */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  update() {
    this.ship.update();
    this.asteroids.forEach(asteroid => {
      asteroid.update();
    });
  }
  render() {
    this.backBufferContext.fillStyle = 'black';
    this.backBufferContext.fillRect(0,0, 1000, 1000);
    this.ship.render(this.backBufferContext);
    this.asteroids.forEach(asteroid => {
      asteroid.render(this.backBufferContext);
    });
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }
  loop() {
    this.update();
    this.render();
  }
}
