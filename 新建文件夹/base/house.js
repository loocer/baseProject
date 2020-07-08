
const groundHeight = 10000
const groundWidth = 10000
const BULLET_WIDTH = 1
const BULLET_HEIGHT = 100

class House {
  constructor() {
    this.width = 100
    this.height = 100
    this.bleed = 20
  }
  init({ databus, x, y, player, name, width, height }) {
    this.name = name
    this.player = player
    this.x = x
    this.y = y
    this.width = width || 100
    this.height = height || 100
    this.player.houses.push(name)
    this.checkPanelStatus()
    databus.house.add(this)
  }
  checkPanelStatus() {
    let { panels } = this.player
    for (let p of panels) {
      if (p.showHouse.has(this.name)) {
        p.hasHouse.add(this.name)
        this.changePanelStatus(this.name)
      }
    }
  }
  makeOver() {
    this.visible = false
    let { panels } = this.player
    for (let p of panels) {
      if (p.hasHouse.has(this.name)) {
        p.hasHouse.delete(this.name)
        this.changePanelStatus(this.name)
      }
    }
  }
  changePanelStatus(key){
    let { panels } = this.player
    let panel = new Map(panels).get(key)
    if(panel.showHouse.size==panel.hasHouse.size){
      if(panel.exObj.status!=2){
        panel.exObj.status=1
      }
    }
    this.player.panel = Array.from(panel)
  }
  update() {
    if (!this.visible)
      return
  }
}
module.exports = House