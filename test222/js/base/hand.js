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
    this.event()
  }

  drawToCanvas(ctx) {

    ctx.save()
    ctx.translate(0, -databus.trans.y)
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y + 70, this.r, 0, 2 * Math.PI);
    ctx.fill();
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
      if (py < screenHeight /2) {
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
        databus.transed.y = databus.trans.y
        databus.trans.y = databus.trans.y - 2
        databus.ctx.translate(0,-databus.transed.y)
        databus.ctx.translate(0, databus.trans.y)
      }

    }
   

  }
  event() {
    databus.touchStartHandler = (e) => {
      for (let p of e.touches) {
        let x = p.clientX
        let y = p.clientY
        if (temp.toTop(x, y)) {
          temp.topDoingFlag = true
        }
        if (temp.toUp(x, y)) {
          temp.upDoingFlag = true
        }
      }
    }
    wx.onTouchStart(databus.touchStartHandler)
    databus.touchCancelHandler = (e) => {
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
    wx.onTouchEnd(databus.touchCancelHandler)
  }
  toTop(x, y) {
    return !!(x >= (this.x - this.r / 2) &&
      y >= (this.y - this.r / 2) &&
      x <= (this.x + this.r / 2) &&
      y <= (this.y + this.r / 2))
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


// import DataBus from '../../main/databus'
// import * as common from '../../utils/common'
// import * as tools from '../../utils/tools'
// // import Player from '../../player/index'
// const databus = new DataBus()
// // let player = new Player()
// let that = null
// const leftHandCheck = (x, y) => {
//   let lx = 100
//   let ly = common.screenHeight - common.HAND_WIDTH - 40
//   let thisx = databus.leftPositions.x 
//   let thisy = databus.leftPositions.y 
//   const deviation = 0
//   return !!(x >= thisx - deviation &&
//     y >= thisy - deviation &&
//     x <= thisx + common.HAND_WIDTH + deviation &&
//     y <= thisy + common.HAND_HEIGHT + deviation)
// }
// const rightHandCheck = (x, y) => {
//   let rx = common.screenWidth - common.HAND_WIDTH - 40
//   let ry = common.screenHeight - common.HAND_HEIGHT - 40
//   let thisx = rx
//   let thisy = ry
//   const deviation = 0
//   return !!(x >= thisx - deviation &&
//     y >= thisy - deviation &&
//     x <= thisx + common.HAND_WIDTH + deviation &&
//     y <= thisy + common.HAND_HEIGHT + deviation)
// }

// const leftFormatMovePosition = (x, y) => {
//   let pobj = {}
//   pobj.x1 = x //点击
//   pobj.x2 = 100 + 60
//   pobj.y1 = y
//   pobj.y2 = common.screenHeight - common.HAND_WIDTH + 20
//   tools.getRoteImg(pobj, databus.leftPositions)
//   let r = databus.playerSpeed / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
//   databus.moveX = (pobj.x1 - pobj.x2) * r
//   databus.moveY = (pobj.y1 - pobj.y2) * r

// }

// const rightFormatMovePosition = (x, y) => {
//   let rx = common.screenWidth - common.HAND_WIDTH - 40
//   let ry = common.screenHeight - common.HAND_HEIGHT - 40
//   let centerX = ~~(rx + common.HAND_WIDTH / 2)
//   let centerY = ~~(ry + common.HAND_HEIGHT / 2)
//   let pobj = {}
//   pobj.x2 = 0
//   pobj.x1 = x - centerX
//   pobj.y2 = 0
//   pobj.y1 = y - centerY
//   tools.getRoteImg(pobj, databus.rightPositions)
//   let r = databus.playerSpeed / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
//   databus.shootX = (pobj.x1 - pobj.x2) * r
//   databus.shootY = (pobj.y1 - pobj.y2) * r
// }
// export const handEvent = () => {
//   databus.touchHandler = (e) => {
//     for (let p of e.touches) {
//       let x = p.clientX
//       let y = p.clientY
//       //
//       if (leftHandCheck(x, y)) {

//         databus.leftPositions.touchedx = x
//         databus.leftPositions.touchedy = y
//         databus.leftPositions.touched = true
//       }
//       if (rightHandCheck(x, y)) {
//         databus.rightPositions.touchedx = x
//         databus.rightPositions.touchedy = y
//         databus.rightPositions.touched = true
//       }
//     }
//   }
//   wx.onTouchStart(databus.touchHandler)
//   // canvas.addEventListener('touchmove', ().bind(this))
//   databus.moveHandler = (e) => {
//     // e.preventDefault()
//     for (let p of e.touches) {
//       let x = p.clientX
//       let y = p.clientY
//       let lleft = (x - databus.leftPositions.touchedx) * (x - databus.leftPositions.touchedx) + (y - databus.leftPositions.touchedy) * (y - databus.leftPositions.touchedy)
//       let lright = (x - databus.rightPositions.touchedx) * (x - databus.rightPositions.touchedx) + (y - databus.rightPositions.touchedy) * (y - databus.rightPositions.touchedy)
//       console.log(lleft < lright)
//       if (lleft < lright) {
//         if (databus.leftPositions.touched) {
//           console.log('点击了')
//           leftFormatMovePosition(x, y)
//         }

//         let l = Math.pow(160 - x, 2) + Math.pow(common.screenHeight - common.HAND_WIDTH + 20 - y, 2)
//         if (l < 3600) {
//           // this.isInsite = true
//         } else {
//           // this.isInsite = false
//         }
//       } else {
//         if (databus.rightPositions.touched) {
//           rightFormatMovePosition(x, y)
//         }
//       }
//     }
//   }
//   wx.onTouchMove(databus.moveHandler)
//   canvas.addEventListener('touchend', ((e) => {
//     for (let obj of e.changedTouches) {
//       let x = obj.clientX
//       let y = obj.clientY
//       let lleft = (x - databus.leftPositions.touchedx) * (x - databus.leftPositions.touchedx) + (y - databus.leftPositions.touchedy) * (y - databus.leftPositions.touchedy)
//       let lright = (x - databus.rightPositions.touchedx) * (x - databus.rightPositions.touchedx) + (y - databus.rightPositions.touchedy) * (y - databus.rightPositions.touchedy)
//       if (lleft < lright) {
//         databus.leftPositions.touched = false
//         databus.isTransX = false
//         databus.isTransY = false
//         databus.moveX = 0
//         databus.moveY = 0
//       } else {
//         databus.rightPositions.touched = false
//       }
//     }
//   }).bind(this))
// }