
export default class Particle {
  constructor(x, y, direction) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.life = 15;
    this.color = 'red';
    this.speed = 2.0;
    this.speedX = Math.sin(direction) * this.speed;
    this.speedY = -Math.sin(direction) * this.speed;

    //Binders
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.random = this.random.bind(this)
  }
  update() {
    var dist = this.random(1, 10);
    var dx = this.startX - this.x;
    var dy = this.startY - this.y;
    this.life--;
    if(dist * dist <= dx * dx + dy * dy) {
      return;
    }
      this.x += this.speedX;
      this.y += this.speedY;
  }
  render(ctx) {
    ctx.save()
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  random(min, max) {
    return Math.random() * (max - min) + min;
  }
}
