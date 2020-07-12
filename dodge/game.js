import './js/libs/weapp-adapter'
import './js/libs/symbol'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
import Main from './js/main'
import {
  loadingImage
} from './js/utils/common'

import DataBus from './js/databus'


const databus = new DataBus()
const main = new Main()
let ctx = canvas.getContext('2d')
let sysInfo = wx.getSystemInfoSync(),
  width = sysInfo.windowWidth,
  height = sysInfo.windowHeight;

canvas.style.width = width + "px";
canvas.style.height = height + "px";
canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
let flag = false
wx.getSystemInfo({
  success(res) {
    if (res.platform == 'ios') {
      flag = true
    }
  }
})

loadingImage()
main.init()