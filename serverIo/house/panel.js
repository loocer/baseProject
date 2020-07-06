
const groundHeight = 10000
const groundWidth = 10000
const BULLET_WIDTH = 1
const BULLET_HEIGHT = 100
//status:0:无效 1待定 2进行 3暂停
class Panel{
  constructor() {
    this.num = 0
    this.time = 100
    this.progress = 0
    this.status = 2
    this.visible = true
  }
  update(){
    if(this.status==2){
      if(this.progress>this.time ){
        this.status = 1
        this.progress = 0
      }else{
        this.progress+=0.2
      }
        
    }
  }
}
module.exports = Panel