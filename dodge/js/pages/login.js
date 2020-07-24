import '../libs/weapp-adapter'
import '../libs/symbol'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
import DataBus from '../databus'
import draw from '../bullet/draw'
import io from '../libs/ls';
import datas from '../physics/data'
import MiniMap from '../physics/miniMap'
import HomePanel from '../physics/homePanel'
import ToolTab from '../physics/toolTab'
import Scoll from '../physics/scoll'

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
    this.whatPanel = 0 //1:tools,2:map,4 is scool,5 is panel
    this.chioseList = []
    this.code = null
    this.heros = []
    this.enemys = []
    this.startY = 0
    this.comeMas = {
      name: 'test'
    }
    this.tachStatus = 0 //1 is chiose 2 is end chiose 3 is go,0 is init,
    this.tachPoint = {}
    this.miniMap = new MiniMap()
    this.homePanel = new HomePanel()
    this.toolTab = new ToolTab()
    this.scoll = new Scoll()
  }
  init() {
    let userInfo = wx.getStorageSync('userInfo')
    let ip = wx.getStorageSync('socketIp')
    socket = io(ip);
    socket.on('main_update', (s) => {
      databus.bullets = s.bullets
      databus.house = s.house
      databus.player = new Map(s.players).get(userInfo.id)
      databus.hero = this.commonData(s.heros)
      this.setPanlTools(databus.player.panels)
      this.getThisHero(s.heros)
    });
    socket.on('event', function (data) { });
    socket.on('disconnect', function () { });
    this.initPosition(0, 0)
  }
  setPanlTools(panel) {
    let index = 0
    for (let key of datas.keys()) {
      datas.set(key, panel[index])
      index++
    }
    this.homePanel.changeTab(this.homePanel.key)
  }
  initPosition(x, y) {
    if(x<-160){
      return
    }
    if(y<0||y>databus.groundHeight){
      return
    }
    databus.trans.x = x
    databus.trans.y = y
    databus.ctx.translate(databus.transed.x, databus.transed.y)
    databus.ctx.translate(-databus.trans.x, -databus.trans.y)
    databus.transed = {
      x: databus.trans.x,
      y: databus.trans.y,
    }
  }
  getThisHero(hers) {
    let list = []
    let enemys = []
    hers.forEach((item) => {
      if (item.visible) {
        if (item.typeId == this.typeId) {
          list.push(item)
        } else {
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
    if (instance.whatPanel == 5) {
      if (instance.homePanel.chiosePnael.obj[1].exObj.status == 4) {
        let { chiosePnael } = instance.homePanel
        instance.homePanel.movePanel = instance.homePanel.clickNo
        if (instance.homePanel.checkMovePanelState(touch.clientX, touch.clientY)) {
          instance.chiosePnaelObj = { x: touch.clientX-instance.homePanel.movePoint.x, y: touch.clientY-instance.homePanel.movePoint.y, flag: true }
        } else {
          instance.chiosePnaelObj = { x: touch.clientX-instance.homePanel.movePoint.x, y: touch.clientY-instance.homePanel.movePoint.y, flag: false }
        }
      }
      return
    }
    if (instance.whatPanel == 2) {
      if (instance.miniMap.inClose(touch.clientX, touch.clientY)) {
        let p = instance.miniMap.getMovePosition(touch.clientX, touch.clientY)
        instance.initPosition(p.x, p.y)
        return
      }
    }

    if (instance.whatPanel == 1) {
      let {
        movePoint
      } = instance.tachPoint
      // let movex = movePoint.clientY - touch.clientY
      // instance.homePanel.scoolly-=movex
      instance.tachPoint.movePoint = touch
      return
    }
    if (instance.whatPanel == 4) {
      let {
        movePoint
      } = instance.tachPoint
      let movex = movePoint.clientY - touch.clientY
      if (instance.scoll.scoolly - movex < 10 || instance.scoll.scoolly - movex + instance.scoll.toolHeight > instance.scoll.height - 10) {
        return
      } else {
        instance.scoll.scoolly -= movex
        instance.homePanel.scoolly += movex
        instance.tachPoint.movePoint = touch
      }

      return
    }
    if (instance.whatPanel == 3) {
      return
    }
    if (e.touches.length == 2) {
      let {
        movePoint
      } = instance.tachPoint
      let mp = touch
      databus.trans.x += (movePoint.clientX - mp.clientX)
      databus.trans.y += (movePoint.clientY - mp.clientY)
      databus.ctx.translate(databus.transed.x, databus.transed.y)
      databus.ctx.translate(-databus.trans.x, -databus.trans.y)
      databus.transed = {
        x: databus.trans.x,
        y: databus.trans.y,
      }
      instance.tachPoint.movePoint = mp
    }

    if (instance.tachStatus == 1) {
      instance.tachPoint.movePoint = touch
    }
  }
  handTouchEnd(e) {
    let touch = e.changedTouches[0]
    if (instance.whatPanel == 5) {
      instance.homePanel.movePanel = null
      let {
        startPoint
      } = instance.tachPoint
      let xmin = Math.abs(touch.clientX - startPoint.clientX)
      let ymin = Math.abs(touch.clientY - startPoint.clientY)
      if (xmin < 5 && ymin < 5) {
        instance.tachStatus = 0
        instance.tachPoint = null
        let obj = {}
        obj.userId = wx.getStorageSync('signature')
        console.log(instance.homePanel.chiosePnael)
        obj.code = instance.homePanel.code
        socket.emit('111111', {
          ...obj,
          evType: 'CHENGE_CREATE'
        })
      } else {
        if (instance.homePanel.movePanelState) {

        }
      }
      instance.chiosePnaelObj = null
      instance.whatPanel = 0
      instance.homePanel.movePanel = null
      return
    }
    if (instance.whatPanel == 1) {
      instance.homePanel.scoollReset()
      instance.whatPanel = 0
      return
    }
    if (instance.whatPanel == 2) {
      if (instance.miniMap.inClose(touch.clientX, touch.clientY)) {
        let p = instance.miniMap.getMovePosition(touch.clientX, touch.clientY)
        instance.initPosition(p.x, p.y)
        instance.whatPanel = 0
        return
      }
    }
    if (instance.whatPanel == 3) {
      instance.whatPanel = 0
      return
    }
    if (instance.whatPanel == 4) {
      instance.whatPanel = 0
      return
    }
    if (e.changedTouches.length > 1) {
      instance.tachStatus = 0
      return
    }
    if (instance.miniMap.inClose(touch.clientX, touch.clientY)) {
      let p = instance.miniMap.getMovePosition(touch.clientX, touch.clientY)
      instance.initPosition(p.x, p.y)
    }
    if (!instance.tachPoint) {
      instance.tachStatus = 0
      return
    }
    instance.tachStatus = 2
    let {
      startPoint
    } = instance.tachPoint
    let xmin = Math.abs(touch.clientX - startPoint.clientX)
    let ymin = Math.abs(touch.clientY - startPoint.clientY)
    if (xmin < 5 && ymin < 5) {
      if (instance.chioseList.length == 0) {
        instance.tachStatus = 0
        return
      }
      let eny = instance.isChioseMaster(touch.clientX, touch.clientY)
      instance.tachStatus = 0
      instance.tachPoint = null
      let obj = {}
      if (eny) {
        obj = eny
        obj.isReal = true
      } else {
        obj.x = touch.clientX + databus.trans.x
        obj.y = touch.clientY + databus.trans.y
        obj.width = 30
        obj.height = 30
        obj.isReal = false
        obj.visible = true
      }

      socket.emit('111111', {
        Point: obj,
        herosIds: instance.chioseList,
        evType: 'MOVE'
      })
      // instance.chioseList = []
    } else {
      let herosIds = []
      instance.heros.forEach((item) => {
        if (item.visible) {
          let flag = instance.isChioseHer(item)
          if (flag) {
            herosIds.push(item.id)
          }
        }
      })
      instance.tachStatus = 2
      instance.chioseList = herosIds
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
    let qs = {
      clientX: startPoint.clientX + databus.trans.x,
      clientY: startPoint.clientY + databus.trans.y
    }
    let qm = {
      clientX: movePoint.clientX + databus.trans.x,
      clientY: movePoint.clientY + databus.trans.y
    }
    let isLChiose = false
    if (qs.clientX < qm.clientX) {
      if (item.x > qs.clientX && item.x < qm.clientX) {
        isLChiose = true
      } else {
        return false
      }
    } else {
      if (item.x > qm.clientX && item.x < qs.clientX) {
        isLChiose = true
      } else {
        return false
      }
    }
    if (qs.clientY < qm.clientY) {
      if (item.y > qs.clientY && item.y < qm.clientY) {
        isLChiose = true
      } else {
        return false
      }
    } else {
      if (item.y > qm.clientY && item.y < qs.clientY) {
        isLChiose = true
      } else {
        return false
      }
    }
    return isLChiose
  }
  isChioseMaster(x, y) {
    for (let obj of instance.enemys) {
      if (x > obj.x - obj.r && x < obj.x + obj.r && y > obj.y - obj.r && y < obj.y + obj.r) {
        return obj
      }
    }
    return false
  }
  handTouchStart(e) {
    let touch = e.touches[0]
    if (instance.homePanel.inClose(touch.clientX, touch.clientY)) {
      instance.whatPanel = 5
      instance.tachPoint = {
        startPoint: touch,
        movePoint: touch
      }
      return
    }
    if (instance.miniMap.inClose(touch.clientX, touch.clientY)) {
      let p = instance.miniMap.getMovePosition(touch.clientX, touch.clientY)
      instance.initPosition(p.x, p.y)
      instance.whatPanel = 2
      return
    }
    if (instance.homePanel.inClose(touch.clientX, touch.clientY)) {
      instance.whatPanel = 1
      instance.homePanel.getActionNo(touch.clientX, touch.clientY)
      instance.tachPoint = {
        movePoint: touch
      }
      return
    }
    if (instance.scoll.inClose(touch.clientX, touch.clientY)) {
      instance.whatPanel = 4
      instance.tachPoint = {
        movePoint: touch
      }
      return
    }
    if (instance.toolTab.inClose(touch.clientX, touch.clientY)) {
      instance.whatPanel = 3
      instance.toolTab.chagePanel(touch.clientX, touch.clientY)
      instance.tachPoint = {
        movePoint: touch
      }
      return
    }
    if (e.touches.length == 2) {
      instance.tachPoint = {
        movePoint: touch
      }
      instance.tachStatus = 0
      return
    }
    if (instance.tachStatus == 0) {
      instance.tachPoint = {
        startPoint: touch,
        movePoint: touch
      }
      instance.tachStatus = 1
    }
    if (instance.tachStatus == 2) {
      instance.tachPoint = {
        startPoint: touch,
        movePoint: touch
      }
      instance.tachStatus = 1

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
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.strokeRect(startPoint.clientX, startPoint.clientY, movePoint.clientX - startPoint.clientX, movePoint.clientY - startPoint.clientY);
        ctx.stroke();
      }
    }
  }
  renderChiosePnael(ctx) {
    if(!instance.chiosePnaelObj){
      return
    }
    let { x, y,flag } = instance.chiosePnaelObj
    ctx.save()
    ctx.beginPath();
    ctx.translate(x, y)
    if(flag){
      ctx.fillStyle = 'green';
    }else{
      ctx.fillStyle = 'red';
    }
    ctx.fillRect(0, 0, this.homePanel.toolWidth, this.homePanel.toolHeight);
    ctx.fill();
    ctx.restore()
  }
  render(ctx) {


    // 重置渲染上下文并清空画布



    ctx.clearRect(0, 0, databus.groundWidth * 1.5, databus.groundHeight * 1.5);



    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, databus.groundWidth * 1.5, databus.groundHeight * 1.5);
    ctx.fill()
    // ctx.fillStyle = "green"
    // ctx.font = "20px Arial"
    // ctx.fillText(
    //   this.comeMas.name,
    //   20,
    //   screenHeight/2
    // )
    databus.hero.forEach((item) => {
      if (item.visible) {
        draw.drawHero(ctx, item, this)
        // item.drawToCanvas(ctx)
      }
    })
    databus.house.forEach((item) => {
      if (item.visible) {
        draw.drawHouse(ctx, item, this)
        // item.drawToCanvas(ctx)
      }
    })
    databus.bullets.forEach((item) => {
      if (item.visible) {
        draw.drawBullet1(ctx, item)
        // item.drawToCanvas(ctx)
      }
    })
    ctx.save()
    ctx.translate(databus.trans.x, databus.trans.y)
    this.drawChiose(ctx)
    this.homePanel.render(ctx)
    this.miniMap.render(ctx)
    this.toolTab.render(ctx)
    this.renderChiosePnael(ctx)
    ctx.restore()
   
  }
}