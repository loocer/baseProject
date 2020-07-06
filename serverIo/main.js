const DataBus = require('./databus')
const Bullet = require('./bullet')
const bs = require('./req/tools/databus')
const action = require('./action')
const init = require('./init')
let temp = null
let results = {}
class Main {
  constructor({roomNo,peopleNum}) {
    this.roomNo = roomNo
    this.players = new Map()
    this.peopleNum = peopleNum
    this.aniId = 0
    this.databus = new DataBus()
    temp = this
  }
  init() {
    this.io = bs.io
    setInterval(this.loop, 50)
    init(this.databus)
  }
  action(event){
    action(event,this)
  }
  update() {
    Array.from(this.databus.bullets)
      .forEach((item) => {
        if (item.visible) {
          item.update()
        }else{
          this.databus.heros.delete(item)
        }
      })
    Array.from(this.databus.heros)
      .forEach((item) => {
        if (item.visible) {
          item.update()
        }else{
          this.databus.heros.delete(item)
        }
      })

    Array.from(this.databus.bullets)
      .forEach((item) => {
        if (!item.visible) {
          this.databus.bullets.delete(item)
        }
      })
    for (let key of this.databus.moveTeam.keys()) {
      let tempList = []
      for (let obj of this.databus.moveTeam.get(key)) {
        if (obj.visible) {
          tempList.push(obj)
        }
      }
      if(tempList.length!=0){
        this.databus.moveTeam.set(key, tempList)
      }else{
        this.databus.moveTeam.delete(key)
      }
    }
    for(let key of this.players.keys()){
      let per = this.players.get(key)
      per.visible&&per.update()
    }
    
    this.databus.time++
  }
  render() {
    let bus = Array.from(this.databus.bullets)
    results.bullets = bus
    let hrs = Array.from(this.databus.heros)
    results.heros = hrs
    results.players = Array.from(this.players)
    results.house = Array.from(this.databus.house)
    temp.io.emit('main_update', results);
  }
  loop() {
    temp.update()
    temp.render()
  }
}
module.exports = Main
