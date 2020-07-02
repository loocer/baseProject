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
import {
  GAME_IMG
} from '../utils/common'
const databus = new DataBus()

const Body = Matter.Body
let doIndex = 5
let instance
let allMakeLove = 30
let IMG = null
export default class init {
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
    IMG = GAME_IMG.get('bg')
  }
  init(){
    let button = wx.createUserInfoButton({
      type: 'text',
      text: '进入',
      style: {
        left: 10,
        top: 76,
        width: 200,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    })
    button.onTap((res) => {
      try {
        wx.setStorageSync('userInfo', res.userInfo)
        wx.setStorageSync('signature', res.signature)
        databus.pageIndex = 1
        button.destroy()
      } catch (e) { }
      console.log(res)
    })
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
  drawPanel(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, screenWidth, 290);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, screenHeight - 80, screenWidth, screenHeight);
  }
  handTouchMove(e) {
  }
  handTouchEnd(e) {
  }
  handTouchStart(e) {
    console.log('________=====')
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        wx.showToast({
          title: '111成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      }
    })
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
  }
}