const  DataBus = require('../databus')
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
  init({x, y,endx,endy}) {
    this.name = 'bullet1'
    this.endx = endx
    this.endy =endy
    this.zx = x
    this.zy = y
    this.x = x
    this.y = y
    this.width = BULLET_WIDTH
    this.height = BULLET_HEIGHT
    this.showLength = 0
    this.stopFlag = false
    this.stopFlagTemp = false
    this.speed = 2
    this.points = []
    this.visible = true
    this.getMovexy()
  }
  getMovexy(){
    let {zx,zy} = this
    let x=this.endx,y=this.endy
    let fib = Math.abs((x-zx)/(y-zy))
    this.moveY = Math.sqrt(1/(fib*fib+1));
    this.moveX = this.moveY*fib
  }
  update() {
    if (!this.visible)
      return
    if (true) {
      getRoteImg({
          x1: this.x + this.moveX,
          x2: this.x,
          y1: this.y + this.moveY,
          y2: this.y,
        },
        this
      )
      if (this.endx > this.x) {
        this.x += this.moveX * this.speed
      } else {
        this.x -= this.moveX * this.speed
      }
      if (this.endy > this.y) {
        this.y += this.moveY * this.speed
      } else {
        this.y -= this.moveY * this.speed
      }
    }
    if (this.y < 0 ||
      this.y > groundHeight ||
      this.x < 0 ||
      this.x > groundWidth
    ) {
      this.stopFlagTemp = true
    }
    let l =Math.sqrt((this.x - this.zx) * (this.x - this.zx) + (this.y - this.zy) * (this.y - this.zy))
    let k =Math.sqrt((this.endx - this.zx) * (this.endx - this.zx) + (this.endy - this.zy) * (this.endy - this.zy))
    if (l>k) {
      this.visible = false
      databus.pools.recover(this.name, this)
    }
    // databus.removeBullets(this)

    // delete this
  }
}
module.exports = Bullet