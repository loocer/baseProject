import DataBus from '../databus'
import Gan from './gan'
import * as Matter from '../libs/matter'

const Body = Matter.Body
const databus = new DataBus()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
let temp = null
export default class Hand {
  constructor() {
    this.visible = true
    this.x = 50
    this.y = screenHeight / 5 * 3
    this.r = 30
    this.topDoingFlag = false
    this.upDoingFlag = false
    temp = this

  }
  init(width = 0, height = 0, rotate = 0) {
    this.width = width
    this.height = height
    this.rotate = rotate
  }

  drawToCanvas(ctx) {
    
    ctx.save()
    ctx.translate(0, -databus.trans.y)
    if(databus.actionIndex==0){
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }else{
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 0, 0, .2)';
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
    if(databus.actionIndex==1){
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.beginPath();
      ctx.arc(this.x, this.y + 70, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }else{
      ctx.fillStyle = 'rgba(255, 0, 0, .2)';
      ctx.beginPath();
      ctx.arc(this.x, this.y + 70, this.r, 0, 2 * Math.PI);
      ctx.fill();
      
    }
    ctx.restore()
  }
  topDoingEvent() {
    if (temp.topDoingFlag) {
      let py = databus.engGan.position.y - 2
      let px = databus.engGan.position.x
      Body.setPosition(databus.engGan, {
        x: px,
        y: py
      })
      if (py + databus.trans.y < screenHeight /2) {
        databus.transed.y = databus.trans.y
        databus.trans.y = databus.trans.y + 2
        databus.ctx.translate(0,-databus.transed.y)
        databus.ctx.translate(0, databus.trans.y)
      }

    }
    if (temp.upDoingFlag) {
      let py = databus.engGan.position.y + 2
      let px = databus.engGan.position.x
      Body.setPosition(databus.engGan, {
        x: px,
        y: py
      })
      if (py < screenHeight /2) {
        // databus.transed.y = databus.trans.y
        // databus.trans.y = databus.trans.y - 2
        // databus.ctx.translate(0,-databus.transed.y)
        // databus.ctx.translate(0, databus.trans.y)
      }

    }
   

  }
  addEventLinner() {
    console.log(22222222)
    databus.handTouchStart = (e) => {
      for (let p of e.touches) {
        let x = p.clientX
        let y = p.clientY
        if (temp.toTop(x, y)) {
          databus.actionIndex = 0
          temp.topDoingFlag = true
        }
        if (temp.toUp(x, y)) {
          databus.actionIndex = 1
          temp.upDoingFlag = true
        }
      }
    }
    wx.onTouchStart(databus.handTouchStart)
    databus.touchHandEnd = (e) => {
      databus.actionIndex = null
      temp.upDoingFlag = false
      temp.topDoingFlag = false
      // for (let p of e.changedTouches) {
      //   let x = p.clientX
      //   let y = p.clientY
      //   if (temp.toTopCancel(x, y)) {
      //     temp.topDoingFlag = false
      //   }
      //   if(temp.toUpCancel(x,y)){
      //     temp.upDoingFlag = false
      //   }
      // }
    }
    wx.onTouchEnd(databus.touchHandEnd)
  }
  toTop(x, y) {
    return !!(x >= (this.x - this.r ) &&
      y >= (this.y - this.r ) &&
      x <= (this.x + this.r ) &&
      y <= (this.y + this.r ))
  }
  toUp(x, y) {
    return !!(x >= (this.x - this.r / 2) &&
      y >= (this.y + 70 - this.r / 2) &&
      x <= (this.x + this.r / 2) &&
      y <= (this.y + 70 + this.r / 2))
  }
  toTopCancel(x, y) {
    return !!(x >= (this.x - this.r / 2) &&
      y >= (this.y + 70 - this.r / 2) &&
      x <= (this.x + this.r / 2) &&
      y <= (this.y + 70 + this.r / 2))
  }
  toUpCancel(x, y) {
    return !!(x >= (this.x - this.r / 2) &&
      y >= (this.y + 70 - this.r / 2) &&
      x <= (this.x + this.r / 2) &&
      y <= (this.y + 70 + this.r / 2))
  }
  // 每一帧更新子弹位置
  update(body) {
    if (!this.visible)
      return
    this.topDoingEvent()
  }
  updateAngle(angle) {
    this.rotate = angle
  }
}

