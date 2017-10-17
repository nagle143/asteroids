
import Ship from './ship.js';
import Asteroid from './asteroid.js';
import Projectile from './projectile.js';
import Particle from './particles.js';
import UFO from './ufo.js';

export default class Game {
  constructor() {
    //Num Objects
    this.numAsteroids = 10;
    //Objects/Arrays
    this.ship = new Ship();
    this.ufo = null;
    this.ufoTimer = this.randomInt(1000, 2000);
    this.ufoRateOfFire = this.randomInt(150, 350);
    this.respawning = false;
    this.respawnTimer = 300;
    this.projectiles = [];
    this.rateOfFire = 50;
    this.reloading = false;
    this.asteroids = [];
    this.createAsteroids();
    this.particles = [];
    //HUD Variables
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.teleports = 10;
    this.coolingDown = 50;


    this.theme = new Audio('./theme.wav');
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
    this.HUDcanvas.width = 1000;
    this.HUDcanvas.height = 100;
    this.HUDcontext = this.HUDcanvas.getContext('2d');
    document.body.appendChild(this.HUDcanvas);

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
    this.createProjectile = this.createProjectile.bind(this);
    this.projectileCollisionDetection = this.projectileCollisionDetection.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;

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
    //15 is the length from center to the top pointed, the 1.2 is so you can't run into your own shot immediately
    var x = this.ship.position.x + Math.sin(this.ship.velocity.dir)* this.ship.radius * 1.2;
    var y = this.ship.position.y - Math.cos(this.ship.velocity.dir)* this.ship.radius * 1.2;
    this.projectiles.push(new Projectile(x, y, this.ship.velocity.dir, 'red'));
    this.laser.play();
  }

