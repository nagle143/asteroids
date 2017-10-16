

export default class Asteroid {
  constructor(x, y, radius, mass, exploded) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = mass;
    this.exploded = exploded;
    this.velocity = {x: 0.0, y: 0.0};
    if(exploded) {
      //explodedVelocity();
    }
    else {
      //initVelocity();
    }
    this.initVelocity();
    //Binders
  }

  initVelocity() {
    this.velocity.x = this.random(-2, 2);
    this.velocity.y = this.random(-2,2);
  }

  explodedVelocity() {

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
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.restore();
  }
}
