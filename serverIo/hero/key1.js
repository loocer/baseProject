
const DataBus = require('../databus')
const Bullet = require('../bullets/bullet1')
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

let databus = new DataBus()
class Enemy {
  constructor(WIDTH = 30, HEIGHT = 30) {
    this.isReal = true
    this.width = WIDTH
    this.height = HEIGHT
  }
  init(x, y, id) {
    this.x = x
    this.y = y
    this.name = 'enemy1'
    this.id = id
    this.r = 10
    this.visible = true
    this.player = null
    this.fireDistance = 100
    this.fireSpeed = 20
    this.speed = 1
    this.frame = 0
  }
  rttf(x, y) {
    for (let en of databus.heros) {
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
  // getSelfAlef({x,y}){
  //   let r = Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y))
  //   console.log(Math.acos((this.x - x)/r)*180/Math.PI)

  //   if( this.y>y){
  //     this.frame =360 - ( Math.acos((this.x - x)/r)*180/Math.PI+1)
  //   }else{
  //     this.frame = Math.acos((this.x - x)/r)*180/Math.PI+1
  //   }
  //   this.moveSelf({x,y})
  //   // console.log(rs,os* 180 / Math.PI,ow* 180 / Math.PI,'-----------',mt* 180 / Math.PI)
  // }
  getPosition() {
    let endx = this.x, endy = this.y
    let { x, y } = this.player
    let zx = this.x
    let zy = this.y
    if (Math.abs(x - zx) < 2 && Math.abs(y - zy) < 2) {
      this.setFireObj(null)
      return
    }
    let fib = Math.abs((x - zx) / (y - zy))
    this.moveY = Math.sqrt(1 / (fib * fib + 1));
    this.moveX = this.moveY * fib
    if (x > zx) {
      endx += this.moveX * this.speed
    } else {
      endx -= this.moveX * this.speed
    }
    if (y > zy) {
      endy += this.moveY * this.speed
    } else {
      endy -= this.moveY * this.speed
    }
    if (this.rttf(endx, endy)) {
      this.x = endx
      this.y = endy
    }
    // this.y += this.moveY * this.speed
    // this.x += this.moveX * this.speed
  }
  fireHot() {
    if (this.fireSpeed % 20 == 0) {
      let bullet = databus.pools.getItemByClass('bullet', Bullet)
      bullet.init({
        x: this.x,
        y: this.y,
        endx: this.player.x,
        endy: this.player.y
      })
      databus.bullets.add(bullet)
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
      this.getDistance()
    }
    if (this.player && !this.player.isReal) {
      this.getPosition()
    }
    // if (!this.player) {
    //   this.moveSelf({x:100,y:300,r:30})
    // }
    this.frame++
  }
}
module.exports = Enemy