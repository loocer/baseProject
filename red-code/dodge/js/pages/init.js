import '../libs/weapp-adapter'
import '../libs/symbol'
import DataBus from '../databus'
import Gan from '../base/gan'
import Ball from '../base/ball'
import Hand from '../base/hand'
import Loos from '../base/loos'
import {
  GAME_IMG
} from '../utils/common'
const databus = new DataBus()

let instance,IMG,ip
let adtress = "http://192.168.2.100:3000" 
export default class init {
  constructor() {
    if (instance)
      return instance

    instance = this
    IMG = GAME_IMG.get('bg')
  }
  creacteRoom() {
    let obj = {
      roomNo: 111111,
      peopleNum: 3
    }
    wx.request({
      url: adtress + "/create-room",
      data: obj,
      header: {
        'content-type': 'application/json', // 默认值
        'authorization':wx.getStorageSync('token'),
        'user_id':wx.getStorageSync('userInfo').id
      },
      success(res) {
        
        console.log(res)
       
        databus.pageIndex = 1
      }
    })
  }
  login(userInfo) {
    wx.request({
      url: adtress + "/login",
      data: userInfo,
      method:'post',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: (res) => {
        wx.setStorageSync('userInfo', res.data.data)
        wx.setStorageSync('token', res.data.data.token)
        this.creacteRoom()
      }
    })
  }
  init() {
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
        wx.request({
          url: adtress+'/get-socketAddress',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            console.log(res)
            button.destroy()
            wx.setStorageSync('socketIp', res.data.data)
            ip = res.data.data
            let userInfo = wx.getStorageSync('userInfo')
            let id = wx.getStorageSync('signature')
            userInfo.id = id
            this.login(userInfo)
          }
        })
      } catch (e) {}
      console.log(res)
    })
  }
  reset(ctx) {

  }
  update() {

  }
  
  handTouchMove(e) {}
  handTouchEnd(e) {}
  handTouchStart(e) {
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
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 555, 290);
  }
}