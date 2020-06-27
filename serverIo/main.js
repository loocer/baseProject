const DataBus = require('./databus')
const Bullet = require('./bullet')
const init = require('./init')
let temp = null
let databus = new DataBus()
let results = {}
class Main {
  constructor() {
    this.aniId = 0
    temp = this
  }
  init(io) {
    this.io = io
    setInterval(this.loop, 50)
    init()
  }

  update() {
    Array.from(databus.bullets)
      .forEach((item) => {
        if (item.visible) {
          item.update()
        }else{
          databus.heros.delete(item)
        }
      })
    Array.from(databus.heros)
      .forEach((item) => {
        if (item.visible) {
          item.update()
        }else{
          databus.heros.delete(item)
        }
      })

    Array.from(databus.bullets)
      .forEach((item) => {
        if (!item.visible) {
          databus.bullets.delete(item)
        }
      })
    for (let key of databus.moveTeam.keys()) {
      let tempList = []
      for (let obj of databus.moveTeam.get(key)) {
        if (obj.visible) {
          tempList.push(obj)
        }
      }
      if(tempList.length!=0){
        databus.moveTeam.set(key, tempList)
      }else{
        databus.moveTeam.delete(key)
      }
    }
    databus.time++
  }
  render() {
    let bus = Array.from(databus.bullets)
    results.bullets = bus
    let hrs = Array.from(databus.heros)
    results.heros = hrs
    temp.io.emit('chat message', results);
  }
  loop() {
    temp.update()
    temp.render()
  }
}
module.exports = Main
