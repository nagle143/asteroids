import Ship from './ship.js';

export default class UFO extends Ship {
  constructor() {
    super();
    this.initPosition();
    this.initVelocity();
    this.innerRadius = 10;
    this.outerRadius = 25;
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
      this.position.x = this.random(-2 * this.outerRadius, 1000 + 2 * this.outerRadius);
      this.position.y = - 2 * this.outerRadius;
    }
    //Right
    else if(spawnSide === 2) {
      this.position.x = 1000 + 2 * this.outerRadius;
      this.position.y = this.random(-2 * this.outerRadius, 1000 + 2 * this.outerRadius);
    }
    //Bottom
    else if(spawnSide === 3) {
      this.position.x = this.random(-2 * this.outerRadius, 1000 + 2 * this.outerRadius);
      this.position.y = 1000 + 2 * this.outerRadius;
    }
    //Left
    else {
      this.position.x = - 2 * this.outerRadius;
      this.position.y = this.random(-2 * this.outerRadius, 1000 + 2 * this.outerRadius);
    }
    this.position.x = 400;
    this.position.y = 400;
  }

  /** @function edgeDetection()
    * function to handle the asteroid leaving the edge of the screen
    */
  edgeDetection() {
    if(this.position.x >= 1000 + 2.5 * this.outerRadius) {
      this.position.x = -2 * this.outerRadius;
    }
    else if(this.position.x <= -2.5 * this.outerRadius) {
      this.position.x = 1000 + 2 * this.outerRadius;
    }
    if(this.position.y >= 1000 + 2.5 * this.outerRadius) {
      this.position.y = -2 * this.outerRadius;
    }
    else if(this.position.y <= -2.5 * this.outerRadius) {
      this.position.y = 1000 + 2 * this.outerRadius;
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
    ctx.strokeStyle = 'purple';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.innerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.outerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
