
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
      for (let pobj of p) {

        if (pobj[1].showHouse.has(this.name)) {
          pobj[1].hasHouse.add(this.name)
          
        }
      }
    }
    this.changePanelStatus(this.name)
  }
  makeOver() {
    this.visible = false
    let { panels } = this.player
    for (let p of panels) {
      for (let pobj of p) {
        if (pobj[1].hasHouse.has(this.name)) {
          pobj[1].hasHouse.delete(this.name)
        }
      }
    }
    this.changePanelStatus()
  }
  changePanelStatus(key) {
    let { panels } = this.player
    console.log(panels)
    for (let p of panels) {
      for (let pobj of p) {
        if (pobj[1].showHouse.size == pobj[1].hasHouse.size) {
          
          if(!pobj[1].exObj.status){
// console.log(pobj)
          }
          if (pobj[1].exObj.status != 2) {
            pobj[1].exObj.status = 1
          }
        }
      }
    }
    this.player.panels = panels
  }
  update() {
    if (!this.visible)
      return
  }
}
module.exports = House