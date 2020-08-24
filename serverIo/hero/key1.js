

const Bullet = require('../bullets/bullet1')
const common = require('../contant')
const Tools = require('../util/tools')

function getRoteImg(pobj, acObj) {
  if (pobj.x1 == pobj.x2) {
    acObj.rotate = 0
  }
  if (pobj.x1 > pobj.x2) {
    let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
    acObj.rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90
  } else if (pobj.x1 < pobj.x2) {
    let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
    acObj.rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270
  }
}
// const ENEMY_WIDTH = 20
// const ENEMY_HEIGHT = 20

class Enemy {
  constructor(WIDTH = 20, HEIGHT = 20) {
    this.tools = new Tools()
    this.isReal = true
    this.width = WIDTH
    this.height = HEIGHT
  }
  init(databus, x, y, id, typeId) {
    this.databus = databus
    this.color = common.colorType[typeId]
    this.typeId = typeId
    this.x = x
    this.y = y
    this.name = 'enemy1'
    this.id = id
    this.teamId = ''
    this.r = 10
    this.allLife = 10
    this.life = 10
    this.visible = true
    this.player = null
    this.fireDistance = 100
    this.fireSpeed = 20
    this.speed = 3
    this.frame = 0
    this.moveEnd = {}
    this.tempPoints = []
  }
  rttf(x, y) {
    for (let en of this.databus.heros) {
      if (en.id != this.id) {
        let rl = Math.sqrt((en.x - x) * (en.x - x) + (en.y - y) * (en.y - y))
        let ro = this.r + en.r
        if (rl < ro) {
          return false
        }
      }
    }
    return true
  }
  getFib(point) {
    let { x, y } = point
    let zx = this.x
    let zy = this.y
    if (Math.abs(x - zx) < 20 && Math.abs(y - zy) < 20) {
      this.setFireObj(null)
      return 1314
    } else {
      let fib = y - zy==0?0:Math.abs((x - zx) / (y - zy))
      return fib
    }

  }
  setPoint(){
    
    if(this.tempPoints.length==0){
      return this.moveEnd
    }else{
      let index = this.tempPoints[0],temp = []
      let en = common.positions[index]
      let rl = Math.sqrt((en.x - this.x) * (en.x - this.x) + (en.y - this.y) * (en.y - this.y))
      if(rl<10){
        if(this.tempPoints.length==1){
          return this.moveEnd
        }else{
          this.tempPoints.shift()
        }
      }
      
      return common.positions[this.tempPoints[0]]
    }
  }
  setMovePoints(){
    let nextPoint = this.getAllPostion()
  }
  getPosition() {
    let nextPoint = this.getAllPostion()
    let point = nextPoint?common.positions[nextPoint]:this.moveEnd
    let fib = 10
    let zx =  point.x
    let zy =  point.y,
    x = this.x,
    y = this.y
    let endx = this.x, endy = this.y

    fib = this.getFib({ x: zx, y: zy })
    if(fib==1314){
      return
    }
    this.moveY = Math.sqrt(1 / (fib * fib + 1));
    this.moveX = this.moveY * fib
    if (x < zx) {
      endx += this.moveX * this.speed
    } else {
      endx -= this.moveX * this.speed
    }
    if (y < zy) {
      endy += this.moveY * this.speed
    } else {
      endy -= this.moveY * this.speed
    }
    if (this.rttf(endx, endy)) {
      this.x = endx
      this.y = endy
    } else {
      // this.tempPoints.push(nextPoint)
      // this.getPosition()
    }
    console.log(this.x,this.y)
    // if (this.rttf(endx, endy)) {
    //   this.x = endx
    //   this.y = endy
    // }
    // else{
    //   this.delDifense()
    // }
  }
  getThisAtex(x, y) {
    let ax = x % 100 > 50 ? ~~(x / 100) + 1 : ~~(x / 100)
    let ay = y % 100 > 50 ? ~~(y / 100) + 1 : ~~(y / 100)
    let index = ay * 100 + ax
    return index
  }
  getResetAllPostion(){
    let moveEndAtex = this.getThisAtex(this.moveEnd.x, this.moveEnd.y)
    let thisAtex = this.getThisAtex(this.x, this.y)
    this.tools.initializeColor(common.graph)
    let {positions} = common
    for(let i in positions){
      let {x,y} = positions[i]
      for(let ke of this.databus.heros){
        let l = Math.sqrt((ke.x - x) * (ke.x - x) + (ke.y - y) * (ke.y - y))
        if(l<ke.r*2){
          this.tools.color[i] = 1
        }
      }
    }
    let paths = this.tools.findPathNextPoint(common.graph, thisAtex, moveEndAtex)
    console.log(paths)
  }
  getAllPostion(){
    let moveEndAtex = this.getThisAtex(this.moveEnd.x, this.moveEnd.y)
    let thisAtex = this.getThisAtex(this.x, this.y)
    this.tools.initializeColor(common.graph)
    let {positions} = common
    // for(let i in positions){
    //   let {x,y} = positions[i]
    //   for(let ke of this.databus.heros){
    //     let l = Math.sqrt((ke.x - x) * (ke.x - x) + (ke.y - y) * (ke.y - y))
    //     if(l<ke.r*2){
    //       this.tools.color[i] = 1
    //     }
    //   }
    // }
    // for(let tm of this.tempPoints){
    //   this.tools.color[tm] = 1
    // }
    let points = this.tools.findPathNextPoint(common.graph, thisAtex, moveEndAtex)
    return points
  }
  setAtex() {
  }
  
  fireHot() {
    if (this.fireSpeed % 20 == 0) {
      let bullet = this.databus.pools.getItemByClass('bullet', Bullet)
      bullet.init({
        databus: this.databus,
        x: this.x,
        y: this.y,
        typeId: this.typeId,
        endx: this.player.x,
        endy: this.player.y
      })
      this.databus.bullets.add(bullet)
    }
    this.fireSpeed++

  }
  getDistance() {
    let distance = Math.sqrt((this.x - this.player.x) * (this.x - this.player.x) + (this.y - this.player.y) * (this.y - this.player.y))
    if (distance < this.fireDistance) {
      this.fireHot()
    } else {
      this.getPosition()
    }
  }
  setFireObj(obj) {
    this.player = obj
    this.moveEnd = obj
    this.tempPoints = []
  }
  queryEnemy() {
    Array.from(this.databus.heros)
      .forEach((item) => {
        if (item.typeId != this.typeId) {
          let distance = Math.sqrt((this.x - item.x) * (this.x - item.x) + (this.y - item.y) * (this.y - item.y))
          if (distance < this.fireDistance) {
            this.setFireObj(item)
            return
          }
        }
      })
  }
  // moveSelf({x,y}) {

  //   let r = Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y))
  //   console.log('-----',this.frame % 360)
  //   let tis = this.frame

  //   this.x = x + r * Math.cos((tis % 360)*Math.PI/180)
  //   this.y = y + r * Math.sin((tis % 360)*Math.PI/180)
  //   console.log(Math.acos((this.x - x)/r)*180/Math.PI)
  // }

  update() {

    if (!this.visible)
      return
    if (this.player && !this.player.visible) {
      this.setFireObj(null)
    }
    if (this.player && this.player.isReal) {
      this.moveEnd = this.player
      this.getDistance()
    }
    if (this.player && !this.player.isReal) {
      this.getPosition()
    }
    if (this.life == 0) {
      this.visible = false
    }
    this.frame++
  }
}
module.exports = Enemy