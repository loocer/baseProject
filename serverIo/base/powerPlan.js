const Base = require('./base');
const groundHeight = 10000
const groundWidth = 10000
const BULLET_WIDTH = 1
const BULLET_HEIGHT = 100

class PowerPlan{
  constructor() {
      this.name = 'powerPlan'
      this.width = 100
      this.height = 100
      this.bleed = 20
  }
  init(databus,x, y,player){
    this.databus = databus
    this.player = player
    this.x = x
    this.y = y
  }
  update() {
    if (!this.visible)
      return
  }
}
module.exports = Base