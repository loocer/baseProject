

const  Pools = require('./pools')
let instance

class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this
    this.pageIndex = 0
    this.pools = new Pools()
    this.reset()
  }

  reset() {
    
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
    this.time = 0
    this.animations = []
    this.gameStatus   = false
    this.gameOverFlag   = false
    this.balls = []
    this.csBall = []
    this.kong = []
    this.moveTeam = new Map()
    this.bullets = new Set()
    this.heros = new Set()
    this.house = new Set()
  }
}
module.exports = DataBus