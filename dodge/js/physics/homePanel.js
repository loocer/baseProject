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
    this.finlWidth = 50
    this.finlHeight = 50
    this.toolHeight = 50
    this.scoolly = 0
    this.width = 130
    this.key = 'home'
    this.panelCiose = []
    this.height = screenHeight - 200
    this.x = 0
    this.y = 200
    this.chenagPanelFlag = true
    this.scoll = new Scoll()
    this.clickNo = 0
    this.movePanel = null
    this.movePanelState = false
    this.movePoint = {}
  }
  checkMovePanelState(x,y) {
    let rx = x -this.movePoint.x + databus.trans.x
    let ry = y -this.movePoint.y+ databus.trans.y
    if (rx>160) {
      databus.hero.forEach((item) => {
        if (rx > item.x && rx < item.x + this.width && ry > item.y && ry < item.y + this.height) {
          return false
        }
      })
      return true
    }else{
      return false
    }
  }
  inClose(x, y) {
    let index = 0
    for (let obj of this.panelCiose) {
      if (x > obj.x && x < obj.x + this.toolWidth && y > obj.y && y < obj.y + this.toolHeight) {
        this.clickNo = index
        this.code = obj.obj[0]
        this.chiosePnael = obj
        this.movePoint = {
          x: x - obj.x,
          y: y - obj.y
        }
        return true
      }
      index++
    }
    // return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
  }

  changeTab(key) {
    this.key = key
    this.tools = data.get(key)
    let marginPanel = (this.width - this.toolWidth * 2) / 4
    let hei = Math.ceil(this.tools.length / 2) * (this.toolHeight + marginPanel)
    let falg = this.chenagPanelFlag == hei < this.height
    if (hei < this.height) {
      if (!falg) {
        this.scoolly = 0
      }
      this.scoll.width = 0
      this.toolWidth = 70
      this.toolHeight = 70

      this.width = 160
    } else {
      if (!falg) {
        this.scoolly = 0
        this.scoll.scoolly = 10
      }
      this.width = 130
      this.scoll.width = 30

      this.toolWidth = 50
      this.toolHeight = 50
      marginPanel = (this.width - this.toolWidth * 2) / 4
      hei = Math.ceil(this.tools.length / 2) * (this.toolHeight + marginPanel)
      this.scoll.toolHeight = (this.height / hei) * (this.scoll.height - 100)

    }
    this.chenagPanelFlag = hei < this.height

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
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fill();
    ctx.restore()
    let temps = []
    for (let temp of this.tools) {
      if (temp[1].exObj.status != 0) {
        temps.push(temp)
      }
    }
    this.panelCiose = []
    for (let index in temps) {
      let exObj = temps[index][1].exObj
      let x = index % 2 == 0 ? marginPanel : this.toolWidth + marginPanel * 3
      let y = ~~(index / 2) * (this.toolHeight + marginPanel) + marginPanel + this.scoolly + this.y
      this.panelCiose.push({
        x,
        y,
        obj: temps[index]
      })
      if (instance.movePanel == index) {
        continue
      }
      if (exObj.status == 1) {
        ctx.save()
        ctx.translate(x, y)
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, this.toolWidth, this.toolHeight);
        ctx.fill();
        ctx.restore()
        ctx.save()
        ctx.fillStyle = '#001fff';
        ctx.font = '40px Arial';
        ctx.scale(.2, .2);
        ctx.fillText(temps[index][0], x * 5, y * 5 + this.toolHeight / 2);
        ctx.restore()
        this.tools[index].x = x
        this.tools[index].y = y
      }
      if (exObj.status == 4) {
        let fib = exObj.progress / exObj.time
        ctx.save()
        ctx.translate(x, y)
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, this.toolWidth, this.toolHeight);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.62)';
        ctx.fillRect(this.toolWidth * fib, 0, this.toolWidth * (1 - fib), this.toolHeight);
        ctx.fill();
        ctx.restore()
        ctx.save()
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.scale(.2, .2);
        ctx.fillText(temps[index][0], x * 5, y * 5 + this.toolHeight / 2);
        ctx.restore()
        this.tools[index].x = x
        this.tools[index].y = y
      }
      if (exObj.status == 3 || exObj.status == 2) {
        let fib = exObj.progress / exObj.time
        ctx.save()
        ctx.translate(x, y)
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, this.toolWidth, this.toolHeight);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.62)';
        ctx.fillRect(this.toolWidth * fib, 0, this.toolWidth * (1 - fib), this.toolHeight);
        ctx.fill();
        ctx.restore()
        ctx.save()
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.scale(.2, .2);
        ctx.fillText(temps[index][0], x * 5, y * 5 + this.toolHeight / 2);
        ctx.restore()
        this.tools[index].x = x
        this.tools[index].y = y
      }

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
  render(ctx) {
    this.drawNo(ctx)
  }

}