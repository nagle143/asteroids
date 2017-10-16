

export default class Asteroid {
  constructor(x, y, mass, direction) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.radius = mass;
    this.surfacePath = [];
    this.createSurface();
    this.direction = direction;
    this.velocity = {x: 0.0, y: 0.0};
    if(this.direction === -1.0) {
      this.initVelocity();
    }
    else {
      this.explodedVelocity();
    }
  }

  initVelocity() {
    //Sets speed of the asteroids, more mass = slower
    var mag = 10 / this.mass;
    this.velocity.x = this.random(-mag, mag);
    this.velocity.y = this.random(-mag, mag);
  }

  createSurface() {
    //Don't calculate the last one so the start and end match up
    var segments = 24;
    //15 degree increments
    var angle = Math.PI * 2 / segments;
    var randomRadius = this.radius;
    var x;
    var y;
    for(var i = 0; i < segments; i++) {
      if(this.randomInt(0, 100) > 70) {
        randomRadius = this.random(this.radius * 0.80, this.radius);
      }
      x = Math.cos(i * angle) * randomRadius;
      y = -Math.sin(i * angle) * randomRadius;
      this.surfacePath.push({x: x, y: y});
    }
    console.log(this.surfacePath);
  }

  explodedVelocity() {
    //Sets speed of the asteroids, more mass = slower
    var mag = 6 / this.mass;
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

  update() {
    this.edgeDetection();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  render(context) {
    context.save();
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(this.x + this.surfacePath[0].x, this.y + this.surfacePath[0].y);
    for(var i = 1; i < this.surfacePath.length; i++) {
      context.lineTo(this.x + this.surfacePath[i].x, this.y + this.surfacePath[i].y);
    }
    //context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.restore();
  }
}
