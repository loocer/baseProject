import '../libs/weapp-adapter'
import '../libs/symbol'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
import DataBus from '../databus'
import draw from '../bullet/draw'
import * as Matter from '../libs/matter'
import Gan from '../base/gan'
import Ball from '../base/ball'
import Hand from '../base/hand'
import Loos from '../base/loos'
import io from '../libs/socketio';

const databus = new DataBus()
let socket = null
let instance
export default class Physics {
  constructor() {
    if (instance)
      return instance

    instance = this
    this.allPasition = []
    this.moveY = 0
    this.code = null
    this.startY = 0
    this.comeMas = {
      name: 'test'
    }
    this.gan = new Gan()
    this.ball = new Ball()
    this.hand = new Hand()
    this.loos = new Loos()
  }
  init() {
    socket = io('http://172.16.25.101:3000');
    socket.on('chat message', function (s) {
      databus.bullets = s.bullets
      databus.hero = s.heros
    });
    socket.on('event', function (data) {});
    socket.on('disconnect', function () {});
  }
  reset(ctx) {

  }
  update() {

  }
  queryNo() {
    let x = 400
    let y = 500

  }
  handTouchMove(e) {}
  handTouchEnd(e) {}
  connectNet() {
    socket.emit('chat message', {
      name: 'fuck you tom,wo shi ted:' + instance.code
    })
  }
  handTouchStart(e) {
    let touch = e.touches[0];
    let obj = {}
    obj.x = touch.clientX
    obj.y = touch.clientY
    obj.width =30
    obj.height = 30
    obj.isReal = false
    obj.visible = true
    let herosIds = ['1234']
    socket.emit('rosot', {Point:obj,herosIds,evType:'MOVE'})
    //   wx.login({
    //     success:(res)=>{
    //       if (res.code) {
    //         console.log(666666)
    //         instance.code = res.code
    //         instance.connectNet()
    //         console.log(res)
    //       } else {
    //         console.log('登录失败！' + res.errMsg)
    //       }
    //     }
    //   })
  }
  addEventLinner() {
    databus.touchHandMove = instance.handTouchMove
    databus.touchHandEnd = instance.handTouchEnd
    databus.touchHandStart = instance.handTouchStart
    wx.onTouchMove(databus.touchHandMove);
    wx.onTouchEnd(databus.touchHandEnd);
    wx.onTouchStart(databus.touchHandStart);
  }
  render(ctx) {



    // 重置渲染上下文并清空画布



    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "black";
    // ctx.fillRect(0, -databus.trans.y, screenWidth, screenHeight);
    // ctx.fillStyle = "green"
    // ctx.font = "20px Arial"
    // ctx.fillText(
    //   this.comeMas.name,
    //   20,
    //   screenHeight/2
    // )
    databus.hero.forEach((item) => {
      if (item.visible) {
        draw.drawHero(ctx, item)
        // item.drawToCanvas(ctx)
      }
    })
    databus.bullets.forEach((item) => {
      if (item.visible) {
        draw.drawBullets(ctx, item)
        // item.drawToCanvas(ctx)
      }
    })
  }
}