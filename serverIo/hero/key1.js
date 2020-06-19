
const DataBus = require('../databus')
const  Bullet = require('../bullet')
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
// const ENEMY_WIDTH = 20
// const ENEMY_HEIGHT = 20

let databus = new DataBus()
class Enemy{
  constructor(WIDTH =30, HEIGHT = 30) {
    this.width = WIDTH
    this.height = HEIGHT
  }
  init(x, y) {
    this.x = x
    this.y = y
    this.name= 'enemy1'
    this.player = null
    this.fireDistance = 200
    this.fireSpeed = 20
  }

  getPosition() {
    let player = this.player
    let px = player.x + player.width / 2
    let py = player.y + player.height / 2
    let lpx = Math.abs(this.x - player.x)
    let lpy = Math.abs(this.y - player.y)
    let tempx = 0
    let tempy = 0
    if (lpx > lpy) {
      tempx = player.x > this.x ? this.x + this.speed : this.x - this.speed
      tempy = player.y > this.y ? this.y + lpy / lpx : this.y - lpy / lpx
    } else {
      tempy = player.y > this.y ? this.y + this.speed : this.y - this.speed
      tempx = player.x > this.x ? this.x + lpx / lpy : this.x - lpx / lpy
    }
    this.x = tempx
    this.y = tempy
    getRoteImg({
      x1: this.x,
      x2: player.x,
      y1: this.y,
      y2: player.y
    },
      this
    )
  }
  fireHot(){
    if(this.fireSpeed%20==0){
      let bullet = databus.pools.getItemByClass('bullet', Bullet)
      bullet.init(
        this.x,
        this.y
      )
      databus.bullets.add(bullet)
    }
    this.fireSpeed++
    
  }
  getDistance(){
    let distance = Math.abs(this.x - this.player.x) + Math.abs(this.y - this.player.y)
    if(distance>=this.fireDistance){
      this.fireHot()
    }else{
      this.getPosition()
    }
  }
  setFireObj(obj){
    this.player = obj
  }
  update() {
    if (!this.visible)
      return
    if(this.player&&!this.player.visible){
      this.setFireObj(null)
    }
    if(this.player&&this.player.isReal){
      this.getDistance()
    } 
    if(this.player&&!this.player.isReal){
      this.getPosition()
    } 
  }
}
module.exports = Enemy