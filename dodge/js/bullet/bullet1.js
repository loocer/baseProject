import Sprite from '../base/sprite'
import DataBus from '../databus'
import * as tools from '../utils/tools'
import Player from '../base/ball'
import {
  GAME_IMG
} from '../utils/common'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const groundHeight = screenHeight*10
const groundWidth = screenWidth*10
const BULLET_WIDTH = 1
const BULLET_HEIGHT = 100

let databus = new DataBus()
export default class Bullet extends Sprite {
  constructor() {
    const IMG = GAME_IMG.get('biu')

    super(IMG, BULLET_WIDTH, BULLET_HEIGHT)
    this.player = new Player()
  }
  init(x, y) {
    this.name = 'bullet1'
    this.zx = x
    this.zy = y
    // this.img = GAME_IMG.get('bullets')[0]
    this.x = x
    this.y = y
    this.showLength = 0
    this.stopFlag = false
    this.stopFlagTemp = false
    databus.createSpeed = 10
    this.speed = 20
    this.points = []
    this.visible = true
    this.getMovexy()
    // this.mucsic()
  }
  getMovexy(){
    console.log(databus.trans.x,databus.trans.y,'----======')
    let {zx,zy} = this
    let {x,y} = this.player
    x += databus.trans.x
    y += databus.trans.y
    let fib = (x-zx)/(y-zy)
    this.moveY = Math.sqrt(1/(fib*fib+1));
    this.moveX = this.moveY*fib
  }
  drawToCanvas(ctx) {
    if (!this.visible)
      return
    ctx.save()
    let length = Math.sqrt((this.x - this.zx) * (this.x - this.zx) + (this.y - this.zy) * (this.y - this.zy))
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotate * Math.PI / 180)
    if (this.stopFlagTemp) {

      ctx.drawImage(
        this.img,
        0, this.showLength,
        10, this.height,
        -this.width / 2,
        0,
        this.width,
        length
      )
    } else {
      ctx.drawImage(
        this.img,
        -this.width / 2,
        0,
        this.width,
        length
      )
    }
    ctx.restore()
  }
  // 每一帧更新子弹位置
  update() {
    if (!this.visible)
      return
    if (this.stopFlagTemp) {
      this.showLength += 4
    } else {
      tools.getRoteImg({
          x1: this.x + this.moveX,
          x2: this.x,
          y1: this.y + this.moveY,
          y2: this.y,
        },
        this
      )
      this.y += this.moveY * this.speed
      this.x += this.moveX * this.speed
    }
    if (this.y < 0 ||
      this.y > groundHeight ||
      this.x < 0 ||
      this.x > groundWidth
    ) {
      this.stopFlagTemp = true
    }
    if (this.showLength == 100) {
      this.visible = false
      databus.pools.recover(this.name, this)
    }
    // databus.removeBullets(this)

    // delete this
  }
}