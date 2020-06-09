
import DataBus from '../databus'

// const ENEMY_WIDTH = 20
// const ENEMY_HEIGHT = 20
import * as Matter from '../libs/matter'
const databus = new DataBus()
const Body = Matter.Body
import {
  GAME_IMG
} from '../utils/common'
let IMG=null
export default class Ball {
  constructor() {
    this.visible = true
    this.width = 40
    this.r = 10
    this.height = 40
    this.rotate = 100
    
  }
  init(x,y) {
    IMG = GAME_IMG.get('ballImag')
    this.x = x
    this.y = y
  }
  overBall(){
    let y = databus.engBall.position.y+20
    let x = databus.engBall.position.x
    Body.setPosition(databus.engBall, {
      x: x,
      y: y
    })
    databus.gameStatus = true
  }
  drawToCanvas(ctx) {
    if (!this.visible)
      return
    ctx.save()
    ctx.translate(this.x , this.y)
    ctx.beginPath();
    ctx.fillStyle = "#00a1ff";
    ctx.arc(0, 0,  this.r , 0, 2 * Math.PI);
    ctx.fill();
    
      ctx.beginPath();
      ctx.arc(0,0, this.r, 0, 2 * Math.PI);
      ctx.clip()
      ctx.rotate(this.rotate )
      ctx.drawImage(
        IMG,
        154,
        150,
        330,
        330,
        -this.r,
        -this.r,
        this.r*2,
        this.r*2
      )
      
      ctx.restore()
  }
  // 每一帧更新子弹位置
  update(body) {
    if (!this.visible)
      return
      // console.log(body.angle,3333333)
      this.rotate = body.angle
      this.x = body.position.x
      this.y = body.position.y
  }
}