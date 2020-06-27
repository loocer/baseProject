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
    this.typeId = databus.typeId
    this.allPasition = []
    this.moveY = 0
    this.chioseList = []
    this.code = null
    this.heros = []
    this.enemys = []
    this.startY = 0
    this.comeMas = {
      name: 'test'
    }
    this.tachStatus = 0 //1 is chiose 2 is end chiose 3 is go,0 is init
    this.tachPoint = {}
  }
  init() {
    socket = io('http://192.168.2.103:3000');
    socket.on('chat message', (s) => {
      console.log(44444444444444)
      databus.bullets = s.bullets
      databus.hero = this.commonData(s.heros)
      this.getThisHero(s.heros)
    });
    socket.on('event', function (data) {});
    socket.on('disconnect', function () {});
  }
  getThisHero(hers) {
    let list = []
    let enemys = []
    hers.forEach((item) => {
      if (item.visible) {
        if (item.typeId == this.typeId) {
          list.push(item)
        }else{
          enemys.push(item)
        }
        // item.drawToCanvas(ctx)
      }
    })
    this.heros = list
    this.enemys = enemys
  }

  commonData(list) {
    list.forEach((item) => {
      for (let id of this.chioseList) {
        if (item.id == id) {
          item.ioChiose = true
        }
      }
    })
    return list
  }
  iSClickHer(x, y) {
    for (let obj of this.heros) {
      if (x > obj.x && x < obj.x + obj.r * 2 && y > obj.y && y < obj.y + obj.r * 2) {
        return obj
      }
    }
    return false
  }
  reset(ctx) {

  }
  update() {

  }
  queryNo() {
    let x = 400
    let y = 500

  }
  handTouchMove(e) {
    let touch = e.touches[0]
    if (instance.tachStatus == 1) {
      instance.tachPoint.movePoint = touch
    }
  }
  handTouchEnd(e) {
    if (!instance.tachPoint) {
      instance.tachStatus = 0
      return
    }
    let touch = e.changedTouches[0]
    let {
      startPoint
    } = instance.tachPoint
    let xmin = Math.abs(touch.clientX - startPoint.clientX )
    let ymin = Math.abs(touch.clientY - startPoint.clientY )
    if(xmin<5 && ymin<5){
      let item = instance.iSClickHer(touch.clientX,touch.clientY)
      if(item){
        instance.chioseList = [item]
        instance.tachStatus = 2
        return
      }
    }else{
      
  
      let herosIds = []
      instance.heros.forEach((item) => {
        if (item.visible) {
          let flag = instance.isChioseHer(item)
          if (flag) {
            herosIds.push(item.id)
          }
        }
      })
      instance.chioseList = herosIds
      instance.tachStatus = 2
      console.log(herosIds)
    }
  }
  connectNet() {
    socket.emit('chat message', {
      name: 'fuck you tom,wo shi ted:' + instance.code
    })
  }
  chioseBug(x, y) {
    let chiose = []
    for (let h of databus.hero) {
      let r = Math.sqrt((h.x - x) * (h.x - x) + (h.y - y) * (h.y - y))
      if (r < h.r) {
        chiose.push(h)
      }
    }
  }
  isChioseHer(item) {
    let {
      startPoint,
      movePoint
    } = this.tachPoint
    let isLChiose = false
    if (startPoint.clientX < movePoint.clientX) {
      if (item.x > startPoint.clientX && item.x < movePoint.clientX) {
        isLChiose = true
      } else {
        return false
      }
    } else {
      if (item.x > movePoint.clientX && item.x < startPoint.clientX) {
        isLChiose = true
      } else {
        return false
      }
    }
    if (startPoint.clientY < movePoint.clientY) {
      if (item.y > startPoint.clientY && item.y < movePoint.clientY) {
        isLChiose = true
      } else {
        return false
      }
    } else {
      if (item.y > movePoint.clientY && item.y < startPoint.clientY) {
        isLChiose = true
      } else {
        return false
      }
    }
    return isLChiose
  }
  isChioseMaster(x,y){
    for (let obj of instance.enemys) {
      if (x > obj.x- obj.r&& x < obj.x + obj.r  && y > obj.y-obj.r && y < obj.y + obj.r ) {
        return obj
      }
    }
    return false
  }
  handTouchStart(e) {

    let touch = e.touches[0]
 
    if (instance.tachStatus == 0) {
      instance.tachPoint = {
        startPoint: touch,
        movePoint: touch
      }
      instance.tachStatus = 1
    }
    if (instance.tachStatus == 2) {
      let eny = instance.isChioseMaster(touch.clientX, touch.clientY)
      instance.tachStatus = 0
      instance.tachPoint = null
      let obj = {}
      if(eny){
        obj = eny
        obj.isReal = true
      }else{
        obj.x = touch.clientX
        obj.y = touch.clientY
        obj.width = 30
        obj.height = 30
        obj.isReal = false
        obj.visible = true
      }

      socket.emit('rosot', {
        Point: obj,
        herosIds: instance.chioseList,
        evType: 'MOVE'
      })
      instance.chioseList = []
    }





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
  drawChiose(ctx) {
    if (this.tachStatus == 1) {
      let {
        startPoint,
        movePoint
      } = this.tachPoint
      if (this.tachPoint) {
        ctx.strokeRect(startPoint.clientX, startPoint.clientY, movePoint.clientX - startPoint.clientX, movePoint.clientY - startPoint.clientY);
        ctx.strokeStyle = "green";
        ctx.stroke();
      }
    }
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
        draw.drawHero(ctx, item,this)
        // item.drawToCanvas(ctx)
      }
    })
    databus.bullets.forEach((item) => {
      if (item.visible) {
        draw.drawBullet1(ctx, item)
        // item.drawToCanvas(ctx)
      }
    })
    this.drawChiose(ctx)
  }
}