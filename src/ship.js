import Particle from './particles.js';

export default class Ship {
  constructor() {
    //position of the center of the Ship
    this.x = 500;
    this.y = 500;
    //Velocity to determine the magnitude/direction of the ship
    this.velocity = {mag: 0.0, dir: 0.0};
    this.speed = {x: 0.0, y: 0.0};
    this.radius = 15;
    //particles
    this.particles = [];
    this.color = 'green';
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
    if(this.x <= -this.radius) {
      this.x = 1000;
    }
    if(this.y <= -this.radius) {
      this.y = 1000;
    }
    if(this.x >= 1000 + this.radius) {
      this.x = 0;
    }
    if(this.y >= 1000 + this.radius) {
      this.y = 0;
    }
  }

  createParticles(numParticles) {
    var x = this.x - Math.sin(this.velocity.dir)* this.radius;
    var y = this.y + Math.cos(this.velocity.dir)* this.radius;
    for(var i = 0; i < numParticles; i++) {
      var dx = x + Math.randomBetween(-3, 3);
      var dy = y + Math.randomBetween(-3, 3);
      this.particles.push(new Particle(dx, dy, Math.PI * this.velocity.dir, 2.0, 'red', 20));
    }
  }

  update() {
    this.edgeDetection();
    this.x += this.speed.x;
    this.y += this.speed.y;

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
    ctx.translate(this.x, this.y);
    ctx.rotate(this.velocity.dir);
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(10, this.radius);
    ctx.lineTo(0, this.radius / 1.5);
    ctx.lineTo(-10, this.radius);
    ctx.lineTo(0, -this.radius);
    ctx.stroke();
    ctx.restore();
    this.particles.forEach(particle => {
      particle.render(ctx);
    });
  }
}
