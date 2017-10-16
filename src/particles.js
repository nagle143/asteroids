
export default class Particle {
  constructor(x, y, direction, speed, color, life) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.life = life;
    this.color = color;
    this.speed = speed;
    this.speedX = Math.cos(direction) * this.speed;
    this.speedY = -Math.sin(direction) * this.speed;
    this.decayDistance = this.random(10, 50);

    //Binders
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.random = this.random.bind(this)
  }
  update() {
    //random distance to determine if the particles updates or not
    //Honestly, no idea why it works, but it does

    var dx = this.startX - this.x;
    var dy = this.startY - this.y;
    this.life--;
    if(this.decayDistance * this.decayDistance <= dx * dx + dy * dy) {
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
