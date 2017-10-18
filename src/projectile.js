import Particle from './particles.js';

export default class Projectile {
  constructor(x, y, direction, color) {
    this.x = x;
    this.y = y;
    this.radius = 3.5;
    this.color = color;
    this.velocity = {mag: 4.0, dir: direction};
    this.speed = {x: 0.0, y: 0.0};
    this.initSpeed();
    this.particles = [];
  }

  createParticles(numParticles) {
    var x = this.x - Math.sin(this.velocity.dir)* this.radius;
    var y = this.y + Math.cos(this.velocity.dir)* this.radius;
    for(var i = 0; i < numParticles; i++) {
      var dx = x + Math.randomBetween(-this.radius, this.radius);
      var dy = y + Math.randomBetween(-this.radius, this.radius);
      this.particles.push(new Particle(dx, dy, Math.PI * this.velocity.dir, 1.0, this.color, 10));
    }
  }

  initSpeed() {
    this.speed.x = Math.sin(this.velocity.dir) * this.velocity.mag;
    this.speed.y = -Math.cos(this.velocity.dir) * this.velocity.mag;
  }

  edgeDetection() {
    if(this.x + this.radius >= 1000 || this.x - this.radius <= 0 ||
    this.y + this.radius >= 1000|| this.y - this.radius <= 0) {
      return true;
    }
    return false;
  }

  update() {
    this.createParticles(Math.randomInt(3, 6));
    this.x += this.speed.x;
    this.y += this.speed.y;
    //Particle effect for the trail
    for(var j = 0; j < this.particles.length; j++) {
      this.particles[j].update();
      if(this.particles[j].life <= 0) {
        this.particles.splice(j, 1);
      }
    }
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    this.particles.forEach(particle => {
      particle.render(ctx);
    });
  }
}
