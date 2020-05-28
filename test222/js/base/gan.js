
import {
  getRoteImg
} from '../utils/index'

let instance
// const ENEMY_WIDTH = 20
// const ENEMY_HEIGHT = 20
let atlas = new Image()
atlas.src = 'images/bg.jpg'
export default class Gan {
  constructor() {
    if ( instance )
      return instance

    instance = this
    this.visible = true
    this.width = 320
    this.height = 10
    this.rotate = 30

    
  }
  init(x,y) {
    this.x = x
    this.y = y
  }

  drawToCanvas(ctx) {
    if (!this.visible)
      return
    ctx.save()
    ctx.translate(this.x , this.y)
    ctx.rotate(this.rotate )
    ctx.fillStyle = "#00a1ff";
    ctx.fillRect(-this.width / 2,-this.height / 2,this.width, this.height);
    // ctx.drawImage(
    //   atlas, -this.width / 2, -this.height / 2,
    //   this.width,
    //   this.height
    // )
    ctx.restore()
    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(this.x, this.y, 150, 75);
  }
  // 每一帧更新子弹位置
  update(body) {
    if (!this.visible)
      return
      this.rotate = body.angle
      this.x = body.position.x
      this.y = body.position.y
  }
  updateAngle(angle){
    this.rotate = angle
  }
}