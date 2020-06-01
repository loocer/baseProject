import '../libs/weapp-adapter'
import '../libs/symbol'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
import DataBus from '../databus'
import * as Matter from '../libs/matter'
import Gan from '../base/gan'
import Ball from '../base/ball'
import Hand from '../base/hand'
import Loos from '../base/loos'
const databus = new DataBus()

const Body = Matter.Body

let instance
export default class Physics {
  constructor() {
    if (instance)
      return instance

    instance = this
    this.gan = new Gan()
    this.ball = new Ball()
    this.hand = new Hand()
    this.loos = new Loos()
  }
  reset(ctx) {
    this.gan.init(screenWidth / 2, screenHeight - 50)
    this.ball.init(screenWidth / 2,screenHeight - 200)
    this.hand.init(40, 40, 100)
    this.loos.init()
    Body.setPosition(databus.engGan, {
      x: screenWidth / 2,
      y: screenHeight - 50
    })
    Body.setPosition(databus.engBall, {
      x: screenWidth / 2,
      y: screenHeight - 200
    })
  }
  update() {
    this.hand.update()
    this.checkOver()
    if(databus.trans.y>databus.maxTop*screenHeight){
      databus.maxTop++
      this.loos.reateLoop()
    }
  }
  checkOver() {
    let by = this.ball.y
    let gy = this.gan.y
    if (by > gy + screenHeight / 2) {
      databus.gameOverFlag = true
    }
    if(this.loos.checkOver(this.ball)){
      databus.gameOverFlag = true
    }
  }
  addEventLinner(){
    this.hand.addEventLinner()
    // canvas.addEventListener('touchstart',databus.touchHandler)
  }
  render(ctx) {

    ctx.save();

    // 重置渲染上下文并清空画布
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 恢复先前渲染上下文所进行的变换
    ctx.restore();
    
    ctx.fillStyle = "#FF0000";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,-databus.trans.y, screenWidth,screenHeight);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(87, 177, 255, .3)';
    ctx.fillRect(0,-databus.trans.y, screenWidth,screenHeight);
    this.loos.drawToCanvas(ctx)
    this.gan.drawToCanvas(ctx)
    this.ball.drawToCanvas(ctx)
    
   
    this.hand.drawToCanvas(ctx)
  }
}