  ufoProjectile() {
    var dx = this.ufo.position.x - this.ship.position.x;
    var dy = this.ufo.position.y - this.ship.position.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var direction = Math.acos((dy)/ distance);
    if(dx > 0) {
      direction *= -1;
    }
    var x = this.ufo.position.x + Math.sin(direction)* this.ufo.radius * 1.2;
    var y = this.ufo.position.y - Math.cos(direction)* this.ufo.radius * 1.2;
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
    var radius = 50;
    var mass;
    //Var to control the while loop
    var currLength = this.asteroids.length;
    //Loop that generates random values for the particle and makes sure the space is not already occupied
    while (currLength === this.asteroids.length) {
      //Var to determine if it would have spawned inside something
      var collision = false;
      var spawnSide = this.randomInt(1, 5);
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
      mass = this.random(10, 50);
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

  projectileCollisionDetection(pID, aID) {
    var projectile = this.projectiles[pID];
    var asteroid = this.asteroids[aID];
    //console.log(this.projectiles[pID]);
    var distance = Math.pow(projectile.x - asteroid.x, 2) + Math.pow(projectile.y - asteroid.y, 2);
    if(distance < Math.pow(projectile.radius + asteroid.radius, 2)) {
      return true;
    }
    return false;
  }

  projectileShipCollision(projectile, ship) {
    var distance = Math.pow(projectile.x - ship.position.x, 2) + Math.pow(projectile.y - ship.position.y, 2);
    if(distance < Math.pow(projectile.radius + ship.radius, 2)) {
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
      var random = this.randomInt(2, 4);
      this.numAsteroids += random - 1;
      mass /= random;
      var direction = this.random(0, 2 * Math.PI);
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
    var dx = ship.position.x - asteroid.x;
    var dy = ship.position.y - asteroid.y;
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

  shipCollision() {
    var dx = this.ship.position.x - this.ufo.position.x;
    var dy = this.ship.position.y - this.ufo.position.y;
    var dist = dx * dx + dy * dy;
    if(dist < Math.pow(this.ship.radius + this.ufo.radius, 2)) {
      return true;
    }
    return false;
  }

  explode(x, y, color) {
    var numParticles = this.randomInt(50, 100);
    var dir = this.random(0, Math.PI * 2);
    //console.log("In explode")
    for(var i = 0; i < numParticles; i ++) {
      if(this.randomInt(0, 100) > 90) {
        dir = this.random(0, Math.PI * 2);
      }
      this.particles.push(new Particle(x, y, Math.PI * dir, 7, color, 20));
    }
  }

  teleport() {
    var x = this.random(100, 900);
    var y = this.random(100, 900);
    var collision = false;
    do {
      if(collision) {
        x = this.random(100, 900);
        y = this.random(100, 900);
        collision = false;
      }
      if(this.ufo && this.shipCollision()) {
        collision = true;
      }
      this.asteroids.forEach(asteroid => {
        if(this.detectShipCrash(this.ship, asteroid)) {
          collision = true;
        }
      });
      this.projectiles.forEach(projectile => {
        if(this.projectileShipCollision(projectile, this.ship)) {
          collision = true;
        }
      });
    } while(collision);
    this.explode(this.ship.position.x, this.ship.position.y, this.ship.color);
    this.explode(x, y, this.ship.color);
    this.teleportSound.play();
    this.ship.position.x = x;
    this.ship.position.y = y;
    this.ship.speed.x = 0.0;
    this.ship.speed.y = 0.0;
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

  drawHUD() {
    this.HUDcontext.fillStyle = 'black';
    this.HUDcontext.strokeStyle = 'blue';
    this.HUDcontext.fillRect(0, 0, 1000, 100);
    this.HUDcontext.font = '30px Times New Roman';
    this.HUDcontext.strokeText("LIVES: " + this.lives, 10, 50);
    this.HUDcontext.strokeText("LEVEL: " + this.level, 400, 50);
    this.HUDcontext.strokeText("SCORE: " + this.score, 800, 50);
    this.HUDcontext.strokeText("TELEPORTS: " + this.teleports, 550, 50);
    this.HUDcontext.strokeText("ASTEROIDS: " + this.numAsteroids , 150, 50);
  }

  update() {
    this.ship.update();
    if(this.ufo) {
      this.ufo.update();
    }
    this.asteroids.forEach(asteroid => {
      asteroid.update();
    });

    if(this.asteroids.length === 0) {
      this.level++;
      this.lives++;
      this.numAsteroids = 10 + 2* this.level;
      this.createAsteroids();
    }

    if(!this.ufo && this.ufoTimer > 0) {
      this.ufoTimer--;
      if(this.ufoTimer <= 0) {
        this.ufo = new UFO();
        this.ufoTimer = this.randomInt(500, 1000);
      }
    }

    if(this.respawning) {
      this.respawnTimer--;
      if(this.respawnTimer <= 0) {
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
        if(this.projectileCollisionDetection(i, j)) {
          this.explode(this.projectiles[i].x, this.projectiles[i].y, 'red');
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
          this.explode(this.ship.position.x, this.ship.position.y, this.ship.color);
          this.shipExplosion.play();
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
      }
    }

    if(this.ufo) {
      for(var i = 0; i < this.asteroids.length; i++) {
        if(this.detectShipCrash(this.ufo, this.asteroids[i])) {
          this.explode(this.ufo.position.x, this.ufo.position.y, this.ufo.color);
          this.ufo = null;
          this.score += 100;
          this.shipExplosion.play();
          break;
        }
      }
    }

    //Ship to UFO collision
    if(this.ufo && this.shipCollision()) {
      this.explode(this.ship.position.x, this.ship.position.y, this.ship.color);
      this.projectiles.splice(i, 1);
      this.shipExplosion.play();
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

    //projectile ship collision checks
    for(var i = 0; i < this.projectiles.length; i++) {
      if(!this.respawning && this.projectileShipCollision(this.projectiles[i], this.ship)) {
        this.explode(this.ship.position.x, this.ship.position.y, this.ship.color);
        this.projectiles.splice(i, 1);
        this.shipExplosion.play();
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
        break;
      }
      if(this.ufo && this.projectileShipCollision(this.projectiles[i], this.ufo)) {
        this.explode(this.ufo.position.x, this.ufo.position.y, this.ufo.color);
        this.projectiles.splice(i, 1);
        this.ufo = null;
        this.score += 100;
        this.shipExplosion.play();
        break;
      }
    }

    //Input Map Applying
    if(this.keyMap[65] || this.keyMap[37]){
      this.ship.velocity.dir -= 0.05;
      if(this.ship.velocity.dir <= -Math.PI * 2) {
        this.ship.velocity.dir = 0.0;
      }
    }
    if(this.keyMap[68] || this.keyMap[39]) {
      this.ship.velocity.dir += 0.05;
      if(this.ship.velocity.dir >= Math.PI * 2) {
        this.ship.velocity.dir = 0.0;
      }
    }
    if((this.keyMap[87] || this.keyMap[38]) && (this.respawnTimer <= 150 || !this.respawning)) {
      this.ship.velocity.mag = 0.1;
      this.ship.updateSpeed();
      var numParticles = Math.floor(this.random(2, 6));
      this.ship.createParticles(numParticles);
    }
    if(this.keyMap[32] && this.rateOfFire === 50 && !this.respawning) {
      this.createProjectile();
      this.reloading = true;
    }
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
        this.ufoRateOfFire = this.randomInt(150, 350);
      }
    }
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
    this.backBufferContext.fillRect(0,0, 1000, 1000);
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
    if(!this.gameOver) {
      this.update();
      this.render();
    }
    else {
      this.screenBufferContext.font = "50px Times New Roman";
      this.screenBufferContext.strokeText("GAME OVER", 350, 500);
    }
  }
}
