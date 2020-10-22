
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
import DataBus from '../../main/databus'
import {
  GAME_IMG
} from '../../utils/common'
const databus = new DataBus()

let doIndex = 5
let instance
let allMakeLove = 60
let initTop =120 
let IMG = null
export default class Physics {
  constructor() {
    if (instance)
      return instance

    instance = this
    this.allPasition = []
    this.moveY = 0
    this.startY = 0
    this.width = 320
    this.passBg = GAME_IMG.get('passBg')
  }
  init(){

  }
  reset(ctx) {

  }
  update() {

  }
  queryNo() {
    let x = 400
    let y = 500

  }
  drawRow(ctx) {
    let ys = initTop - this.moveY
    let boxWidth = this.width / 4
    let onex1 = (screenWidth - this.width)/2
    let aLLRow = Math.ceil(allMakeLove / 4) + 1
    for (let i = 0; i < aLLRow; i++) {
      let sx =onex1
      let ex = this.width+onex1
      let h = this.width / 4
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.moveTo(sx, h * i + ys);
      ctx.lineTo(ex, h * i + ys);
      ctx.stroke();
    }
  }
  drawBorder(ctx) {
    ctx.strokeStyle = 'green';
    ctx.strokeRect(40, 290, screenWidth - 80, screenHeight - 350);

  }
  navigate(index) {
    if (doIndex < index) {
      wx.showToast({
        title: '请一步一步解锁关卡！',
        icon: 'none',
        duration: 2000
      })
    } else {
      databus.pageIndex = 1
    }

  }
  checkPastion(x, y) {
    let ps = this.allPasition
    for (let p of ps) {
      if (p.x1 < x &&
        p.x2 + p.x1 > x &&
        p.y1 < y &&
        p.y2 + p.y1 > y) {
        this.navigate(p.index)
      }
    }
  }
  drawNo(ctx) {
    let boxWidth = this.width / 4
    let onex1 = (screenWidth - this.width)/2

    let mvu = allMakeLove
    let row = Math.ceil(mvu / 4)
    let index = 0,
      list = []
    let yd = initTop - this.moveY
    for (let i = 0; i < row; i++) {
      for (let t = 0; t < 4; t++) {
        index++
        if (index > mvu) {
          this.allPasition = list
          return
        }
        if (index < doIndex - 1) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        }
        if (index == doIndex - 1) {
          ctx.fillStyle = "rgba(0, 231, 255, 0.55)";
        }
        if (index > doIndex - 1) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.23)";
        }
        let x1 = boxWidth * t + onex1
        let x2 = x1+boxWidth
        let y1 = boxWidth * i + yd
        let y2 = boxWidth+y1
        ctx.drawImage(this.passBg[4], 0, 0, 156, 148, x1,y1,boxWidth,boxWidth)
        
        ctx.fillStyle = '#fff';
        ctx.font = '100px Arial';
        let tx = x1 + 20
        let ty = boxWidth * i + yd + 20
        ctx.save();
        ctx.scale(.2, .2);
        ctx.fillText(index, tx * 5, ty * 5);
        list.push({
          x1,
          y1,
          x2,
          y2,
          index
        })
        ctx.restore()
      }
    }

  }
  drawPanel(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, screenWidth, 290);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, screenHeight - 80, screenWidth, screenHeight);
  }
  handTouchMove(e) {
    instance.moveTouches = e.touches[0]
    let touch = e.touches[0].clientY;
    let moveY = instance.moveY
    let startY = instance.startY
    startY = !startY ? touch : startY
    instance.moveY = startY - touch + moveY
    instance.startY = touch
  }
  handTouchEnd(e) {
    
    let time = e.timeStamp
    let touch = e.changedTouches[0];
    let lastX = instance.moveTouches.clientX
    let lastY = instance.moveTouches.clientY
    let y = touch.clientY
    let x = touch.clientX
    let row = Math.ceil(allMakeLove / 4)
    let h = instance.width / 4
    if (instance.moveY < 0) { // 到顶
      instance.moveY = 0;
    } else if (instance.moveY > (row -4) * h+initTop+30) { // 到底
      instance.moveY = (row - 4) * h+initTop+30;
    }
    if (lastX == x && lastY == y&&time-instance.startTime<100) {
      instance.checkPastion(x, y)
    }
  }
  handTouchStart(e) {
    let time = e.timeStamp
    let touch = e.touches[0];
    instance.moveTouches = e.touches[0]
    instance.startY = touch.clientY
    instance.startTime = time
  }
  addEventLinner() {
    databus.touchHandMove = instance.handTouchMove
    databus.touchHandEnd = instance.handTouchEnd
    databus.touchHandStart = instance.handTouchStart
    wx.onTouchMove(databus.touchHandMove);
    wx.onTouchEnd(databus.touchHandEnd);
    wx.onTouchStart(databus.touchHandStart);
  }
  drawCol(ctx) {
    let ys = initTop - this.moveY
    let boxWidth = this.width / 4
    let allH = Math.ceil(allMakeLove / 4) * boxWidth + ys
    let onex1 = (screenWidth - this.width)/2
    let onex2 = onex1 + boxWidth
    let onex3 = onex2 + boxWidth
    let onex4 = onex3 + boxWidth
    let onex5 = onex4 + boxWidth
    let xlist = [onex1, onex2, onex3, onex4, onex5]
    for (let obj of xlist) {
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.moveTo(obj, ys);
      ctx.lineTo(obj, allH);
      ctx.stroke();
    }

  }
  drawBg(ctx){
    let width = 450
    let x = (screenWidth - width)/2
    let y = initTop- 40
    let height = 550/880*width
    ctx.drawImage(this.passBg[5], 0, 0, 880, 550, x,y,width,height)
  }
  render(ctx) {



    // 重置渲染上下文并清空画布



    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "#fff";
    ctx.fillRect(0, -databus.transY, screenWidth, screenHeight);
    // ctx.drawImage(
    //   IMG,
    //   0,
    //   0,
    //   screenWidth,
    //   screenHeight
    // )
    // 恢复先前渲染上下文所进行的变换
   
    this.drawCol(ctx)
    this.drawRow(ctx)
    this.drawNo(ctx)
     this.drawBg(ctx)
    // this.drawPanel(ctx)
    // this.drawBorder(ctx)

  }
}