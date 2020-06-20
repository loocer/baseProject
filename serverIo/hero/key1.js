
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
    this.isReal = true
    this.width = WIDTH
    this.height = HEIGHT
  }
  init(x, y) {
    this.x = x
    this.y = y
    this.name= 'enemy1'
    this.id="1234"
    this.visible = true
    this.player = null
    this.fireDistance = 200
    this.fireSpeed = 20
    this.speed =5
  }

  getPosition() {
    let {x,y} = this.player
    let zx = this.x
    let zy = this.y
    if(Math.abs(x-zx)<2&&Math.abs(y-zy)<2){
      this.setFireObj(null)
      return
    }
    let fib = Math.abs((x-zx)/(y-zy))
    this.moveY = Math.sqrt(1/(fib*fib+1));
    this.moveX = this.moveY*fib
    if(x>zx){
      this.x += this.moveX * this.speed
    }else{
      this.x -= this.moveX * this.speed
    }
    if(y>zy){
      this.y += this.moveY * this.speed
    }else{
      this.y -= this.moveY * this.speed
    }
    // this.y += this.moveY * this.speed
    // this.x += this.moveX * this.speed
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