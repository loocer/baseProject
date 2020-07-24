

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
  init(databus,x, y, id,typeId) {
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
  getFib(point){
    let { x, y } = point 
    let zx = this.x
    let zy = this.y
    if (Math.abs(x - zx) < 2 && Math.abs(y - zy) < 2) {
      this.setFireObj(null)
      return false
    }else{
      let fib = Math.abs((x - zx) / (y - zy))
      return fib
    }
    
  }
  getPosition() {
    let nextPoint = this.setAtex()
    let fib = 1,x, y
    let zx =  nextPoint?common.positions[nextPoint].x:this.moveEnd.x
    let zy =  nextPoint?common.positions[nextPoint].y:this.moveEnd.y
    let endx = this.x, endy = this.y
    fib= this.getFib({x:zx,y:zy})
      x = this.x
      y = this.y
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
    this.x = endx
    this.y = endy
    // if (this.rttf(endx, endy)) {
    //   this.x = endx
    //   this.y = endy
    // }
    // else{
    //   this.delDifense()
    // }
  }
  getThisAtex(x,y){
    let ax = x%100>50?~~(x/100)+1:~~(x/100)
    let ay = y%100>50?~~(y/100)+1:~~(y/100)
    let index = ay*100+ax
    return index
  }
  setAtex(){
    let moveEndAtex = this.getThisAtex(this.moveEnd.x,this.moveEnd.y)
    let thisAtex = this.getThisAtex(this.x,this.y)
    let nextPoint= this.tools.findPathNextPoint(common.graph, thisAtex,moveEndAtex)   
    return nextPoint
    console.log(paths)
  }
  delDifense(){
    let zx =  this.moveEnd.x
    let zy =  this.moveEnd.y
    let endx = this.x, endy = this.y
    let xoy = Math.abs(this.x - this.player.x) - Math.abs(this.y - this.player.y)
    if(xoy>0){
      if (this.rttf(endx, endy+this.speed*5)) {
        this.x = endx
        this.y = endy+this.speed*5
      }else{
        this.x = endx
        this.y = endy-this.speed*5
      }
    }else{
      if (this.rttf(endx+this.speed*5, endy)) {
        this.x = endx+this.speed*5
        this.y = endy
      }else{
        this.x = endx-this.speed*5
        this.y = endy
      }
    }
  }
  fireHot() {
    if (this.fireSpeed % 20 == 0) {
      let bullet = this.databus.pools.getItemByClass('bullet', Bullet)
      bullet.init({
        databus:this.databus,
        x: this.x,
        y: this.y,
        typeId:this.typeId,
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
  }
  queryEnemy(){
    Array.from(this.databus.heros)
      .forEach((item) => {
        if (item.typeId!=this.typeId) {
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
      this.moveEnd = this.player
      this.getPosition()
    }
    if (this.life==0) {
      this.visible = false
    }
    this.frame++
  }
}
module.exports = Enemy