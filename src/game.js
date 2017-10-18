
import Ship from './ship.js';
import Asteroid from './asteroid.js';
import Projectile from './projectile.js';
import Particle from './particles.js';
import UFO from './ufo.js';

Math.randomBetween = function (min, max) {
  return Math.random() * (max - min) + min;
};

Math.randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default class Game {
  constructor() {
    this.screenSide = 1000;
    //Num Objects
    this.numAsteroids = 10;
    //Objects/Arrays
    this.ship = new Ship();
    this.ufo = null;
    //Variables to control ufo spawn
    this.ufoTimer = Math.randomInt(1000, 2000);
    //var To control ufo firing
    this.ufoRateOfFire = Math.randomInt(150, 350);
    //Vars to help with respawning the player
    this.respawning = false;
    this.respawnTimer = 300;
    this.projectiles = [];
    //Vars to help control player projectiles
    this.rateOfFire = 50;
    this.reloading = false;
    this.asteroids = [];
    this.createAsteroids();
    this.particles = [];
    //HUD Variables
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    //controls the telepor function
    this.teleports = 10;
    this.coolingDown = 50;
    //Over Loop Controllers
    this.gameOver = false;
    this.paused = false;


    this.theme = new Audio('./theme.wav');
    this.theme.volume = 0.3;
    this.theme.loop = true;
    this.theme.play();
    this.over = new Audio('./gameOver.wav');
    this.collisionSound = new Audio('collision.wav');
    this.explosion = new Audio('./Explosion.wav');
    this.shipExplosion = new Audio('./shipExplosion.wav');
    this.laser = new Audio('./laser_shoot.wav');
    this.teleportSound = new Audio('./teleport.wav');

    //Input Map
    this.keyMap = {32: false, 37: false, 38: false, 39: false, 65: false, 68: false, 70: false, 87: false, 88: false};

    //HUD
    this.HUDcanvas = document.getElementById('ui');
    this.HUDcanvas.width = this.screenSide;
    this.HUDcanvas.height = 100;
    this.HUDcontext = this.HUDcanvas.getContext('2d');
    document.body.appendChild(this.HUDcanvas);

    //Back Buffer
    this.backBufferCanvas = document.getElementById("canvas");
    this.backBufferCanvas.width = this.screenSide;
    this.backBufferCanvas.height = this.screenSide;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');

    //Canvas that actually gets put on the screen
    this.screenBufferCanvas = document.getElementById("canvas");
    this.screenBufferCanvas.width = this.screenSide;
    this.screenBufferCanvas.height = this.screenSide;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

    //Binders
    this.loop = this.loop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;

    this.interval = setInterval(this.loop, 10);
  }

  handleKeyDown(event) {
    event.preventDefault();
    this.keyMap[event.keyCode] = true;
    if(event.keyCode === 80) {
      if(this.paused) {
        this.paused = false;
      }
      else {
        this.paused = true;
      }
    }
  }

  handleKeyUp(event) {
    event.preventDefault();
    this.keyMap[event.keyCode] = false;
  }

  createProjectile() {
    //15 is the length from center to the top pointed, the 1.2 is so you can't run into your own shot immediately
    var x = this.ship.x + Math.sin(this.ship.velocity.dir)* this.ship.radius * 1.2;
    var y = this.ship.y - Math.cos(this.ship.velocity.dir)* this.ship.radius * 1.2;
    this.projectiles.push(new Projectile(x, y, this.ship.velocity.dir, 'green'));
    this.laser.play();
  }

  ufoProjectile() {
    var dx = this.ufo.x - this.ship.x;
    var dy = this.ufo.y - this.ship.y;
    //Draw a line to the player's ship
    var distance = Math.sqrt(dx * dx + dy * dy);
    //Get the direction to the player's ship
    var direction = Math.acos((dy)/ distance);
    //Mirror the angle for the left hand side
    if(dx > 0) {
      direction *= -1;
    }
    //Again, 1.2 is so the ufo doesn't immediately destory itself when it shoots
    var x = this.ufo.x + Math.sin(direction)* this.ufo.radius * 1.2;
    var y = this.ufo.y - Math.cos(direction)* this.ufo.radius * 1.2;
    this.projectiles.push(new Projectile(x, y, direction, 'violet'));
    this.laser.play();
  }

  createAsteroids() {
    while(this.asteroids.length < this.numAsteroids) {
      this.addAsteroid(-1.0);
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
      var spawnSide = Math.randomInt(1, 5);
      mass = Math.randomBetween(10, 75);
      radius = mass;
      //Top
      if(spawnSide === 1) {
        x = Math.randomBetween(-2 * radius, this.screenSide + 2 * radius);
        y = - 2 * radius;
      }
      //Right
      else if(spawnSide === 2) {
        x = this.screenSide + 2 * radius;
        y = Math.randomBetween(-2 * radius, this.screenSide + 2 * radius);
      }
      //Bottom
      else if(spawnSide === 3) {
        x = Math.randomBetween(-2 * radius, this.screenSide + 2 * radius);
        y = this.screenSide + 2 * radius;
      }
      //Left
      else {
        x = - 2 * radius;
        y = Math.randomBetween(-2 * radius, this.screenSide + 2 * radius);
      }
      //Checks if the position is occupied by another asteroid
      this.asteroids.forEach(asteroid => {
        if(asteroid.collisionDetection(x, y, radius)) {
          collision = true;
        }
      });
      if(!collision) {
        this.asteroids.push(new Asteroid(x, y, mass, exploded));
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
    * Function to handle particle to particle collisions, I ripped this out of one my side projects
    * @param asteroid is the first asteroid in question
    * @param asteroid otherAsteroid is the other particle in question
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

  circleCollision(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    var distance = dx * dx + dy * dy;
    //check if ufo
    if(distance < Math.pow(r1 + r2, 2)) {
      return true;
    }
    return false;
  }

  handleAsteriodExplosion(aID) {
    var asteroid = this.asteroids[aID];
    var mass = asteroid.mass;
    var x = asteroid.x;
    var y = asteroid.y;
    this.asteroids.splice(aID, 1);
    this.explosion.play();
    if(mass >= 15) {
      //random number of pieces the asteroid will break into
      var random = Math.randomInt(2, 4);
      this.numAsteroids += random - 1;
      mass /= random;
      var direction = Math.randomBetween(0, 2 * Math.PI);
      var angleChange = 2 * Math.PI / random;
      for(var i = 0; i < random; i++) {
        //Since mass is also the radius
        var newX = x + Math.cos(direction) * mass;
        var newY = y - Math.sin(direction) * mass;
        this.asteroids.push(new Asteroid(newX, newY, mass, direction));
        direction += angleChange;
      }
    }
    else {
      this.numAsteroids--;
    }
    //Smaller asteroids are harder to hit, thus more score
    this.score += Math.floor(100 / mass);
  }

  detectShipCrash(ship ,asteroid) {
    var dx = ship.x - asteroid.x;
    var dy = ship.y - asteroid.y;
    var distance = dx * dx + dy * dy;
    //check if ufo
    if(ship.color === 'purple') {
      if(distance < Math.pow(this.ufo.bufferRadius + asteroid.radius, 2)) {
        this.ufo.alterPath(dx, dy);
      }
    }
    if(distance < Math.pow(asteroid.radius + ship.radius, 2)) {
      return true;
    }
    return false;
  }

  explode(x, y, color) {
    var numParticles = Math.randomInt(50, 100);
    var dir = Math.randomBetween(0, Math.PI * 2);
    //console.log("In explode")
    for(var i = 0; i < numParticles; i ++) {
      if(Math.randomInt(0, 100) > 90) {
        dir = Math.randomBetween(0, Math.PI * 2);
      }
      this.particles.push(new Particle(x, y, Math.PI * dir, 7, color, 20));
    }
  }

  teleport() {
    var x = Math.randomBetween(100, 900);
    var y = Math.randomBetween(100, 900);
    //So you don't spawn right next to something and immediately die
    var buffer = 50;
    var collision = false;
    do {
      if(collision) {
        x = Math.randomBetween(100, 900);
        y = Math.randomBetween(100, 900);
        collision = false;
      }
      if(this.ufo && this.circleCollision(x, y, this.ship.radius, this.ufo.x, this.ufo.y, this.ufo.radius + 2 * buffer)) {
        collision = true;
      }
      this.asteroids.forEach(asteroid => {
        //Check if new space is free of asteroids
        if(this.circleCollision(x, y, this.ship.radius, asteroid.x, asteroid.y, asteroid.radius + buffer)) {
          collision = true;
        }
      });
      this.projectiles.forEach(projectile => {
        //Check if the new space if free of projectiles
        if(this.circleCollision(projectile.x, projectile.y, projectile.radius, x, y, this.ship.radius + buffer)) {
          collision = true;
        }
      });
    } while(collision);
    this.explode(this.ship.x, this.ship.y, this.ship.color);
    this.explode(x, y, this.ship.color);
    this.teleportSound.play();
    this.ship.x = x;
    this.ship.y = y;
    this.ship.speed.x = 0.0;
    this.ship.speed.y = 0.0;
  }

  respawn() {
    this.respawning = true;
    this.lives--;
    if(this.lives >= 0) {
      this.ship = new Ship();
    }
    else {
      this.gameOver = true;
      this.theme.loop = false;
      this.theme.pause();
      this.over.play();
    }
  }

  destoryUFO() {
    this.ufo = null;
    this.score += 100;
    this.shipExplosion.play();
  }

  drawHUD() {
    this.HUDcontext.fillStyle = 'black';
    this.HUDcontext.strokeStyle = 'blue';
    this.HUDcontext.fillRect(0, 0, this.screenSide, 100);
    this.HUDcontext.font = '30px Times New Roman';
    this.HUDcontext.strokeText("LIVES: " + this.lives, 10, 50);
    this.HUDcontext.strokeText("LEVEL: " + this.level, 400, 50);
    this.HUDcontext.strokeText("SCORE: " + this.score, 800, 50);
    this.HUDcontext.strokeText("TELEPORTS: " + this.teleports, 550, 50);
    this.HUDcontext.strokeText("ASTEROIDS: " + this.numAsteroids , 150, 50);
    this.HUDcontext.font = '20px Times New Roman';
    this.HUDcontext.strokeText("CONTROLS: ", 10, 75);
    this.HUDcontext.strokeText("W: Thurster  A: Rotate Left  D: Rotate Right  Space: Shoot  F: Teleport  P: Pause  (Arrows also Work)", 150, 75);
  }

  update() {
    //Update Ship
    this.ship.update();
    //Update UFO if applicable
    if(this.ufo) {
      this.ufo.update();
    }
    //Update each asteroid
    this.asteroids.forEach(asteroid => {
      asteroid.update();
    });

    //Update Level if no more asteroids
    if(this.asteroids.length === 0) {
      this.level++;
      //You Will Probably Need These
      this.lives += this.level;
      this.numAsteroids = 10 + 2 * this.level;
      this.createAsteroids();
    }

    //Determine UFO spawning
    if(!this.ufo && this.ufoTimer > 0) {
      this.ufoTimer--;
      if(this.ufoTimer <= 0) {
        //Spawn UFO and reset Timer
        this.ufo = new UFO();
        this.ufoTimer = Math.randomInt(500, 1000);
      }
    }

    //Control respawning
    if(this.respawning) {
      this.respawnTimer--;
      if(this.respawnTimer <= 0) {
        //Done respawning, ship can now be destroyed again
        this.respawnTimer = 300;
        this.respawning = false;
      }
    }

    //Checks for collisions between asteroids
    for(var i = 0; i < this.asteroids.length; i++) {
      for(var j = 0; j < this.asteroids.length; j++) {
        if(i !== j) {
          if(this.asteroids[i].collisionDetection(this.asteroids[j].x, this.asteroids[j].y, this.asteroids[j].radius)) {
            this.particleCollision(this.asteroids[i], this.asteroids[j]);
            this.collisionSound.play();
          }
        }
      }
    }

    //Checks for collisions between projectiles and asteroids
    for(var i = 0; i < this.projectiles.length; i++) {
      for(var j = 0; j < this.asteroids.length; j++) {
        if(this.circleCollision(this.projectiles[i].x, this.projectiles[i].y, this.projectiles[i].radius, this.asteroids[j].x, this.asteroids[j].y, this.asteroids[j].radius)) {
          this.explode(this.projectiles[i].x, this.projectiles[i].y, this.projectiles[i].color);
          this.projectiles.splice(i, 1);
          this.explode(this.asteroids[j].x, this.asteroids[j].y, 'white');
          this.handleAsteriodExplosion(j);
          break;
        }
      }
    }

    if(!this.respawning) {
      //Check for ship crashing
      for(var i = 0; i < this.asteroids.length; i++) {
        if(this.detectShipCrash(this.ship, this.asteroids[i])) {
          this.explode(this.ship.x, this.ship.y, this.ship.color);
          this.shipExplosion.play();
          this.respawn();
        }
      }
    }

    //Detect UFO crashing/allow it to dodge asteroids, if applicable
    if(this.ufo) {
      for(var i = 0; i < this.asteroids.length; i++) {
        if(this.detectShipCrash(this.ufo, this.asteroids[i])) {
          this.explode(this.ufo.x, this.ufo.y, this.ufo.color);
          this.destoryUFO();
          break;
        }
      }
    }

    //Ship to UFO collision
    if(this.ufo && this.circleCollision(this.ship.x, this.ship.y, this.ship.radius, this.ufo.x, this.ufo.y, this.ufo.radius) && !this.respawning) {
      this.explode(this.ship.x, this.ship.y, this.ship.color);
      this.projectiles.splice(i, 1);
      this.shipExplosion.play();
      this.respawn();
    }

    //projectile ship collision checks
    for(var i = 0; i < this.projectiles.length; i++) {
      if(!this.respawning && this.circleCollision(this.projectiles[i].x, this.projectiles[i].y, this.projectiles[i].radius,
        this.ship.x, this.ship.y, this.ship.radius)) {
        this.explode(this.ship.x, this.ship.y, this.ship.color);
        this.explode(this.projectiles[i].x, this.projectiles[i].y, this.projectiles[i].color);
        this.projectiles.splice(i, 1);
        this.shipExplosion.play();
        this.respawn();
        break;
      }
      if(this.ufo && this.circleCollision(this.projectiles[i].x, this.projectiles[i].y, this.projectiles[i].radius,
        this.ufo.x, this.ufo.y, this.ufo.radius)) {
        this.explode(this.ufo.x, this.ufo.y, this.ufo.color);
        this.explode(this.projectiles[i].x, this.projectiles[i].y, this.projectiles[i].color);
        this.projectiles.splice(i, 1);
        this.destoryUFO();
        break;
      }
    }

    //Input Map Applying
    //A or Left Arrow
    if(this.keyMap[65] || this.keyMap[37]){
      this.ship.velocity.dir -= 0.05;
      if(this.ship.velocity.dir <= -Math.PI * 2) {
        this.ship.velocity.dir = 0.0;
      }
    }
    //D or Right Arrow
    if(this.keyMap[68] || this.keyMap[39]) {
      this.ship.velocity.dir += 0.05;
      if(this.ship.velocity.dir >= Math.PI * 2) {
        this.ship.velocity.dir = 0.0;
      }
    }
    //W or Up Arrow
    if((this.keyMap[87] || this.keyMap[38]) && (this.respawnTimer <= 150 || !this.respawning)) {
      this.ship.velocity.mag = 0.1;
      this.ship.updateSpeed();
      var numParticles = Math.floor(Math.randomBetween(2, 6));
      this.ship.createParticles(numParticles);
    }
    //Space
    if(this.keyMap[32] && this.rateOfFire === 50 && !this.respawning) {
      this.createProjectile();
      this.reloading = true;
    }
    //F
    if(this.keyMap[70] && this.teleports > 0 && !this.respawning && this.coolingDown === 50) {
      this.teleport();
      this.teleports--;
      this.coolingDown--;
    }

    //Controlling the rate of fire
    if(this.reloading) {
      this.rateOfFire--;
      if(this.rateOfFire <= 0) {
        this.rateOfFire = 50;
        this.reloading = false;
      }
    }
    //UFO firing
    if(this.ufo) {
      this.ufoRateOfFire--;
      if(this.ufoRateOfFire <= 0) {
        this.ufoProjectile();
        this.ufoRateOfFire = Math.randomInt(150, 350);
      }
    }
    //Control Teleport/Prevent multiple from a single button Press
    if(this.coolingDown < 50) {
      this.coolingDown--;
      if(this.coolingDown <= 0) {
        this.coolingDown = 50;
      }
    }

    //Update projectiles, if there are any
    for(var i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
      if(this.projectiles[i].edgeDetection()) {
        this.projectiles.splice(i, 1);
      }
    }

    //update particles
    for(var j = 0; j < this.particles.length; j++) {
      this.particles[j].update();
      if(this.particles[j].life <= 0) {
        this.particles.splice(j, 1);
      }
    }
  }
  render() {
    //Initial Setup
    this.backBufferContext.fillStyle = 'black';
    this.backBufferContext.strokeStyle = 'blue';
    this.backBufferContext.font = '50px Times New Roman';
    //Refresh canvas
    this.backBufferContext.fillRect(0,0, this.screenSide, this.screenSide);
    this.drawHUD();
    //Display respawning if needed
    if(this.respawning && !this.gameOver) {
      this.backBufferContext.save();
      this.backBufferContext.globalAlpha = 0.5;
      this.backBufferContext.strokeText("RESPAWNING", 350, 500);
      this.backBufferContext.restore();
    }
    //Draw UFO
    if(this.ufo) {
      this.ufo.render(this.backBufferContext);
    }
    //Draw ship
    if(!this.respawning || this.respawnTimer <= 150) {
      this.ship.render(this.backBufferContext);
    }
    //Draw asteroids
    this.asteroids.forEach(asteroid => {
      asteroid.render(this.backBufferContext);
    });
    //draw projectiles
    this.projectiles.forEach(projectile => {
      projectile.render(this.backBufferContext);
    });
    //draw particles
    this.particles.forEach(particle => {
      particle.render(this.backBufferContext);
    });
    //Bit blit the back buffer onto the screen
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }
  loop() {
    if(!this.paused && !this.gameOver) {
      this.update();
      this.render();
    }
    if(this.gameOver) {
      this.screenBufferContext.font = "50px Times New Roman";
      this.screenBufferContext.strokeText("GAME OVER", 350, 500);
    }
    if(this.paused) {
      this.screenBufferContext.font = "50px Times New Roman";
      this.screenBufferContext.strokeText("Paused", 425, 600);
    }
  }
}
