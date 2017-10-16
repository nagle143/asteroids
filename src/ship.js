import Projectile from './projectile.js';
import Particle from './particles.js';

export default class Ship {
  constructor() {
    //position of the center of the Ship
    this.position = {x: 500, y: 500};
    //Velocity to determine the magnitude/direction of the ship
    this.velocity = {mag: 0.0, dir: 0.0};
    this.speed = {x: 0.0, y: 0.0};
    //Projectile Array
    this.projectiles = [];
    this.rateOfFire = 40;
    this.reloading = false;
    //particles
    this.particles = [];

    //Input Map
    this.keyMap = {32: false, 65: false, 68: false, 87: false, 88: false};

    //Binders
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.createProjectile = this.createProjectile.bind(this);
    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;
  }

  handleKeyDown(event) {
    event.preventDefault();
    this.keyMap[event.keyCode] = true;
  }

  handleKeyUp(event) {
    event.preventDefault();
    this.keyMap[event.keyCode] = false;
  }

  updateSpeed() {
    this.speed.y += -Math.cos(this.velocity.dir) * this.velocity.mag;
    this.speed.x += Math.sin(this.velocity.dir) * this.velocity.mag;
    if(Math.abs(this.speed.x) >= 2.0) {
      if(this.speed.x < 0) {
        this.speed.x = -2.0;
      }
      else {
        this.speed.x = 2.0;
      }
    }
    if(Math.abs(this.speed.y) >= 2.0) {
      if(this.speed.y < 0) {
        this.speed.y = -2.0;
      }
      else {
        this.speed.y = 2.0;
      }
    }
  }

  edgeDetection() {
    if(this.position.x <= -15) {
      this.position.x = 1000;
    }
    if(this.position.y <= -15) {
      this.position.y = 1000;
    }
    if(this.position.x >= 1015) {
      this.position.x = 0;
    }
    if(this.position.y >= 1015) {
      this.position.y = 0;
    }
  }

  createProjectile() {
    //15 is the length from center to the top pointd
    var x = this.position.x + Math.sin(this.velocity.dir)* 15;
    var y = this.position.y - Math.cos(this.velocity.dir)* 15;
    this.projectiles.push(new Projectile(x, y, this.velocity.dir));
  }

  createParticles(numParticles) {
    var x = this.position.x - Math.sin(this.velocity.dir)* 15;
    var y = this.position.y + Math.cos(this.velocity.dir)* 15;
    for(var i = 0; i < numParticles; i++) {
      this.particles.push(new Particle(x, y, Math.PI * this.velocity.dir));
    }
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  update() {
    this.edgeDetection();
    if(this.keyMap[65]){
      this.velocity.dir -= 0.05;
      if(this.velocity.dir <= -Math.PI * 2) {
        this.velocity.dir = 0.0;
      }
    }
    if(this.keyMap[68]) {
      this.velocity.dir += 0.05;
      if(this.velocity.dir >= Math.PI * 2) {
        this.velocity.dir = 0.0;
      }
    }
    if(this.keyMap[87]) {
      this.velocity.mag = 0.1;
      this.updateSpeed();
      var numParticles = Math.floor(this.random(2, 6));
      this.createParticles(numParticles);
    }
    if(this.keyMap[32] && this.rateOfFire === 40) {
      this.createProjectile();
      this.reloading = true;
    }
    if(this.keyMap[88]) {
      console.log(this.projectiles);
    }
    if(this.reloading) {
      this.rateOfFire--;
    }
    if(this.rateOfFire <= 0) {
      this.rateOfFire = 40;
      this.reloading = false;
    }
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    for(var i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
      if(this.projectiles[i].edgeDetection()) {
        this.projectiles.splice(i, 1);
      }
    }
    for(var j = 0; j < this.particles.length; j++) {
      this.particles[j].update();
      if(this.particles[j].life <= 0) {
        this.particles.splice(j, 1);
      }
    }
  }

  render(ctx) {
    ctx.save()
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.velocity.dir);
    ctx.moveTo(0, -15);
    ctx.lineTo(10, 15);
    ctx.lineTo(-10, 15);
    ctx.lineTo(0, -15);
    //ctx.closePath();
    ctx.stroke();
    ctx.restore();
    this.projectiles.forEach(projectile => {
      projectile.render(ctx);
    });
    this.particles.forEach(particle => {
      particle.render(ctx);
    });
  }
}
