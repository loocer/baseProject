function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
import DataBus from '../databus'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Vector = Matter.Vector,
  Events = Matter.Events;
import {
  GAME_IMG
} from '../utils/common'
import * as Matter from '../libs/matter'
const databus = new DataBus()
let IMG = null
export default class Loos {
  constructor() {
    this.visible = true

  }
  init() {
    IMG = GAME_IMG.get('bg')
    this.loop = []
    this.reateLoop()
  }
  creaLoop() {
    let maxH = (-(databus.maxTop) * screenHeight) / 2
    let minH = (-(databus.maxTop - 1) * screenHeight) / 2
    let maxW = screenWidth / 2
    let minW = 0
    let x = rnd(minW, maxW)
    let y = rnd(minH, maxH)
    let r = rnd(10, 20)
    let flag = false
    for (let obj of this.loop) {

      let R = r + obj.r
      let l = Math.sqrt((x - obj.x) * (x - obj.x) + (y - obj.y) * (y - obj.y))
      flag = R < l
    }
    return {
      x,
      y,
      r
    }
    // if(this.loop.length==0){
    //   return {x,y,r}
    // }
    // if(flag){
    //   return {x,y,r}
    // }
  }
  reateLoop() {
    let cicyl = Bodies.circle(screenWidth / 5, 200, 30, {
        isStatic: true,
      }),
      world = databus.world;
    World.add(world, [cicyl])
    databus.balls.push(cicyl)
    // let size = 30
    // if (databus.maxTop == 0) {
    //   // let size = (databus.maxTop + 1) * 10

    //   for (let i = 0; i < size; i++) {
    //     let obj = this.creaLoop()

    //     if (obj&&obj.y < screenHeight - 500) {
    //       this.loop.push(obj)
    //     }
    //   }
    // } else {
    //   // let size = (databus.maxTop + 1) * 50
    //   for (let i = 0; i < size; i++) {
    //     let obj = this.creaLoop()
    //     obj&&this.loop.push(obj)
    //   }
    // }
  }
  checkOver(ball) {
    this.loop = databus.kong
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
  drwaBall(ctx) {
    let balls = databus.balls
    if (!this.visible)
      return
    for (let ball of balls) {
      let position =ball.position 
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(position.x , position.y , 30, 0, 2 * Math.PI);
      ctx.fill()
    }
  }
  drawToCanvas(ctx) {
    console.log(3333333)
    this.loop = databus.kong
    if (!this.visible)
      return
    for (let obj of this.loop) {
      let hindex = ~~((obj.y - screenHeight) / screenHeight)
      ctx.save()
      ctx.beginPath();
      ctx.arc(obj.x * 2, obj.y * 2, obj.r, 0, 2 * Math.PI);
      ctx.clip()
      ctx.drawImage(
        IMG,
        0,
        (hindex) * screenHeight,
        screenWidth,
        screenHeight
      )
      ctx.restore()
    }
    this.drwaBall(ctx)
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