import DataBus from '../databus'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
let databus = new DataBus()
let instance
export default class MiniMap {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.width = 200
    this.height = 200
    this.x = screenWidth - this.width
    this.y = 0
  }
  inClose(x,y){
    return  x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
  }
  getMovePosition(x,y){
    let px = (x - this.x)/this.width*databus.groundWidth-screenWidth/2
    let py = (y - this.y)/this.height*databus.groundHeight-screenHeight/2
    return {x:px,y:py}
  }
  update() {}
  renderEnemys(ctx) {
    databus.hero.forEach((item) => {
      if (item.visible) {
        let x = item.x / databus.groundWidth * this.width + this.x
        let y = item.y / databus.groundHeight * this.height + this.y
        ctx.save()
        ctx.translate(x, y)
        ctx.beginPath();
        ctx.fillStyle = item.color;
        ctx.arc(0, 0, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore()
      }
    })
  }
  render(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#00b3bb";
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.stroke();
    ctx.restore()
    this.renderEnemys(ctx)
  }

}