const  DataBus = require('./databus')
const  Bullet = require('./bullet')
let temp = null
let databus = new DataBus()
class Main {
  constructor() {
    this.aniId = 0
    temp = this
  }
  init(io) {
    this.io = io
    setInterval(this.loop,20)
  }
  
  update() {
    
    if(databus.time%10000==0){
      let bullet = databus.pools.getItemByClass('bullet', Bullet)
      bullet.init(
        0,
        0
      )
      databus.bullets.add(bullet)
    }
    Array.from(databus.bullets)
      .forEach((item) => {
        if (item.visible) {
          item.update()
        }
      })
    databus.time++
    console.log(343434343)
  }
  render() {
    let bus = Array.from(databus.bullets)
    temp.io.emit('chat message', bus);
  }
  loop() {
    temp.update()
    temp.render()
  }
}
module.exports = Main

const masg = {
  drawToCanvas:(ctx)=> {
    if (!this.visible)
      return
    ctx.save()
    ctx.translate(100 , 200)
    ctx.beginPath();
    ctx.fillStyle = "#00a1ff";
    ctx.arc(0, 0,  30 , 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore()
  }
}