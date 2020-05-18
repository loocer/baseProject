
import {
  getRoteImg
} from '../utils/index'

// const ENEMY_WIDTH = 20
// const ENEMY_HEIGHT = 20
let atlas = new Image()
atlas.src = 'images/bg.jpg'
export default class Ball {
  constructor() {
    this.visible = true
    this.x = 100
    this.y = 300
  }
  init(width,height,rotate) {
    this.width = width
    this.height = height
    this.rotate = rotate
  }

  drawToCanvas(ctx) {
    if (!this.visible)
      return
    ctx.save()
    ctx.translate(this.x , this.y)
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0, 0,  this.width/2 , 0, 2 * Math.PI);
    ctx.fill();
    // ctx.rotate(this.rotate )
    // ctx.drawImage(
    //   atlas, -this.width / 2, -this.height / 2,
    //   this.width,
    //   this.height
    // )
    ctx.restore()
  }
  // 每一帧更新子弹位置
  update(body) {
    if (!this.visible)
      return
      this.rotate = body.angle
      this.x = body.position.x
      this.y = body.position.y
  }
}