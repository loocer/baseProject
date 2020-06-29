import DataBus from '../databus'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
let databus = new DataBus()
let instance
export default class HomePanel {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.tools = [{
      name: 'home1'
    }, {
      name: 'home2'
    }, {
      name: 'home2'
    },{
      name: 'home2'
    }]
    this.toolWidth = 80
    this.toolHeight = 80
    this.scoollX = 0
    this.width = 200
    this.height = 200
    this.x = 0
    this.y = 200
  }

  inClose(x, y) {
    return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
  }
  drawNo(ctx) {
    let marginPanel =  (this.width - this.toolWidth * 2) / 4 
    for (let index in this.tools) {
      console.log(marginPanel)
      let x = index % 2 ?marginPanel : this.toolWidth+marginPanel*3
      let y = ~~(index / 2)*(this.toolHeight+marginPanel) + marginPanel + this.scoollX+this.y
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, this.toolWidth, this.toolHeight);
      ctx.fill();
      ctx.restore()
    }

  }
  getMovePosition(x, y) {
    let px = (x - this.x) / this.width * databus.groundWidth - screenWidth / 2
    let py = (y - this.y) / this.height * databus.groundHeight - screenHeight / 2
    return {
      x: px,
      y: py
    }
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
    this.drawNo(ctx)
  }

}