

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this


    this.reset()
  }

  reset() {
    this.pageIndex = 0
    this.actionIndex=null
    this.maxTop = 0
    this.frame      = 0
    this.score      = 0
    this.trans ={
      x:0,
      y:0
    } 
    this.transed ={
      x:0,
      y:0
    } 
    this.animations = []
    this.state = true//状态过度，避免一直弹窗
    this.gameOverFlag   = false
  }
}
