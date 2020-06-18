/**
 * 游戏基础的精灵类
 */
import DataBus from '../databus'
let databus = new DataBus()
export default class Sprite {
  constructor(imgObj = {}, width = 0, height = 0, x = 0, y = 0, rotate = 0) {
    this.img = imgObj
    this.width  = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
  }
  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if ( !this.visible )
      return
    ctx.save()
    ctx.translate(this.x , this.y  )
    ctx.rotate(this.rotate * Math.PI / 180)
    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
    // ctx.beginPath();
    // ctx.lineWidth = 5;
    // ctx.arc(0, 0, 15+2 * this.lifeValue , 0, 2 * Math.PI);
    // ctx.stroke();
    ctx.restore()

  }
}
