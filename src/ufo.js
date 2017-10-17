import Ship from './ship.js';

export default class UFO extends Ship {
  constructor() {
    super();
    this.initPosition();
    this.initVelocity();
    this.innerRadius = 10;
    this.radius = 25;
    this.bufferRadius = 50;
    this.color = 'purple';
  }

  initVelocity() {
    //Sets speed of the asteroids, more mass = slower
    var mag = 3;
    this.speed.x = this.random(-mag, mag);
    this.speed.y = this.random(-mag, mag);
  }

  initPosition() {
    var spawnSide = this.randomInt(1, 5);
    //Top
    if(spawnSide === 1) {
      this.position.x = this.random(-2 * this.radius, 1000 + 2 * this.radius);
      this.position.y = - 2 * this.radius;
    }
    //Right
    else if(spawnSide === 2) {
      this.position.x = 1000 + 2 * this.radius;
      this.position.y = this.random(-2 * this.radius, 1000 + 2 * this.radius);
    }
    //Bottom
    else if(spawnSide === 3) {
      this.position.x = this.random(-2 * this.radius, 1000 + 2 * this.radius);
      this.position.y = 1000 + 2 * this.radius;
    }
    //Left
    else {
      this.position.x = - 2 * this.radius;
      this.position.y = this.random(-2 * this.radius, 1000 + 2 * this.radius);
    }
    //this.position.x = 400;
    //this.position.y = 400;
  }

  /** @function edgeDetection()
    * function to handle the asteroid leaving the edge of the screen
    */
  edgeDetection() {
    if(this.position.x >= 1000 + 2.5 * this.radius) {
      this.position.x = -2 * this.radius;
    }
    else if(this.position.x <= -2.5 * this.radius) {
      this.position.x = 1000 + 2 * this.radius;
    }
    if(this.position.y >= 1000 + 2.5 * this.radius) {
      this.position.y = -2 * this.radius;
    }
    else if(this.position.y <= -2.5 * this.radius) {
      this.position.y = 1000 + 2 * this.radius;
    }
  }

  alterPath(dx, dy) {
    if(dx < 0 && dy < 0) {
      this.speed.x = -1.0;
      this.speed.y = -1.0;
    }
    else if (dx > 0 && dy > 0) {
      this.speed.x = 1.0;
      this.speed.y = 1.0;
    }
    else if (dx > 0 && dy < 0) {
      this.speed.x = 1.0;
      this.speed.y = -1.0;
    }
    else {
      this.speed.x = -1.0;
      this.speed.y = 1.0;
    }
  }

  update() {
    this.edgeDetection();
    this.velocity.dir += 0.01;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }

  render(ctx) {
    //super.render(ctx);
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.innerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
