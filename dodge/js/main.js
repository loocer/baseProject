
import * as page from './pages/index'
import DataBus from './databus'
let ctx = canvas.getContext('2d')
let databus = new DataBus()
databus.ctx = ctx
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
  }
  init() {
    this.bindLoop = this.loop.bind(this)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
    databus.reset()
  }
  
  update() {
    page.work(this).update()
  }
  render() {
    page.work(this).render(ctx)
  }
  loop() {
    this.update()
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}