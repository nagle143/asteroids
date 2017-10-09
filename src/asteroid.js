

export default class Asteroid {
  constructor(x, y, radius, id, exploded) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ID = id;
    this.exploded = exploded;
    this.velocity = {x: 0.0, y: 0.0};
    if(exploded) {
      explodedVelocity();
    }
    else {
      initVelocity();
    }
    //Binders
  }

  initVelocity() {
    if(this.x < 0) {
      this.velocity.x = this.random(1, 5);
    }
    else {
      this.velocity.x = this.random(-1, -5);
    }
    if(this.y < 0) {
      this.velocity.y = this.random(1, 5);
    }
    else {
      this.velocity.y = this.random(1, 5);
    }
  }

  explodedVelocity() {
  
  }

    /** @function collisionDetection()
    * function to hadle particle on particle violence
    * @param float ax is the x position of the circle being checked against this
    * @param float ay is the y position of the circle being checked against this
    * @param int aradius is the radius of the circle being checked against this
    */
  collisionDetection(ax, ay, aradius) {
    var distance = Math.pow(this.x - ax, 2) + Math.pow(this.y - ay, 2);
    if(distance < Math.pow(this.radius + aradius, 2)) {
      return true;
    }
    return false;
  }

  /** @function edgeDetection()
    * function to handle the particle leaving the edge of the screen
    */
  edgeDetection() {
    if(this.x + 2.5* this.radius >= 1000) {
      return true;
    }
    if(this.x -  2.5* this.radius <= 0) {
      return true;
    }
    if(this.y + 2.5 * this.radius >= 1000) {
      return true;
    }
    if(this.y - 2.5 * this.radius <= 0) {
      return true;
    }
    return false;
  }

  /** @function random()
    * Function to get a random number between to values
    * @param int min is the minimum desired value
    * @param int max is the maximum desired value
    */
  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  render(context) {
    context.save();
    context.strokeStyle = 'white';
    context.beginPath();
    context.ar(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.restore();
  }
}
