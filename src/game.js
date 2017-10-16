
import Ship from './ship.js';
import Asteroid from './asteroid.js';
import Projectile from './projectile.js';

export default class Game {
  constructor() {
    //Num Objects
    this.numAsteroids = 10;
    //Objects/Arrays
    this.ship = new Ship();
    this.projectiles = [];
    this.rateOfFire = 40;
    this.reloading = false;
    this.asteroids = [];
    this.createAsteroids();
    //this.addAsteroid(false);
    //this.asteroids.push(new Asteroid(1000, -100, 25, 10, false));

    //Input Map
    this.keyMap = {32: false, 65: false, 68: false, 87: false, 88: false};
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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;
    this.createProjectile = this.createProjectile.bind(this);

    this.interval = setInterval(this.loop, 10);
  }

  handleKeyDown(event) {
    event.preventDefault();
    this.keyMap[event.keyCode] = true;
  }

  handleKeyUp(event) {
    event.preventDefault();
    this.keyMap[event.keyCode] = false;
  }

  createProjectile() {
    //15 is the length from center to the top pointd
    var x = this.ship.position.x + Math.sin(this.ship.velocity.dir)* 15;
    var y = this.ship.position.y - Math.cos(this.ship.velocity.dir)* 15;
    this.projectiles.push(new Projectile(x, y, this.ship.velocity.dir));
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

    /** @function rotate()
    * Function to change the velocities to make the collisions act like 1-dimensional collisions
    * @param velocity is the x and y velocities of the asteroid
    * @param float angle is the offset needed to adjust for
    */
  rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
  }

  /** @function particleCollision()
    * Function to handle particle to particle collisions
    * @param particle is the first particle in question
    * @param particle otherParticle is the other particle in question
    */
  particleCollision(asteroid, otherAsteroid) {
    //Vars to determine the differences in velocities
    var xVelocityDiff = asteroid.velocity.x - otherAsteroid.velocity.x;
    var yVelocityDiff = asteroid.velocity.y - otherAsteroid.velocity.y;
    //Vars to determine the distances between particles
    var xDist = otherAsteroid.x - asteroid.x;
    var yDist = otherAsteroid.y - asteroid.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        var angle = -Math.atan2(otherAsteroid.y - asteroid.y, otherAsteroid.x - asteroid.x);

        // Store mass in var for better readability in collision equation
        var m1 = asteroid.mass;
        var m2 = otherAsteroid.mass;

        // Velocity before equation
        var u1 = this.rotate(asteroid.velocity, angle);
        var u2 = this.rotate(otherAsteroid.velocity, angle);

        // Velocity after 1d collision equation
        var v1 = { x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2), y: u1.y };
        var v2 = { x: (u2.x * (m2 - m1) + 2 * m1 * u1.x)/ (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        var vFinal1 = this.rotate(v1, -angle);
        var vFinal2 = this.rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        asteroid.velocity.x = vFinal1.x;
        asteroid.velocity.y = vFinal1.y;
        otherAsteroid.velocity.x = vFinal2.x;
        otherAsteroid.velocity.y = vFinal2.y;
    }
  }

  projectileCollisionDetection(ax, ay, aradius) {
    var distance = Math.pow(this.x - ax, 2) + Math.pow(this.y - ay, 2);
    if(distance < Math.pow(this.radius + aradius, 2)) {
      return true;
    }
    return false;
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

    //Checks for collisions between particles
    for(var i = 0; i < this.asteroids.length; i++) {
      for(var j = 0; j < this.asteroids.length; j++) {
        if(i != j) {
          if(this.asteroids[i].collisionDetection(this.asteroids[j].x, this.asteroids[j].y, this.asteroids[j].radius)) {
            this.particleCollision(this.asteroids[i], this.asteroids[j]);
          }
        }
      }
    }

    //Checks for collisions between projectiles and asteroids

    //Input Map Applying
    if(this.keyMap[65]){
      this.ship.velocity.dir -= 0.05;
      if(this.ship.velocity.dir <= -Math.PI * 2) {
        this.ship.velocity.dir = 0.0;
      }
    }
    if(this.keyMap[68]) {
      this.ship.velocity.dir += 0.05;
      if(this.ship.velocity.dir >= Math.PI * 2) {
        this.ship.velocity.dir = 0.0;
      }
    }
    if(this.keyMap[87]) {
      this.ship.velocity.mag = 0.1;
      this.ship.updateSpeed();
      var numParticles = Math.floor(this.random(2, 6));
      this.ship.createParticles(numParticles);
    }
    if(this.keyMap[32] && this.rateOfFire === 40) {
      this.createProjectile();
      this.reloading = true;
    }
    if(this.keyMap[88]) {
      console.log(this.projectiles);
    }

    //Controlling the rate of fire
    if(this.reloading) {
      this.rateOfFire--;
    }
    if(this.rateOfFire <= 0) {
      this.rateOfFire = 40;
      this.reloading = false;
    }

    //Update projectiles, if there are any
    for(var i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
      if(this.projectiles[i].edgeDetection()) {
        this.projectiles.splice(i, 1);
      }
    }
  }
  render() {
    this.backBufferContext.fillStyle = 'black';
    this.backBufferContext.fillRect(0,0, 1000, 1000);
    this.ship.render(this.backBufferContext);
    this.asteroids.forEach(asteroid => {
      asteroid.render(this.backBufferContext);
    });
    this.projectiles.forEach(projectile => {
      projectile.render(this.backBufferContext);
    });
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }
  loop() {
    this.update();
    this.render();
  }
}
