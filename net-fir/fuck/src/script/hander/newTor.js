 import utl from "../utl.js"
  let temp = 0
export default class newTwo{
    constructor(){
            this.scaleTime = 100;
            this.width = 300
            this.height = 300
           this.x = Laya.stage.width - 350;
            this.y = Laya.stage.height - 350;
            this.moveX = 0
            this.moveY = 0
            this.tx=Laya.stage.width - 350+150
            this.twidth = 300
            this.theight = 300
            this.ty = Laya.stage.height - 350+ 150;
            this.flag = false
            console.log(this.maind)
            
          
        }
       scaleBig(e)
        {        
            utl.takeSpeed.z = 0
            console.log('MOUSE_UP')
            utl.tachRightFlag = false
            // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
        }
        outEvent(){
          utl.tachRightFlag = false
        }
      
       scaleSmall(x,y)
        {    
          if(
            x>Laya.stage.width/2
            ){
            return true
          }else{
            return false
          }
            //缩小至0.8的缓动效果
            // Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
        }
        getRoteImg(pobj) {
          let rotate = 0
          if (pobj.x1 == pobj.x2){
            rotate=0
          }
          if (pobj.x1 > pobj.x2) {
            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90
          } else if (pobj.x1 < pobj.x2) {
            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270
          }
          return 360 - rotate 
        }
        leftFormatMovePosition(px,py) {
         
          let pobj = {}
          pobj.x1 = px //点击
          pobj.x2 =this.tx 
          pobj.y1 = py
          pobj.y2 = this.ty 

          
          utl.rote = this.getRoteImg(pobj) 
          console.log(utl.rote)
          utl.cubec.transform.rotate(new Laya.Vector3(0, -temp* Math.PI / 180, 0), false);
          utl.cubec.transform.rotate(new Laya.Vector3(0, utl.rote* Math.PI / 180, 0), false);
          temp = utl.rote
        }

}