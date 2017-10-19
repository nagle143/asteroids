import Ship from './ship.js';

export default class UFO extends Ship {
  constructor() {
    super();
    this.initPosition();
    this.initVelocity();
    this.innerRadius = 10;
    this.radius = 25;
    this.bufferRadius = 60;
    this.critical = 40;
    this.color = 'purple';
    this.lineSegments = [];
    this.initLineSegments();
  }

  initLineSegments() {
    var xi;
    var xf;
    var yi;
    var yf;
    var numSegments = 6;
    for(var i = 0; i < numSegments; i++) {
      var cos = Math.cos(i * Math.PI / 3);
      var sin = Math.sin(i * Math.PI / 3);
      xi = cos * this.innerRadius;
      xf = cos * this.radius;
      yi = -sin * this.innerRadius;
      yf = -sin * this.radius;
      this.lineSegments.push({xI: xi, xF: xf, yI: yi, yF: yf});
    }
  }

  initVelocity() {
    //Sets speed of the asteroids, more mass = slower
    var mag = Math.randomBetween(1, 2);
    this.speed.x = Math.randomBetween(-mag, mag);
    this.speed.y = Math.randomBetween(-mag, mag);
  }

  initPosition() {
    var spawnSide = Math.randomInt(1, 5);
    //Top
    if(spawnSide === 1) {
      this.x = Math.randomBetween(-2 * this.radius, 1000 + 2 * this.radius);
      this.y = - 2 * this.radius;
    }
    //Right
    else if(spawnSide === 2) {
      this.x = 1000 + 2 * this.radius;
      this.y = Math.randomBetween(-2 * this.radius, 1000 + 2 * this.radius);
    }
    //Bottom
    else if(spawnSide === 3) {
      this.x = Math.randomBetween(-2 * this.radius, 1000 + 2 * this.radius);
      this.y = 1000 + 2 * this.radius;
    }
    //Left
    else {
      this.x = - 2 * this.radius;
      this.y = Math.randomBetween(-2 * this.radius, 1000 + 2 * this.radius);
    }
  }

  /** @function edgeDetection()
    * function to handle the asteroid leaving the edge of the screen
    */
  edgeDetection() {
    if(this.x >= 1000 + 2.5 * this.radius) {
      this.x = -2 * this.radius;
    }
    else if(this.x <= -2.5 * this.radius) {
      this.x = 1000 + 2 * this.radius;
    }
    if(this.y >= 1000 + 2.5 * this.radius) {
      this.y = -2 * this.radius;
    }
    else if(this.y <= -2.5 * this.radius) {
      this.y = 1000 + 2 * this.radius;
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
    if(this.speed.x > 0) {
      this.velocity.dir += 0.01;
    }
    else {
      this.velocity.dir -= 0.01;
    }
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.velocity.dir);
    ctx.beginPath();
    ctx.arc(0, 0, this.innerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    this.lineSegments.forEach(segment => {
      ctx.beginPath();
      ctx.moveTo(segment.xI, segment.yI);
      ctx.lineTo(segment.xF, segment.yF);
      ctx.stroke();
    });
    ctx.restore();
  }
}
