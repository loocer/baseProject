import DataBus from '../databus'
import HomePanel from './homePanel'
import data from './data'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
let databus = new DataBus()
let instance
export default class ToolTab {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.tools = [{
      name: 'home',
      color:'#046990'
    }, {
      name: 'tool',
      color:'#0effde'
    }, {
      name: 'sojer',
      color:'#3cf500'
    },{
      name: 'tanke',
      color:'#f5e200'
    }]
    this.toolWidth = 40
    this.toolHeight =40
    this.scoolly = 0
    this.width = 160
    this.height = 40
    this.x = 0
    this.y = 160
    this.homePanel = new HomePanel()
  }

  inClose(x, y) {
    return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
  }
  chagePanel(x,y){
    let key = this.chiosePanel(x,y)
    this.homePanel.tools = data.get(key)
  }
  chiosePanel(x,y){
    for (let index in this.tools) {
      let wxx = index*this.toolWidth
      let wix = (index+1)*this.toolWidth
      if(x > wxx&& x < wix&& y > this.y && y < this.y + this.height){
        return this.tools[index].name
      }
    }
  }
  drawNo(ctx) {
    for (let index in this.tools) {
      let x = index*this.toolWidth
      let y =  this.y
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = this.tools[index].color;
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