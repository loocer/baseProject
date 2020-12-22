/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
  import utl from "./utl.js"
  import newTouch from "./hander/rightTouch.js"
  import newTor from "./hander/leftTouch.js"
  import {getServiceAddress} from "./net/index"
  let temp =0,spled = {x:0,y:0,z:0},dfew=0
export default class GameUI extends Laya.Scene {
    constructor() {
        super();
        this.isTwoTouch = false
        this.twoFirst = true
        this.temprx=0
        this.tempry=0
        this.temprz=0
        this.shipRx = 0
        this.shipRy = 0
        this.spled = 0
        this.newTouch = new newTouch()
        this.newTor = new newTor()
        this.spledy=0
		this.loadScene("test/TestScene.scene");
		this.newScene = Laya.stage.addChild(new Laya.Scene3D());
        utl.newScene = this.newScene
        this.info = new Laya.Text();
        this.info.fontSize = 50;
        this.info.color = "#FFFFFF";
        this.info.size(Laya.stage.width, Laya.stage.height);
        Laya.stage.addChild(this.info);
        Laya.Gyroscope.instance.on(Laya.Event.CHANGE, this, onDeviceorientation);
        function onDeviceorientation(absolute, rotationInfo) {
            // this.info.text =
            //     "alpha:" + Math.floor(rotationInfo.alpha) + '\n' +
            //     "beta :" + Math.floor(rotationInfo.beta) + '\n' +
            //     "gamma:" + Math.floor(rotationInfo.gamma);
            if(utl.operationYype==2){
                utl.takeSpeed.x =  Math.floor(rotationInfo.gamma)
                utl.takeSpeed.y =  Math.floor(rotationInfo.beta)
            }
        }
		temp = this
		//初始化照相机
		// var camera = this.newScene.addChild(new Laya.Camera(0, 0.1, 100));
		// camera.transform.translate(new Laya.Vector3(0, 100, 0));
		// camera.transform.rotate(new Laya.Vector3(-90, 0, 0), true, false);
		// // camera.orthographic = true;
  //       //正交垂直矩阵距离,控制3D物体远近与显示大小
  //       // camera.orthographicVerticalSize = 60;
  //       // camera.enableHDR = true; //关闭HDR
  //       utl.camera = camera
        
		//方向光
		var directionLight = new Laya.DirectionLight();
		this.newScene.addChild(directionLight);
		directionLight.color = new Laya.Vector3(0, 0, 0);
		//设置平行光的方向
		var mat = directionLight.transform.worldMatrix;
		mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
		directionLight.transform.worldMatrix=mat;
		
		//平面
		var plane = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(-100, -100, 100, 100)));
		var planeMat = new Laya.BlinnPhongMaterial();
		Laya.Texture2D.load("res/grass.png", Laya.Handler.create(this, function(tex) {
			planeMat.albedoTexture = tex;
		}));
		//设置纹理平铺和偏移
		var tilingOffset = planeMat.tilingOffset;
		tilingOffset.setValue(5, 5, 0, 0);
		planeMat.tilingOffset = tilingOffset;
		//设置材质
		plane.meshRenderer.material = planeMat;
		
		//平面添加物理碰撞体组件
		var planeStaticCollider = plane.addComponent(Laya.PhysicsCollider);
		//创建盒子形状碰撞器
		var planeShape = new Laya.BoxColliderShape(10, 0, 10);
		//物理碰撞体设置形状
		planeStaticCollider.colliderShape = planeShape;
		//物理碰撞体设置摩擦力
		planeStaticCollider.friction = 2;
		//物理碰撞体设置弹力
		planeStaticCollider.restitution = 0.3;
        Laya.timer.loop(30,this,this.onUpdate);

        var sfe = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1)));
        var material = new Laya.BlinnPhongMaterial();
        sfe.transform.position = new Laya.Vector3(1,20, 3);
        Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(null, function(tex) {
                material.albedoTexture = tex;
        }));
        sfe.meshRenderer.material = material;
       
        Laya.Sprite3D.load("https://xuxin.love/img/fly/LayaScene/Conventional/Directional Light.lh", Laya.Handler.create(null, (sp)=> {
            let layaMonkey1 = this.newScene.addChild(sp);
            
        }));
        
      
        Laya.Sprite3D.load("https://xuxin.love/img/fly/LayaScene/Conventional/pler.lh", Laya.Handler.create(null, (sp)=> {
            utl.box = this.newScene.addChild(sp);
        }));
        
        utl.box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, .5,.8)));
        var material = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(null, function(tex) {
                material.albedoTexture = tex;
        }));
        utl.box4.meshRenderer.material = material;
        
       
        this.createBall()
        // let obj = this.getChildByName('eee')
        // obj.visible = false
        // console.log(obj)
       
          
    }
    createBall(){
        for(let z =1;z<10;z++){
            for(let i =-10;i<10;i++){
                for(let l =-10;l<10;l++){
                    let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1,1)));
                    // box4.transform.rotate(new Laya.Vector3(2 * Math.PI / 180,0, 10 * Math.PI / 180), true, true);
                    let material1 = new Laya.BlinnPhongMaterial();
                    box4.meshRenderer.material = material1;
                    box4.transform.position =new Laya.Vector3(i*40,l*40,z*40)
                }
            }
        }
    }
    flying(touchCount){
        this.info.text = touchCount
        // let touchCount = this.scene.input.touchCount();
        if (1 === touchCount){
            //判断是否为两指触控，撤去一根手指后引发的touchCount===1
            if(this.isTwoTouch){
                return;
            }
            let touch = this.newScene.input.getTouch(0);
            if(this.newTouch.scaleSmall(touch.position.x,touch.position.y)){
                this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y)
            }

            if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y)
            }
            
        }
        else if (2 === touchCount){
            this.isTwoTouch = true;
            //获取两个触碰点
            let touch = this.newScene.input.getTouch(0);
            let touch2 = this.newScene.input.getTouch(1);
            //是否为新一次触碰，并未发生移动
            if (this.twoFirst){
                //获取触碰点的位置
                // this.disVector1.x = touch.position.x - touch2.position.x;
                // this.disVector1.y = touch.position.y - touch2.position.y;
                // this.distance = Laya.Vector2.scalarLength(this.disVector1);
                // this.sprite3DSacle = this.owner.transform.scale;
                this.twoFirst = false;

            }
            else{
                if(this.newTouch.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y)
                }
                if(this.newTouch.scaleSmall(touch2.position.x,touch2.position.y)){
                    this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y)
                }

                if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y)
                }
                if(this.newTor.scaleSmall(touch2.position.x,touch2.position.y)){
                    this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y)
                }
                // this.disVector2.x = touch.position.x - touch2.position.x;
                // this.disVector2.y = touch.position.y - touch2.position.y;
                // let distance2 = Laya.Vector2.scalarLength(this.disVector2);
                // //根据移动的距离进行缩放
                // let factor =  0.001 * (distance2 - this.distance);
                // this.sprite3DSacle.x += factor;
                // this.sprite3DSacle.y += factor;
                // this.sprite3DSacle.z += factor;
                // this.owner.transform.scale = this.sprite3DSacle;
                // this.distance = distance2;
            }   
        }
        else if (0 === touchCount){
            // this.text.text = "触控点归零";
            this.first = true;
            this.twoFirst = true;
            // this.lastPosition.x = 0;
            // this.lastPosition.y = 0;
            this.isTwoTouch = false;
            utl.takeSpeed.x = 0
            utl.takeSpeed.y = 0
        }

    }
    
    onUpdate() {
        let touchCount = this.newScene.input.touchCount();
        
        this.flying(touchCount)
        // return
        
        if(utl.box){
            let ship = utl.box.getChildByName('shipmain')
            let camera = ship.getChildByName('Main Camera')
            let shipcar = ship.getChildByName('ship')
            if(utl.takeSpeed.x!=utl.speed.x){
                 if(Math.abs(utl.takeSpeed.x-utl.speed.x)>1){
                    utl.speed.x = utl.takeSpeed.x>utl.speed.x?utl.speed.x+1:utl.speed.x-1
                }
            }
            if(utl.takeSpeed.y!=utl.speed.y){
                if(Math.abs(utl.takeSpeed.y-utl.speed.y)>1){
                    utl.speed.y = utl.takeSpeed.y>utl.speed.y?utl.speed.y+1:utl.speed.y-1
                }
            }
           
                let x = Math.floor(utl.speed.x)        
                let y = Math.floor(utl.speed.y)

                // let z = utl.speed.z*90/100
           
            // console.log(utl.box.transform.rotation.x)
                
            let tz = Math.cos(Math.PI/180*ship.transform.rotationEuler.x)*utl.speedMove
            let tx = Math.sin(Math.PI/180*ship.transform.rotationEuler.y)*utl.speedMove
            let ty = Math.sin(Math.PI/180*ship.transform.rotationEuler.x)*utl.speedMove

            // this.info.text = x+','+y
           
           
            // ship.transform.rotate(new Laya.Vector3(this.temprx* Math.PI / 180,0,0),true);
            let ry = (y - this.tempry)
            let rx = (x - this.temprx)
            let sy = y/20
            let sx = -x/20

            ship.transform.rotate(new Laya.Vector3(0,sy* Math.PI / 180,0),true);
            ship.transform.rotate(new Laya.Vector3(sx* Math.PI / 180,0,0),true);


            // shipcar.transform.rotate(new Laya.Vector3(0,-rx* Math.PI / 180,0),true);
            // shipcar.transform.rotate(new Laya.Vector3(-ry* Math.PI / 180,0,0),true);



            
            shipcar.transform.rotate(new Laya.Vector3(this.tempry* Math.PI / 180,0,0),true);
            shipcar.transform.rotate(new Laya.Vector3(0, this.temprx* Math.PI / 180,0),true);
            shipcar.transform.rotate(new Laya.Vector3(0,-x* Math.PI / 180,0),true);

            
            shipcar.transform.rotate(new Laya.Vector3(-y* Math.PI / 180,0,0),true);


            // shipcar.transform.rotation =  (new Laya.Vector3(-90,90,0),true)
            // shipcar.transform.rotate(new Laya.Vector3(-ry* Math.PI / 180,0,0),true);


            // ship.transform.rotate(new Laya.Vector3(0,0,-x* Math.PI / 180),true);
             let temp = ship.transform

            
            // ship.transform.rotation =  new Laya.Vector3(-x* Math.PI / 180,temp.rotation.y,temp.rotation.z)

            // camera.transform.rotate(new Laya.Vector3(0,0,-y* Math.PI / 180),true);

            // if(Math.abs(this.shipRx)<45){
            //      this.shipRx += x
            //      shipcar.transform.rotate(new Laya.Vector3(x* Math.PI / 180,0,0),true);
            // }
            
            // shipcar.transform.rotate(new Laya.Vector3(-x* Math.PI / 180,0,0),true);
            // ship.transform.rotate(new Laya.Vector3(0,0,this.tempry* Math.PI / 180),true);
            
            this.shipRy = 0


            // ship.transform.rotation =  new Laya.Vector3(-x* Math.PI / 180,temp.rotation.y,temp.rotation.z)
            // utl.box.transform.rotate(new Laya.Vector3(0,0,y* Math.PI / 180),false);
            // utl.box.transform.rotate(new Laya.Vector3(y* Math.PI / 180,0,0),true);
            ship.transform.translate(new Laya.Vector3(0,0,utl.speedMove*3),true)
            // camera.transform.translate(new Laya.Vector3(0,-ty,tz))
            this.temprx = x
            this.tempry = y
            // if(this.temprx>70){
            //     ship.transform.rotate(new Laya.Vector3(x* Math.PI / 180,0,0),true);
            //     this.temprx -= x
            // }
        }
        
    }
   
    creabox(py){
        for(let i=0;i<2;i++){
            for(let l=0;l<2;l++){
                let box5 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1,1,1)));
                box5.transform.rotate(new Laya.Vector3(2 * Math.PI / 180,0, 10 * Math.PI / 180), true, true);
                let material1 = new Laya.BlinnPhongMaterial();
                 box5.transform.position = new Laya.Vector3(l,py+3, i);
               
                let bg = box5.addComponent(Laya.Rigidbody3D);
                //创建盒子形状碰撞器
                let boxShape1 = new Laya.BoxColliderShape(1, 1,1);
                //设置盒子的碰撞形状
                bg.colliderShape = boxShape1;
                //设置刚体的质量
                bg.friction = 2;
                //物理碰撞体设置弹力
                bg.restitution = 0.3;
                bg.mass = 10;

            }
        }
        
    }
    creab(){
        for(let f=0;f<2;f++){
            this.creabox(f)
        }
    }
    
}
class BoxMove extends Laya.Script3D { 
constructor() {
super();
}
onStart() {console.log("3333");}

onTriggerEnter()
{
    utl.entity.get('obx').removeSelf();
    temp.creab()
console.log("onTriggerEnter");
}
onTriggerStay()
{
console.log("onTriggerStay");
}
onTriggerExit()
{
console.log("onTriggerExit");
}
onEnable() {
} 
onDisable() {
}
}
class BoxMove3 extends Laya.Script3D { 
constructor() {
super();
}
onStart() {console.log("3333");}

onTriggerEnter()
{
console.log("onTriggerEnter3");
}
onTriggerStay()
{
console.log("onTriggerStay3");
}
onTriggerExit()
{
console.log("onTriggerExit3");
}
onEnable() {
} 
onDisable() {
}
}