
const groundHeight = 10000
const groundWidth = 10000
const BULLET_WIDTH = 1
const BULLET_HEIGHT = 100
class MainHouse{
  constructor() {
    this.name = 'mainHouse'
    this.width = 60
    this.height = 40
    this.bleed = 20
    this.visible = true
  }
  init(databus,x, y,player){
    this.databus = databus
    this.player = player
    this.x = x
    this.y = y
    this.player.houses.push('mainHouse')
  }
  leseBleed(){
    this.bleed--
  }
  update() {
    if (!this.visible)
      return
  }
}
module.exports = MainHouse