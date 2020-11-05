import DataBus from '../databus'
import data from './data'
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
let databus = new DataBus()
let instance
export default class Scoll {
  constructor() {
    if (instance)
      return instance
    instance = this
    this.tools = data.get('home')
    this.toolWidth = 30
    this.toolHeight =30
    this.scoolly = 30
    this.width = 30
    this.height = screenHeight - 200
    this.x = 130
    this.y = 200
  }

  inClose(x, y) {
    return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
  }
  scoollReset(){
    if(this.scoolly>0){
      this.scoolly=0
    }
    let marginPanel =  (this.width - this.toolWidth * 2) / 4 
    let hei = Math.ceil(this.tools.length / 2)*(this.toolHeight+marginPanel)
    let height = hei -this.height
    if(Math.abs(this.scoolly)>height){
      if(height< this.height){
        this.scoolly=0
      }else{
        this.scoolly = -height
      }
    }
  }
  navigate(index){
    console.log('fix----',index)
  }
  getActionNo(x,y){
    let ps = this.tools
    y +=this.scoolly
    for (let index in ps) {
      let p = ps[index]
      if (p.x < x &&
        p.x+  this.toolWidth> x &&
        p.y < y &&
        p.y +this.toolHeight > y) {
        this.navigate(index)
      }
    }
  }
  opOrDown(ctx){
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.moveTo(this.toolWidth/2,0);
    ctx.lineTo(this.toolWidth/6,10);
    ctx.lineTo(this.toolWidth-this.toolWidth/6,10);
    ctx.lineTo(this.toolWidth/2,0);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.moveTo(this.toolWidth/2,this.height);
    ctx.lineTo(this.toolWidth/6,this.height-10);
    ctx.lineTo(this.toolWidth-this.toolWidth/6,this.height-10);
    ctx.lineTo(this.toolWidth/2,this.height);
    ctx.fill();
    ctx.restore()
  }
  renderSoll(ctx){
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = "#909090";
    ctx.fillRect(2,this.scoolly, this.width-4, this.toolHeight);
    ctx.fill();
    ctx.restore()
  }
  render(ctx) {
    if(!this.width){
      return
    }
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fill();
    ctx.strokeStyle = "#d3d3d3";
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.stroke();
    ctx.restore()
    this.renderSoll(ctx)
    this.opOrDown(ctx)
  }
  getMovePosition(x, y) {
    let px = (x - this.x) / this.width * databus.groundWidth - screenWidth / 2
    let py = (y - this.y) / this.height * databus.groundHeight - screenHeight / 2
    return {
      x: px,
      y: py
    }
  }
  update() {}
  renderEnemys(ctx) {
    databus.hero.forEach((item) => {
      if (item.visible) {
        let x = item.x / databus.groundWidth * this.width + this.x
        let y = item.y / databus.groundHeight * this.height + this.y
        ctx.save()
        ctx.translate(x, y)
        ctx.beginPath();
        ctx.fillStyle = item.color;
        ctx.arc(0, 0, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore()
      }
    })
  }

}