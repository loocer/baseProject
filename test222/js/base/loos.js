function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
export default class Loos {
  constructor() {
    this.visible = true
    
  }
  init() {
    this.loop = []
    this.reateLoop()
  }
  reateLoop() {
    let maxH = screenHeight
    let minH = 0
    let maxW = screenWidth
    let minW = 0
    for (let i = 0; i < 30; i++) {
      let x = rnd(minW, maxW)
      let y = rnd(minH, maxH)
      let r = rnd(10, 50)
      this.loop.push({
        x,
        y,
        r
      })
    }
  }
  drawToCanvas(ctx) {
    if (!this.visible)
      return
      // console.log(99988888)
    for (let obj of this.loop) {
      ctx.save()
      ctx.translate(obj.x, obj.y)
      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      ctx.arc(obj.x,obj.y, obj.r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore()
    }
    
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