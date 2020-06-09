function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
import DataBus from '../databus'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
import {
  GAME_IMG
} from '../utils/common'
const databus = new DataBus()
let IMG=null
export default class Loos {
  constructor() {
    this.visible = true

  }
  init() {
    IMG = GAME_IMG.get('bg')
    this.loop = []
    this.reateLoop()
  }
  creaLoop(){
    let maxH = (-(databus.maxTop) * screenHeight)/2
    let minH = (-(databus.maxTop - 1) * screenHeight)/2
    let maxW = screenWidth / 2
    let minW = 0
    let x = rnd(minW, maxW)
    let y = rnd(minH, maxH)
    let r = rnd(10, 20)
    let flag = false
    for (let obj of this.loop) {
      
      let R = r+obj.r
      let l = Math.sqrt((x - obj.x) * (x - obj.x) + (y - obj.y) * (y - obj.y))
      flag = R<l
    }
    return {x,y,r}
    // if(this.loop.length==0){
    //   return {x,y,r}
    // }
    // if(flag){
    //   return {x,y,r}
    // }
  }
  reateLoop() {
    if (databus.maxTop == 0) {
      // let size = (databus.maxTop + 1) * 10
      let size = 30
      for (let i = 0; i < size; i++) {
        let obj = this.creaLoop()
        
        if (obj&&obj.y < screenHeight - 500) {
          this.loop.push(obj)
        }
      }
    } else {
      let size = (databus.maxTop + 1) * 50
      for (let i = 0; i < size; i++) {
        let obj = this.creaLoop()
        obj&&this.loop.push(obj)
      }
    }
    
    // let maxH = (-(databus.maxTop) * screenHeight)/2
    // let minH = (-(databus.maxTop - 1) * screenHeight)/2
    // let maxW = screenWidth / 2
    // let minW = 0
    // if (databus.maxTop == 0) {
    //   let size = (databus.maxTop + 1) * 50
    //   for (let i = 0; i < size; i++) {
    //     let x = rnd(minW, maxW)
    //     let y = rnd(minH, maxH)
    //     let r = rnd(10, 20)
    //     if (y < screenHeight - 500) {
    //       this.loop.push({
    //         x,
    //         y,
    //         r
    //       })
    //     }

    //   }
    // } else {
    //   let size = (databus.maxTop + 1) * 50
    //   for (let i = 0; i < size; i++) {
    //     let x = rnd(minW, maxW)
    //     let y = rnd(minH, maxH)
    //     let r = rnd(10, 20)
    //     this.loop.push({
    //       x,
    //       y,
    //       r
    //     })
    //   }
    // }

  }
  checkOver(ball) {
    for (let obj of this.loop) {
      let R = ball.r >= obj.r ? ball.r : obj.r
      let r = ball.r < obj.r ? ball.r : obj.r
      let x = obj.x * 2
      let y = obj.y * 2
      if (ball.r > obj.r) {
        continue
      }
      let l = Math.sqrt((x - ball.x) * (x - ball.x) + (y - ball.y) * (y - ball.y))
      if (R - l > r) {
        return true
      }
    }
    return false
  }
  drawToCanvas(ctx) {
    if (!this.visible)
      return
    for (let obj of this.loop) {
      let hindex = ~~((obj.y-screenHeight)/screenHeight)
      ctx.save()
      ctx.beginPath();
      ctx.arc(obj.x*2, obj.y*2, obj.r, 0, 2 * Math.PI);
      ctx.clip()
      ctx.drawImage(
        IMG,
        0,
        (hindex)*screenHeight,
        screenWidth,
        screenHeight
      )
      ctx.restore()
    }
    
    // ctx.drawImage(
    //   IMG,
    //   0,
    //   0,
    //   screenWidth,
    //   screenHeight
    // )
    // let bgLength = databus.maxTop
    // for(let i=1;i<bgLength+1;i++){
    //   ctx.drawImage(
    //     IMG,
    //     0,
    //     -screenHeight*i,
    //     screenWidth,
    //     screenHeight
    //   )
    // }
    // ctx.restore()
    // ctx.beginPath();
    // ctx.arc(200, 200, 20, 0, 2 * Math.PI);
    // ctx.clip()
    // ctx.drawImage(
    //   IMG,
    //   0,
    //   0,
    //   screenWidth,
    //   screenHeight
    // )
    
    // ctx.drawImage(
    //   IMG,
    //   0,
    //   0,
    //   screenWidth,
    //   screenHeight
    // )
   
  }
  lessKong() {
    let temp = []
    for (let obj of this.loop) {
      if (obj.y < (-databus.maxTop + 1) * screenHeight) {
        temp.push(obj)
      }
    }
    console.log(temp)
    this.loop = temp
  }
  update(body) {
    if (!this.visible)
      return
    this.rotate = body.angle
    this.x = body.position.x
    this.y = body.position.y
    this.lessKong()
  }
}