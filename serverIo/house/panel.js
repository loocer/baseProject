
const groundHeight = 10000
const groundWidth = 10000
const BULLET_WIDTH = 1
const BULLET_HEIGHT = 100
//status:0:无效 1待定 2进行 3暂停
class Panel{
  constructor() {
    this.num = 0
    this.progress = 0
    this.status = 0
  }
  update(){
    if(this.status==2){
        this.progress++
    }
  }
}
module.exports = Panel