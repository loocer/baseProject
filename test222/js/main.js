import Gan from './base/gan'
import Ball from './base/ball'
import Hand from './base/hand'
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
    databus.reset()
    this.physics.reset()

  }
  gameOver(){
    let temp =this
    if(databus.state&&databus.gameOverFlag){
      databus.state = false
      wx.showModal({
        title: '提示',
        content: '失败了！',
        success (res) {
          if (res.confirm) {
            temp.restart()
          } 
        }
      })
    }
  }
  
  update() {
    this.physics.update()
    this.gameOver()
  }
  render() {
    this.physics.render(ctx)
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