import Gan from './base/gan'
import Ball from './base/ball'
const screenHeight = window.innerHeight
let ctx = canvas.getContext('2d')
// let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.gan = new Gan()
    this.ball = new Ball()
    this.restart()
  }
  init(){
    this.gan.init(320,20,30)
    this.ball.init(100,100,100)
    this.bindLoop = this.loop.bind(this)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  restart() {
    // databus.reset()


  }
  update(){

  }
  render() {
   
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
    this.gan.drawToCanvas(ctx)
    this.ball.drawToCanvas(ctx)
  }
  loop() {
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}