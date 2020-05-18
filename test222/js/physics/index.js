import '../libs/weapp-adapter'
import '../libs/symbol'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
import Main from '../main'
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
  reset() {
    this.gan.init(320, 20, 30)
    this.ball.init(40, 40, 100)
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
  update(){
    this.hand.update()
    this.checkOver()
  }
  checkOver(){
    let by = this.ball.y
    let gy = this.gan.y
    console.log(by)
    if(by>gy+screenHeight/2){
      databus.gameOverFlag = true
    }
  }
  render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FF0000";
    // ctx.fillRect(0, 0, 150, 75);
    this.gan.drawToCanvas(ctx)
    this.ball.drawToCanvas(ctx)
    this.hand.drawToCanvas(ctx)
    this.loos.drawToCanvas(ctx)
  }
}