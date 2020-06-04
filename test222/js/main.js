import Gan from './base/gan'
import Ball from './base/ball'
import Hand from './base/hand'
import * as page from './pages/index'
import Physics from './physics/index.js'
import DataBus from './databus'
const screenHeight = window.innerHeight
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
    this.physics = new Physics()
  }
  init() {
    this.bindLoop = this.loop.bind(this)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
    this.restart()
  }
  restart() {
    ctx.translate(0, -databus.trans.y)
    // ctx.translate(0, databus.trans.y)
    databus.reset()
    this.physics.reset(ctx)

  }
  gameOver(){
    let temp =this
    if(databus.state&&databus.gameOverFlag){
      databus.state = false
      wx.showModal({
        title: '提示',
        cancelText:'查看排行',
        content: '失败了！',
        success (res) {
          if (res.confirm) {
            temp.restart()
          }else{
            temp.restart()
          }
        }
      })
    }
  }
  
  update() {
    page.work(this).update()
    this.gameOver()
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