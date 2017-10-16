

export default class Projectile {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.velocity = {mag: 4.0, dir: direction};
    this.speed = {x: 0.0, y: 0.0};
    this.initSpeed();

    //Binders
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.initSpeed = this.initSpeed.bind(this);

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
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
