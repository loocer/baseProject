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
    
  }
  update() {
    
  }
  addEventLinner(){
    this.hand.addEventLinner()
    // canvas.addEventListener('touchstart',databus.touchHandler)
  }
  drawRow(ctx){
    let ys = 100
    for(let i =0;i<10;i++){
      let sx  = 50
      let ex  = (screenWidth - 100) + 50
      let h = (screenWidth - 100)/4
      ctx.strokeStyle="green";
      ctx.beginPath();
      ctx.moveTo(sx,h*i+ys);
      ctx.lineTo(ex,h*i+ys);
      ctx.stroke(); 
    }
  }
  addEventLinner(){
  }
  drawCol(ctx){
    let ys = 100
    let onex1  = 50
    let onex2  = (screenWidth - 100)/4 + 50
    let onex3 = (screenWidth - 100)/4*2 + 50
    let onex4 = (screenWidth - 100)/4*3 + 50
    let onex5 = (screenWidth - 100)/4*4 + 50
    let xlist = [onex1,onex2,onex3,onex4,onex5]
    for(let obj of xlist){
      ctx.strokeStyle="green";
      ctx.beginPath();
      ctx.moveTo(obj,ys);
      ctx.lineTo(obj,900);
      ctx.stroke(); 
    }
    
  }
  render(ctx) {

    ctx.save();

    // 重置渲染上下文并清空画布
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 恢复先前渲染上下文所进行的变换
    this.drawCol(ctx)
    this.drawRow(ctx)
  }
}