import DataBus from '../databus'
import data from './data'
import Scoll from './scoll'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
let databus = new DataBus()
let instance
export default class HomePanel {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.tools = data.get('home')
    this.toolWidth = 50
    this.toolHeight = 50
    this.scoolly = 0
    this.width = 130
    this.height = screenHeight - 200
    this.x = 0
    this.y = 200
    this.scoll = new Scoll()
  }

  inClose(x, y) {
    return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
  }
  changeTab(key) {
    this.tools = data.get(key)
    let marginPanel = (this.width - this.toolWidth * 2) / 4
    let hei = Math.ceil(this.tools.length / 2) * (this.toolHeight + marginPanel)
    if (hei < this.height) {
      this.scoll.width = 0
      this.toolWidth = 70
      this.toolHeight = 70
      this.scoolly = 0
      this.width = 160
    } else {
      this.width = 130
      this.scoll.width = 30
      this.scoll.scoolly = 10
      this.toolWidth = 50
      this.toolHeight = 50
      marginPanel = (this.width - this.toolWidth * 2) / 4
      hei = Math.ceil(this.tools.length / 2) * (this.toolHeight + marginPanel)
      this.scoll.toolHeight = (this.height / hei) * (this.scoll.height-100)
      this.scoolly = 0
      
    }

  }
  scoollReset() {
    if (this.scoolly > 0) {
      this.scoolly = 0
    }
    let marginPanel = (this.width - this.toolWidth * 2) / 4
    let hei = Math.ceil(this.tools.length / 2) * (this.toolHeight + marginPanel)
    let height = hei - this.height
    if (Math.abs(this.scoolly) > height) {
      if (height < this.height) {
        this.scoolly = 0
      } else {
        this.scoolly = -height
      }
    }
  }
  navigate(index) {
    console.log('fix----', index)
  }
  getActionNo(x, y) {
    let ps = this.tools
    y += this.scoolly
    for (let index in ps) {
      let p = ps[index]
      if (p.x < x &&
        p.x + this.toolWidth > x &&
        p.y < y &&
        p.y + this.toolHeight > y) {
        this.navigate(index)
      }
    }
  }
  drawNo(ctx) {
    let marginPanel = (this.width - this.toolWidth * 2) / 4
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = "#00b3bb";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fill();
    ctx.restore()
    for (let index in this.tools) {
      let x = index % 2 == 0 ? marginPanel : this.toolWidth + marginPanel * 3
      let y = ~~(index / 2) * (this.toolHeight + marginPanel) + marginPanel + this.scoolly + this.y
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = this.tools[index].color;
      ctx.fillRect(0, 0, this.toolWidth, this.toolHeight);
      ctx.fill();
     
      ctx.restore()
      ctx.save()
      console.log(6666666)
      ctx.fillStyle = '#fff';
      ctx.font = '40px Arial';
      ctx.scale(.2, .2);
      ctx.fillText(this.tools[index][0],x*5,y*5+this.toolHeight/2);
console.log(111222222)
      ctx.restore()
      this.tools[index].x = x
      this.tools[index].y = y
    }
    this.scoll.render(ctx)
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