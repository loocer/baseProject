import DataBus from '../databus'
import Gan from './gan'
import * as Matter from '../libs/matter'

const Body = Matter.Body
const databus = new DataBus()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
let instance = null
let statPoint = null
let startP = null
let points = []
export default class Hand {
  constructor() {
    this.visible = true
    this.x = 50
    this.y = screenHeight / 5 * 3
    this.r = 30
    this.topDoingFlag = false
    this.upDoingFlag = false
    instance = this

  }
  init(width = 0, height = 0, rotate = 0) {
    this.width = width
    this.height = height
    this.rotate = rotate
  }

  drawToCanvas(ctx) {
    if(statPoint){
      ctx.save()
      // ctx.translate(-databus.trans.x, -databus.trans.y)
      ctx.beginPath();
      ctx.moveTo(statPoint.x, statPoint.y);
      for (let obj of points) {
        ctx.lineTo(obj.x, obj.y);
      }
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#ff0000'; 
      ctx.lineCap = 'round'; 
      ctx.stroke();
      ctx.restore()
    }

  }
  addEventLinner() {
    databus.touchHandMove = instance.handTouchMove
    databus.touchHandEnd = instance.handTouchEnd
    databus.touchHandStart = instance.handTouchStart
    wx.onTouchMove(databus.touchHandMove);
    wx.onTouchEnd(databus.touchHandEnd);
    wx.onTouchStart(databus.touchHandStart);
  }
  handTouchStart(e) {
    let touch = e.touches[0];
    statPoint = {
      x: touch.clientX,
      y: touch.clientY,
    }
    startP = statPoint
    // points.push({
    //   x: touch.clientX,
    //   y: touch.clientY,
    // })
  }
  handTouchEnd() {
    console.log(points.length)
    console.log(11111111)
    points = []
    statPoint = null
  }
  handTouchMove(e) {
    let touch = e.touches[0];
    let mp = {
      x: touch.clientX,
      y: touch.clientY,
    }
    databus.trans.x += (startP.x - mp.x)
    databus.trans.y += (startP.y - mp.y)
    points.push(mp)
    startP =mp
  }
  // 每一帧更新子弹位置
  update(body) {
    if (!this.visible)
      return
    // this.topDoingEvent()
  }
  updateAngle(angle) {
    this.rotate = angle
  }
}