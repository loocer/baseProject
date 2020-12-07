 import utl from "../utl.js"
 let temp = 0
export default class newtach{
    constructor(){
            
            this.scaleTime = 100;
            this.width = Laya.stage.width/2 
            this.height = Laya.stage.height
             this.x = 0;
            this.y = 0;
            this.moveX = 0
            this.moveY = 0
            this.tx=300
            this.twidth = 300
            this.theight = 300
            this.ty = Laya.stage.height - 200;
            this.flag = false
            console.log(this.maind)
        }
        outEvent(){
          utl.tachLeftFlag = false
        }
       scaleBig(e)
        {        
            console.log('MOUSE_UP')
            utl.tachLeftFlag = false
            //变大还原的缓动效果
            utl.moveX = 0
            utl.moveY = 0
            utl.takeSpeed.x = 0
            utl.takeSpeed.y = 0
            // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
        }
        scaleSmall(x,y)
        {    
          if(
            x<this.width
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
            rotate =~~(Math.atan(atanrotate) / Math.PI * 180) + 90
          } else if (pobj.x1 < pobj.x2) {
            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270
          }
          return  360 -( rotate - 90)
        }
        leftFormatMovePosition(px,py) {
          
          // utl.ani.play("hello");
          let pobj = {}
          pobj.x1 = px //点击
          pobj.x2 =this.tx 
          pobj.y1 = py
          pobj.y2 = this.ty 

          
          let rote = this.getRoteImg(pobj) % 360
          // utl.camera.transform.rotate(new Laya.Vector3(0, -temp* Math.PI / 180, 0), false);
          // utl.camera.transform.rotate(new Laya.Vector3(0, utl.rote* Math.PI / 180, 0), false);
          if(45<rote&&rote<135){//w
              utl.cubec.transform.translate(new Laya.Vector3(0,-.03,0),true)
              let tempP = utl.cubec.transform.position
              let y = utl.camera.transform.position.y
              utl.camera.transform.position =  new Laya.Vector3(tempP.x,y,tempP.z)
              console.log(tempP)
              // utl.camera.transform.translate(new Laya.Vector3(0,0,.03),false)
          }
          if(135<rote&&rote<225){//a
              utl.cubec.transform.translate(new Laya.Vector3(0.01,0,0),true)
              let tempP = utl.cubec.transform.position
              let y = utl.camera.transform.position.y
              utl.camera.transform.position =  new Laya.Vector3(tempP.x,y,tempP.z)
          }
          if(225<rote&&rote<315){//s
              utl.cubec.transform.translate(new Laya.Vector3(0,.03,0),true)
              let tempP = utl.cubec.transform.position
              let y = utl.camera.transform.position.y
              utl.camera.transform.position =  new Laya.Vector3(tempP.x,y,tempP.z)
          }
          if(rote<45||rote>315){//d
              utl.cubec.transform.translate(new Laya.Vector3(-0.01,0,0),true)
              let tempP = utl.cubec.transform.position
              let y = utl.camera.transform.position.y
              utl.camera.transform.position =  new Laya.Vector3(tempP.x,y,tempP.z)
          }
          // utl.camera.transform.rotation =  new Laya.Vector3(0,utl.rote* Math.PI / 180,0)
          // tools.getRoteImg(pobj, databus.leftPositions)
          // let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
          // utl.moveX = (pobj.x1 - pobj.x2) * r /10
          // utl.moveY = (pobj.y1 - pobj.y2) * r/10
          // utl.box.transform.rotate(new Laya.Vector3(0, -utl.rote* Math.PI / 180, 0), true);
        }
}