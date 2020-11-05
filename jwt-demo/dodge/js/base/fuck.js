

export default class Ball {
  constructor(obj) {
    this.visible = true
    this.ats=obj
    this.status='do'
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