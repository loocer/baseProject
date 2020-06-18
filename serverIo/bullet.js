


const  DataBus = require('./databus')
const groundHeight = 10000
const groundWidth = 10000
const BULLET_WIDTH = 1
const BULLET_HEIGHT = 100

let databus = new DataBus()
function getRoteImg(pobj, acObj) {
  if (pobj.x1 == pobj.x2){
    acObj.rotate=0
  }
  if (pobj.x1 > pobj.x2) {
    let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
    acObj.rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90
  } else if (pobj.x1 < pobj.x2) {
    let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
    acObj.rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270
  }
}
class Bullet{
  constructor() {
  }
  init(x, y) {
    this.name = 'bullet1'
    this.zx = x
    this.zy = y
    this.x = x
    this.y = y
    this.width = BULLET_WIDTH
    this.height = BULLET_HEIGHT
    this.showLength = 0
    this.stopFlag = false
    this.stopFlagTemp = false
    this.speed = 20
    this.points = []
    this.visible = true
    this.getMovexy()
  }
  getMovexy(){
    let {zx,zy} = this
    let x=200,y=300
    let fib = (x-zx)/(y-zy)
    this.moveY = Math.sqrt(1/(fib*fib+1));
    this.moveX = this.moveY*fib
  }
  update() {
    if (!this.visible)
      return
    if (this.stopFlagTemp) {
      this.showLength += 4
    } else {
      getRoteImg({
          x1: this.x + this.moveX,
          x2: this.x,
          y1: this.y + this.moveY,
          y2: this.y,
        },
        this
      )
      this.y += this.moveY * this.speed
      this.x += this.moveX * this.speed
    }
    if (this.y < 0 ||
      this.y > groundHeight ||
      this.x < 0 ||
      this.x > groundWidth
    ) {
      this.stopFlagTemp = true
    }
    if (this.showLength == 100) {
      this.visible = false
      databus.pools.recover(this.name, this)
    }
    // databus.removeBullets(this)

    // delete this
  }
}
module.exports = Bullet