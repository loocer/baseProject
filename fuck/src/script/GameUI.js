/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
  import utl from "./utl.js"
  import newTouch from "./hander/newTouch.js"
  import newTor from "./hander/newTor.js"
  import {getServiceAddress} from "./net/index"
  let temp =null,spled = {x:0,y:0,z:0},dfew=0
export default class GameUI extends Laya.Scene {
    constructor() {
        getServiceAddress()
        super();
        this.isTwoTouch = false
        this.twoFirst = true
        this.temprx=0
        this.tempry=0
        this.temprz=0
        this.spled = 0
        this.newTouch = new newTouch()
        this.newTor = new newTor()
        this.spledy=0
		this.loadScene("test/TestScene.scene");

		this.newScene = Laya.stage.addChild(new Laya.Scene3D());
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
		directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
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
        this.creaPlayer()
        
        Laya.timer.loop(30,this,this.onUpdate);

        var sfe = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1)));
        var material = new Laya.BlinnPhongMaterial();
        sfe.transform.position = new Laya.Vector3(1,20, 3);
        Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(null, function(tex) {
                material.albedoTexture = tex;
        }));
        sfe.meshRenderer.material = material;
        this.createBug()
        // this.creab()
        // let df1 = Laya.Sprite3D.load("res/test/xidf.lh")
        // let layaMonkey = this.newScene.addChild(df1);
        // console.log(layaMonkey,df1)
        Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/Directional Light.lh", Laya.Handler.create(null, (sp)=> {
            let layaMonkey1 = this.newScene.addChild(sp);
            // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
        }));
        
        // Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/Main Camera.lh", Laya.Handler.create(null, (sp)=> {
        //     // var layaMonkey2 = this.newScene.addChild(sp);
        //     utl.camera = sp
        //     utl.camera.transform.rotate(new Laya.Vector3(0,-90* Math.PI / 180, 0), true);
        //     utl.camera.transform.position =new Laya.Vector3(0,0,0)
        //      // utl.camera.transform.position =new Laya.Vector3(0,1,3)
        //     // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
        // }));
        this.createBall()
         
    }
    createBall(){
        for(let z =1;z<10;z++){
            for(let i =-10;i<10;i++){
                for(let l =-10;l<10;l++){
                    let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.1, .1,.1)));
                    // box4.transform.rotate(new Laya.Vector3(2 * Math.PI / 180,0, 10 * Math.PI / 180), true, true);
                    let material1 = new Laya.BlinnPhongMaterial();
                    box4.meshRenderer.material = material1;
                    box4.transform.position =new Laya.Vector3(i*5,l*5,z*5)
                }
            }
        }
    }
    flying(touchCount){
        // let touchCount = this.scene.input.touchCount();
        if (1 === touchCount){
            //判断是否为两指触控，撤去一根手指后引发的touchCount===1
            if(this.isTwoTouch){
                return;
            }
            // // this.text.text = "触控点为1";
            // //获取当前的触控点，数量为1
            // let touch =  this.newScene.input.getTouch(0);
            // //是否为新一次触碰，并未发生移动
            // if (this.first){
            //     //获取触碰点的位置
            //     this.lastPosition.x = touch._position.x;
            //     this.lastPosition.y = touch._position.y;
            //     this.first = false;
            // }
            // else{
            //     //移动触碰点
            //     let deltaY = touch._position.y - this.lastPosition.y;
            //     let deltaX = touch._position.x - this.lastPosition.x;
            //     this.lastPosition.x = touch._position.x;
            //     this.lastPosition.y = touch._position.y;
            //     //根据移动的距离进行旋转
            //     this.rotate.setValue(1 * deltaY /2, 1 * deltaX / 2, 0);
            //     this.owner.transform.rotate(this.rotate, true, false);
            // }
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
        }

    }
    onUpdate() {
        let touchCount = this.newScene.input.touchCount();
        this.flying(touchCount)
        if(utl.box){
            
            if(utl.takeSpeed.x!=utl.speed.x){
                utl.takeSpeed.x>utl.speed.x?utl.speed.x+=.02:utl.speed.x-=0.02
                if(utl.takeSpeed.x==0&&utl.speed.x<0.02&&utl.speed.x>-0.02){
                    utl.speed.x=0
                }
            }
            if(utl.takeSpeed.y!=utl.speed.y){
                utl.takeSpeed.y>utl.speed.y?utl.speed.y+=.02:utl.speed.y-=.02
                if(utl.takeSpeed.y==0&&utl.speed.y<0.02&&utl.speed.y>-0.02){
                    utl.speed.y=0
                }
            }
            if(utl.takeSpeed.z!=utl.speed.z){
                utl.takeSpeed.z>utl.speed.z?utl.speed.z+=.02:utl.speed.z-=.02
                if(utl.takeSpeed.z==0&&utl.speed.z<0.02&&utl.speed.z>-0.02){
                    utl.speed.z=0
                }
            }
                let x = utl.speed.x*90/100
                let y = utl.speed.y*90/100
                let z = utl.speed.z*90/100
           
            // console.log(utl.box.transform.rotation.x)
                
            let tz = Math.cos(Math.PI/180*utl.box.transform.rotationEuler.y)*utl.speedMove
            let tx = Math.sin(Math.PI/180*utl.box.transform.rotationEuler.y)*utl.speedMove
            let ty = Math.sin(Math.PI/180*utl.box.transform.rotationEuler.x)*utl.speedMove
            // utl.box.transform.translate(new Laya.Vector3(tx,-ty,tz),false)
            let temp = utl.box.transform.position
            // utl.box.transform.position =new Laya.Vector3(temp.x+tx,temp.y-ty,temp.z+tz)
            
            utl.socket&&utl.socket.emit('123', {
                    rotation:{x,y,z},
                    position:{x:temp.x+tx,y:temp.y-ty,z:temp.z+tz}
                  })   


            // console.log(utl.box.getChildByName('carmer').transform.position)
            // console.log(utl.box.getChildByName('carmer').transform.rotationEuler)
            // let p =utl.box.getChildByName('carmer').transform.position
            // let r =utl.box.getChildByName('carmer').transform.rotationEuler
            // utl.camera.transform.position = new Laya.Vector3(p.x,p.y,p.z)
            // utl.camera.transform.rotate(new Laya.Vector3(-spled.x* Math.PI / 180,-spled.y* Math.PI / 180,-spled.z* Math.PI / 180),true)
            // utl.camera.transform.rotate(new Laya.Vector3(r.x* Math.PI / 180,r.y* Math.PI / 180,r.z* Math.PI / 180),true)
            // spled = r




            // let ps = utl.box.transform.position
            // let cps = utl.camera.transform.position
//             let fuck = utl.speed.x*90
//              let fuck1 = utl.takeSpeed.x *90/100
//             let love = -5

//             let jiaodu = Math.PI/180*utl.box.transform.rotationEuler.z / 100
//                 // utl.box.transform.rotate(new Laya.Vector3(0,0,this.spled* Math.PI / 180,0),true);
//                 // utl.box.transform.rotate(new Laya.Vector3(0,0,-fuck* Math.PI / 180),true);
                          



// // utl.box.transform.rotate(new Laya.Vector3(this.spledy* Math.PI / 180,0,0),true);

//                 utl.box.transform.rotate(new Laya.Vector3(-1* Math.PI / 180,0,0),true);
//             utl.box.transform.rotate(new Laya.Vector3(0,1* Math.PI / 180,0), false,true);
//             console.log(this.spled,fuck)
            
//             let ty = Math.sin(Math.PI/180*utl.box.transform.rotationEuler.y)*utl.speedMove
//             let tz = Math.cos(Math.PI/180*utl.box.transform.rotationEuler.y)*utl.speedMove
//             let tx = Math.sin(Math.PI/180*utl.box.transform.rotationEuler.x)*utl.speedMove
//             // spled+=tx
           
//             utl.box.transform.translate(new Laya.Vector3(-ty,0,-tz),false)
//             utl.camera.transform.translate(new Laya.Vector3(-ty,0,-tz),false)
//             this.spled = utl.speed.x*90
//             spled = -fuck* Math.PI / 180
//             this.spledy =  -5
        }
        
    }
    createBug(){
        // let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(2, 2,2)));
        // box4.transform.position =new Laya.Vector3(0,3,0)
       
        // let boxBody = box4.addComponent(Laya.Rigidbody3D);
        // //创建盒子形状碰撞器
        // let boxShape1 = new Laya.BoxColliderShape(2, 2,2);
        // //设置盒子的碰撞形状
        // boxBody.colliderShape = boxShape1;
        // // boxBody.mass = 0; 
        // boxBody.isKinematic = true;
        // boxBody.gravity =  new Laya.Vector3(0,0,0)
        // boxBody.isTrigger = true;
        // box4.addComponent(BoxMove);
        // utl.entity.set('obx',box4)
        // Laya.Sprite3D.load("res/test/w.lh", Laya.Handler.create(null, (sp)=> {
        //     let layaMonkey1 = this.newScene.addChild(sp);
        //     utl.entity.set('obx',layaMonkey1)
        //     console.log(layaMonkey1,sp)
        // }));
    }
    creaPlayer(){
        // let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(3, 2,3)));
        // // box4.transform.rotate(new Laya.Vector3(2 * Math.PI / 180,0, 10 * Math.PI / 180), true, true);
        // let material1 = new Laya.BlinnPhongMaterial();
        // Laya.Texture2D.load("res/atlas/comp.png", Laya.Handler.create(null, function(tex) {
        //         material1.albedoTexture = tex;
        // }));
        // box4.meshRenderer.material = material1;
        // box4.transform.position =new Laya.Vector3(0,0,0)
       // box4.transform.rotate(new Laya.Vector3(0,0,-45* Math.PI / 180), true);
        // let boxBody = box4.addComponent(Laya.Rigidbody3D);
        // //创建盒子形状碰撞器
        // let boxShape1 = new Laya.BoxColliderShape(1, 2,3);
        // //设置盒子的碰撞形状
        // boxBody.colliderShape = boxShape1;
        // //设置刚体的质量
        // boxBody.friction = 2;
        // //物理碰撞体设置弹力
        // boxBody.restitution = 0.3;
        // boxBody.isKinematic = true;
        // boxBody.gravity =  new Laya.Vector3(0,0,0)
        // // boxBody.mass = 0;
        // box4.addComponent(BoxMove3);
         // utl.box = box4
        Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/f.lh", Laya.Handler.create(null, (sp)=> {
            let layaMonkey1 = this.newScene.addChild(sp);
            layaMonkey1.transform.position =new Laya.Vector3(0,3,0)
            // layaMonkey1.transform.rotate(new Laya.Vector3(90* Math.PI / 180,0, 0), true);
            utl.box = layaMonkey1
            
             
             // utl.box.getChildByName('Box001').addChild(utl.camera);
            // layaMonkey1.linkSprite3DToAvatarNode("Box001",utl.camera);
            // console.log(layaMonkey1,sp)
            // utl.ani = layaMonkey1.getComponent(Laya.Animator);
            // //创建一个动画动作状态
            // var state1 = new Laya.AnimatorState();
            // //设置动作状态的名称
            // state1.name = "hello";
            // //设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
            // state1.clipStart = 0/45;
            // //设置动作状态播放的结束时间
            // state1.clipEnd = 45/45;
            // //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
            // state1.clip = utl.ani.getDefaultState().clip;
            // //动画播放是否循环
            // state1.clip.islooping = true;
            // //添加动画状态到动画组件里
            // utl.ani.addState(state1);
            //播放动画
            
        }));
         // utl.fds = this.creab
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