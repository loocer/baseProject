function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
import DataBus from '../databus'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
const databus = new DataBus()
export default class Loos {
  constructor() {
    this.visible = true
    
  }
  init() {
    this.loop = []
    this.reateLoop()
  }
  reateLoop() {
    // databus.maxTop
    let maxH = -(databus.maxTop ) *screenHeight
    let  minH= -(databus.maxTop -1)*screenHeight
    let maxW = screenWidth
    let minW = 0
    // this.loop.push({
    //       x:100,
    //       y:300,
    //       r:40
    //     })
    let size = databus.maxTop *50
    for (let i = 0; i < size; i++) {
      let x = rnd(minW, maxW)
      let y = rnd(minH, maxH)
      let r = rnd(10, 30)
      this.loop.push({
        x,
        y,
        r
      })
    }
  }
  checkOver(ball){
    for(let obj of this.loop){
      let R = ball.r>=obj.r?ball.r:obj.r
      let r = ball.r<obj.r?ball.r:obj.r
      let x = obj.x*2
      let y = obj.y*2
      if(ball.r>obj.r){
        continue
      }
      let l = Math.sqrt((x - ball.x)*(x - ball.x)+(y - ball.y)*(y - ball.y))
      if(R-l>r){
        return true
      }
    }
    return false
  }
  drawToCanvas(ctx) {
    if (!this.visible)
      return
    for (let obj of this.loop) {
      ctx.save()
      ctx.translate(obj.x, obj.y)
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.arc(obj.x,obj.y, obj.r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore()
    }
    
  }
  
  update(body) {
    if (!this.visible)
      return
    this.rotate = body.angle
    this.x = body.position.x
    this.y = body.position.y
   
  }
}