const  DataBus = require('./databus')
const  Bullet = require('./bullet')
const  init = require('./init')
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
    setInterval(this.loop,30)
    init()
  }
  
  update() {
    Array.from(databus.bullets)
      .forEach((item) => {
        if (item.visible) {
          item.update()
        }
      })
    Array.from(databus.heros)
      .forEach((item) => {
        if (item.visible) {
          item.update()
        }
      })
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
