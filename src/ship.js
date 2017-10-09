

export default class Ship {
  constructor() {
    //position of the center of the Ship
    this.position = {x: 500, y: 500};
    //Angle to determine the direction of the ship
    this.direction = 0.0;

    //Binders
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }
  update() {

  }
  render() {

  }
}
