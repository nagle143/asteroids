

export default class Asteroid {
  constructor(x, y, mass, direction) {
    this.x = x;
    this.y = y;
    //if somehow this gets called with a mass less than 5
    if(mass < 5) {
      mass = 5;
    }
    this.mass = mass;
    this.radius = mass;
    this.surfacePath = [];
    this.createSurface();
    this.direction = direction;
    this.velocity = {x: 0.0, y: 0.0};
    this.angle = 0.0;
    if(this.direction === -1.0) {
      this.initVelocity();
    }
    else {
      this.explodedVelocity();
    }
  }

  initVelocity() {
    //Sets speed of the asteroids, more mass = slower
    var mag = Math.randomInt(9, 12) / this.mass;
    this.velocity.x = Math.randomBetween(-mag, mag);
    this.velocity.y = Math.randomBetween(-mag, mag);
  }

  createSurface() {
    var segments = 24;
    //15 degree increments
    var angle = Math.PI * 2 / segments;
    var randomRadius = this.radius;
    var x;
    var y;
    for(var i = 0; i < segments; i++) {
      if(Math.randomInt(0, 100) > 70) {
        randomRadius = Math.randomBetween(this.radius * 0.80, this.radius);
      }
      x = Math.cos(i * angle) * randomRadius;
      y = -Math.sin(i * angle) * randomRadius;
      this.surfacePath.push({x: x, y: y});
    }
  }

  explodedVelocity() {
    //Sets speed of the asteroids, more mass = slower
    var mag = Math.randomInt(7, 10) / this.mass;
    //Uses the direction given to ensure the asteroids leave the center of the original asteroid
    this.velocity.x = Math.cos(this.direction) * mag;
    this.velocity.y = -Math.sin(this.direction) * mag;
  }

    /** @function collisionDetection()
    * function to handle asteroid on asteroid violence
    * @param float ax is the x position of the asteroid being checked against this
    * @param float ay is the y position of the asteroid being checked against this
    * @param int aradius is the radius of the asteroid being checked against this
    */
  collisionDetection(ax, ay, aradius) {
    var distance = Math.pow(this.x - ax, 2) + Math.pow(this.y - ay, 2);
    if(distance < Math.pow(this.radius + aradius, 2)) {
      return true;
    }
    return false;
  }

  /** @function edgeDetection()
    * function to handle the asteroid leaving the edge of the screen
    */
  edgeDetection() {
    if(this.x >= 1000 + 2.5 * this.radius) {
      this.x = -2.4 * this.radius;
    }
    else if(this.x <= -2.5 * this.radius) {
      this.x = 1000 + 2.4 * this.radius;
    }
    if(this.y >= 1000 + 2.5 * this.radius) {
      this.y = -2.4 * this.radius;
    }
    else if(this.y <= -2.5 * this.radius) {
      this.y = 1000 + 2.4 * this.radius;
    }
  }

  update() {
    this.edgeDetection();
    if(this.velocity.x > 0) {
      this.angle += 0.01;
    }
    else {
      this.angle -= 0.01;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  render(context) {
    context.save();
    context.strokeStyle = 'white';
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.beginPath();
    context.moveTo(this.surfacePath[0].x,this.surfacePath[0].y);
    for(var i = 1; i < this.surfacePath.length; i++) {
      context.lineTo(this.surfacePath[i].x, this.surfacePath[i].y);
    }
    //context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.restore();
  }
}
