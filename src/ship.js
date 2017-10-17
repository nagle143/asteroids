import Particle from './particles.js';

export default class Ship {
  constructor() {
    //position of the center of the Ship
    this.position = {x: 500, y: 500};
    //Velocity to determine the magnitude/direction of the ship
    this.velocity = {mag: 0.0, dir: 0.0};
    this.speed = {x: 0.0, y: 0.0};
    this.radius = 15;
    //particles
    this.particles = [];
    this.color = 'green';

    //Binders
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);
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
    if(this.position.x <= -this.radius) {
      this.position.x = 1000;
    }
    if(this.position.y <= -this.radius) {
      this.position.y = 1000;
    }
    if(this.position.x >= 1000 + this.radius) {
      this.position.x = 0;
    }
    if(this.position.y >= 1000 + this.radius) {
      this.position.y = 0;
    }
  }

  createParticles(numParticles) {
    var x = this.position.x - Math.sin(this.velocity.dir)* this.radius;
    var y = this.position.y + Math.cos(this.velocity.dir)* this.radius;
    for(var i = 0; i < numParticles; i++) {
      var dx = x + this.random(-2, 2);
      var dy = y + this.random(-2, 2);
      this.particles.push(new Particle(dx, dy, Math.PI * this.velocity.dir, 2.0, 'red', 20));
    }
  }

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
    this.edgeDetection();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //Particle effect for the thruster
    for(var j = 0; j < this.particles.length; j++) {
      this.particles[j].update();
      if(this.particles[j].life <= 0) {
        this.particles.splice(j, 1);
      }
    }
  }

  render(ctx) {
    ctx.save()
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.velocity.dir);
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(10, this.radius);
    ctx.lineTo(-10, this.radius);
    ctx.lineTo(0, -this.radius);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    this.particles.forEach(particle => {
      particle.render(ctx);
    });
  }
}
