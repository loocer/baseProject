import '../libs/weapp-adapter'
import '../libs/symbol'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
import DataBus from '../databus'
import * as Matter from '../libs/matter'
import Gan from '../base/gan'
import Ball from '../base/ball'
import Hand from '../base/hand'
import Loos from '../base/loos'
const databus = new DataBus()

const Body = Matter.Body
let doIndex = 5
let instance
let allMakeLove = 30
export default class Physics {
  constructor() {
    if (instance)
      return instance

    instance = this
    this.allPasition = []
    this.moveY = 0
    this.startY = 0
    this.gan = new Gan()
    this.ball = new Ball()
    this.hand = new Hand()
    this.loos = new Loos()
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
    let ys = 300 - this.moveY
    let aLLRow = Math.ceil(allMakeLove / 4) + 1
    for (let i = 0; i < aLLRow; i++) {
      let sx = 50
      let ex = (screenWidth - 100) + 50
      let h = (screenWidth - 100) / 4
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
  navigate(index){
    if(doIndex<index){
      wx.showToast({
        title: '请一步一步解锁关卡！',
        icon: 'none',
        duration: 2000
      })
    }else{
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
    let mvu = allMakeLove
    let row = Math.ceil(mvu / 4)
    let index = 0,
      list = []
    let yd = 305 - this.moveY
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
        let x1 = (screenWidth - 100) / 4 * t + 55
        let x2 = (screenWidth - 100) / 4 - 10
        let y1 = (screenWidth - 100) / 4 * i + yd
        let y2 = (screenWidth - 100) / 4 - 10
        ctx.fillRect(x1, y1, x2, y2)
        ctx.fillStyle = '#fff';
        ctx.font = '100px Arial';
        let tx = (screenWidth - 100) / 4 * t + 50 + 20
        let ty = (screenWidth - 100) / 4 * i + yd + 20
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

        // ctx.fillText('关卡', (screenWidth - 100) / 4 * t + 50 + 20, (screenWidth - 100) / 4 * i + yd+50);
      }
    }

  }
  drawPanel(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, screenWidth, 290);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, screenHeight - 80, screenWidth, screenHeight);
  }
  addEventLinner() {
    let that = this
    wx.onTouchMove(e => {

      let touch = e.touches[0].clientY;
      let moveY = that.moveY
      let startY = this.startY
      startY = !startY ? touch : startY
      that.moveY = startY - touch + moveY
      this.startY = touch
    });
    wx.onTouchEnd(e => {
      let touch = e.changedTouches[0];
      let y = touch.clientY
      let x = touch.clientX
      let row = Math.ceil(allMakeLove / 4)
      let h = (screenWidth - 100) / 4
      if (this.moveY < 0) { // 到顶
        this.moveY = 0;
      } else if (this.moveY > (row - 4) * h) { // 到底
        this.moveY = (row - 4) * h;
      }
      this.checkPastion(x, y)
    });
    wx.onTouchStart(e => {
      let touch = e.touches[0];
      this.startY = touch.clientY
      // startY = undefined;
      // if (moveY < 0) { // 到顶
      //   moveY = 0;
      // } else if (moveY > itemCanvas.height - 590) { // 到底
      //   moveY = itemCanvas.height - 590;
      // }
      // reDrawItem(moveY);
    });

  }
  drawCol(ctx) {
    let ys = 300 - this.moveY
    let boxWidth = (screenWidth - 100) / 4
    let allH = Math.ceil(allMakeLove / 4) * boxWidth + ys
    let onex1 = 50
    let onex2 = (screenWidth - 100) / 4 + 50
    let onex3 = (screenWidth - 100) / 4 * 2 + 50
    let onex4 = (screenWidth - 100) / 4 * 3 + 50
    let onex5 = (screenWidth - 100) / 4 * 4 + 50
    let xlist = [onex1, onex2, onex3, onex4, onex5]
    for (let obj of xlist) {
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.moveTo(obj, ys);
      ctx.lineTo(obj, allH);
      ctx.stroke();
    }

  }
  render(ctx) {



    // 重置渲染上下文并清空画布



    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "#fff";
    ctx.fillRect(0, -databus.trans.y, screenWidth, screenHeight);
    // 恢复先前渲染上下文所进行的变换
    this.drawCol(ctx)
    this.drawRow(ctx)
    this.drawNo(ctx)
    this.drawPanel(ctx)
    this.drawBorder(ctx)

  }
}