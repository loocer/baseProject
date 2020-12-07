(function () {
    'use strict';

    var utl = {
    	tachLeftFlag:false,//左边点击
    	tachRightFlag:false,//左边点击
    	box:null,
    	moveX:0,
    	rote:0,
        moveY:0,
        do:{},
        userId:Date.parse(new  Date())+'',
        players:new Map(),
        box4:null,
        doposition:{
            z:0,
            x:0,
            y:0
        },
        speedMove:.04,
        speed:{
        	z:0,
        	x:0,
        	y:0
        },
        walkingDirection:1,//1：up,2:down,3:left,4:right
        netPlayers:null,
        takeSpeed:{
        	z:0,
        	x:0,
        	y:0
        },
        ani:null,
        entity:new Map()
    };

    let temp = 0;
    class newtach{
        constructor(){
                
                this.scaleTime = 100;
                this.width = Laya.stage.width/2; 
                this.height = Laya.stage.height;
                 this.x = 0;
                this.y = 0;
                this.moveX = 0;
                this.moveY = 0;
                this.tx=300;
                this.twidth = 300;
                this.theight = 300;
                this.ty = Laya.stage.height - 200;
                this.flag = false;
                console.log(this.maind);
            }
            outEvent(){
              utl.tachLeftFlag = false;
            }
           scaleBig(e)
            {        
                console.log('MOUSE_UP');
                utl.tachLeftFlag = false;
                //变大还原的缓动效果
                utl.moveX = 0;
                utl.moveY = 0;
                utl.takeSpeed.x = 0;
                utl.takeSpeed.y = 0;
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
              let rotate = 0;
              if (pobj.x1 == pobj.x2){
                rotate=0;
              }
              if (pobj.x1 > pobj.x2) {
                let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
                rotate =~~(Math.atan(atanrotate) / Math.PI * 180) + 90;
              } else if (pobj.x1 < pobj.x2) {
                let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
                rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270;
              }
              return  360 -( rotate - 90)
            }
            leftFormatMovePosition(px,py) {
              
              // utl.ani.play("hello");
              let pobj = {};
              pobj.x1 = px; //点击
              pobj.x2 =this.tx; 
              pobj.y1 = py;
              pobj.y2 = this.ty; 

              
              let rote = this.getRoteImg(pobj) % 360;
              // utl.camera.transform.rotate(new Laya.Vector3(0, -temp* Math.PI / 180, 0), false);
              // utl.camera.transform.rotate(new Laya.Vector3(0, utl.rote* Math.PI / 180, 0), false);
              if(45<rote&&rote<135){//w
                  utl.cubec.transform.translate(new Laya.Vector3(0,-.03,0),true);
                  let tempP = utl.cubec.transform.position;
                  let y = utl.camera.transform.position.y;
                  utl.camera.transform.position =  new Laya.Vector3(tempP.x,y,tempP.z);
                  console.log(tempP);
                  // utl.camera.transform.translate(new Laya.Vector3(0,0,.03),false)
              }
              if(135<rote&&rote<225){//a
                  utl.cubec.transform.translate(new Laya.Vector3(0.01,0,0),true);
                  let tempP = utl.cubec.transform.position;
                  let y = utl.camera.transform.position.y;
                  utl.camera.transform.position =  new Laya.Vector3(tempP.x,y,tempP.z);
              }
              if(225<rote&&rote<315){//s
                  utl.cubec.transform.translate(new Laya.Vector3(0,.03,0),true);
                  let tempP = utl.cubec.transform.position;
                  let y = utl.camera.transform.position.y;
                  utl.camera.transform.position =  new Laya.Vector3(tempP.x,y,tempP.z);
              }
              if(rote<45||rote>315){//d
                  utl.cubec.transform.translate(new Laya.Vector3(-0.01,0,0),true);
                  let tempP = utl.cubec.transform.position;
                  let y = utl.camera.transform.position.y;
                  utl.camera.transform.position =  new Laya.Vector3(tempP.x,y,tempP.z);
              }
              // utl.camera.transform.rotation =  new Laya.Vector3(0,utl.rote* Math.PI / 180,0)
              // tools.getRoteImg(pobj, databus.leftPositions)
              // let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
              // utl.moveX = (pobj.x1 - pobj.x2) * r /10
              // utl.moveY = (pobj.y1 - pobj.y2) * r/10
              // utl.box.transform.rotate(new Laya.Vector3(0, -utl.rote* Math.PI / 180, 0), true);
            }
    }

    let temp$1 = 0;
    class newTwo{
        constructor(){
                this.scaleTime = 100;
                this.width = 300;
                this.height = 300;
               this.x = Laya.stage.width - 350;
                this.y = Laya.stage.height - 350;
                this.moveX = 0;
                this.moveY = 0;
                this.tx=Laya.stage.width - 350+150;
                this.twidth = 300;
                this.theight = 300;
                this.ty = Laya.stage.height - 350+ 150;
                this.flag = false;
                console.log(this.maind);
                
              
            }
           scaleBig(e)
            {        
                utl.takeSpeed.z = 0;
                console.log('MOUSE_UP');
                utl.tachRightFlag = false;
                // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
            }
            outEvent(){
              utl.tachRightFlag = false;
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
              let rotate = 0;
              if (pobj.x1 == pobj.x2){
                rotate=0;
              }
              if (pobj.x1 > pobj.x2) {
                let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
                rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90;
              } else if (pobj.x1 < pobj.x2) {
                let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
                rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270;
              }
              return 360 - rotate 
            }
            leftFormatMovePosition(px,py) {
             
              let pobj = {};
              pobj.x1 = px; //点击
              pobj.x2 =this.tx; 
              pobj.y1 = py;
              pobj.y2 = this.ty; 

              
              utl.rote = this.getRoteImg(pobj); 
              console.log(utl.rote);
              utl.cubec.transform.rotate(new Laya.Vector3(0, -temp$1* Math.PI / 180, 0), false);
              utl.cubec.transform.rotate(new Laya.Vector3(0, utl.rote* Math.PI / 180, 0), false);
              temp$1 = utl.rote;
            }

    }

    let address = 'http://172.16.25.101:3000';
    let HttpRequest = Laya.HttpRequest;
    let Event       = Laya.Event;
    let result = {};
    let temfe = {
    	x:1
    };
    const login = ()=>
    {	
    	let obj = {};
    	let hr = new HttpRequest();
    	let id = utl.userId;
    	// let id = 435
    	function onHttpRequestProgress(e){
    		console.log(e);
    	}
    	function onHttpRequestComplete(e){
    		result.userInfo = JSON.parse(hr.data).data;
    		console.log(66666,result);
    		intoRoom();
    	}
    	function onHttpRequestError(e){
    		console.log(e);
    	}
    	
    	hr.once(Event.PROGRESS, undefined, onHttpRequestProgress);
    	hr.once(Event.COMPLETE, undefined, onHttpRequestComplete);
    	hr.once(Event.ERROR, undefined, onHttpRequestError);
    	hr.send(address+'/login', 'name=fef&id='+id, 'post', 'text');
    	
    };
    const getServiceAddress = ()=>
    {
    	let hr = new HttpRequest();
    	function onHttpRequestProgress(e){
    		console.log(123);
    	}
    	function onHttpRequestComplete(e){
    		result.serviceAddress = JSON.parse(hr.data).data;
    		login();
    		console.log(3458888,result);
    	}
    	function onHttpRequestError(e){
    		console.log(534543,e);
    	}
    	hr.once(Event.PROGRESS, undefined, onHttpRequestProgress);
    	hr.once(Event.COMPLETE, undefined, onHttpRequestComplete);
    	hr.once(Event.ERROR, undefined, onHttpRequestError);
    	hr.send(address+'/get-socketAddress', '', 'get', 'text');
    	
    };
    const intoRoom = ()=>
    {
    	// Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/f.lh", Laya.Handler.create(null, (sp)=> {
     //            let layaMonkey1 = utl.newScene.addChild(sp);
     //            layaMonkey1.transform.position =new Laya.Vector3(0,3,0)
     //            // layaMonkey1.transform.rotate(new Laya.Vector3(90* Math.PI / 180,0, 0), true);
     //            utl.box = layaMonkey1
     //            utl.players.set(utl.userId,layaMonkey1)
                
     //    }));
    	let headers = [
    		"Content-Type", "application/x-www-form-urlencoded",
    		'token', result.userInfo.token,
    		'user_id',result.userInfo.id
    	];
    	let hr = new HttpRequest();
    	function onHttpRequestProgress(e){
    		console.log(123);
    	}
    	function onHttpRequestComplete(e){
    		socketMain();
    		console.log(888888888,hr);
    	}
    	function onHttpRequestError(e){
    		console.log(534543,e);
    	}
    	hr.once(Event.PROGRESS, undefined, onHttpRequestProgress);
    	hr.once(Event.COMPLETE, undefined, onHttpRequestComplete);
    	hr.once(Event.ERROR, undefined, onHttpRequestError);
    	hr.send(address+'/into-room?roomNo=123', null, 'get', 'text',headers);
    	
    };
    const socketMain = ()=>
    {
     // 	let byte = new Laya.Byte();
     // 	let socket = new Laya.Socket();
     // 	function openHandler(e){
    	// 	console.log(123)
    	// }
    	// function receiveHandler(e){
    	// 	console.log(888888888,hr)
    	// }
    	// function closeHandler(e){
    	// 	console.log(534543,e)
    	// }
    	// function errorHandler(e){
    	// 	console.log(534543,e)
    	// }
     //    //这里我们采用小端
     //   	socket.endian = Laya.Byte.LITTLE_ENDIAN;
     //        //建立连接
     //    socket.connectByUrl(result.serviceAddress);
     //    socket.on(Laya.Event.OPEN, this, openHandler);
     //    socket.on(Laya.Event.MESSAGE, this, receiveHandler);
     //    socket.on(Laya.Event.CLOSE, this, closeHandler);
     //    socket.on(Laya.Event.ERROR, this, errorHandler);
    	utl.socket = io(result.serviceAddress);
    	utl.socket.on('main_update', (s) => {
    		return
    		setBox(s.players);
        });
        utl.socket.on('event', function (data) { });
        utl.socket.on('disconnect', function () { });
    };
    const creteBox = (sp,erd)=>{
    	let box = utl.newScene.addChild(sp); 
        box.takeSpeed = erd.takeSpeed;
    	box.speed = {
        	z:0,
        	x:0,
        	y:0
        };
    	if(erd.rotation){
    		box.transform.rotation =  new Laya.Vector3(erd.rotation.x,erd.rotation.y,erd.rotation.z);
    	}
    	if(erd.position){
    		box.transform.position = new Laya.Vector3(erd.position.x,erd.position.y,erd.position.z);
    	}

    	// utl.newScene.addChild(box)
    	utl.players.set(erd.id,box);
    };
    const setBox = (players)=>{
    	let ps = new Map(players);
    	utl.netPlayers = ps;
    	let bs = utl.players;
    	if(utl.newScene){
    		for(let k  of ps.keys()){
    			let now = bs.get(k);
    			let erd = ps.get(k);
    			
    			if(now){
    				now.takeSpeed = erd.takeSpeed;
    			}else{
    				if(erd.id==utl.userId){
    					// Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/f.lh", Laya.Handler.create(null, (sp)=> {
    			  //      		creteBox(sp,erd)
    			  //   	}));
    				}
    				else{
    					let box4 = utl.box4.clone();
    			     	creteBox(box4,erd);
    				}
    			    
    			}
    		}
    		// utl.box.transform.rotate(new Laya.Vector3(0,0,-obj.rotation.z* Math.PI / 180),true);
      //       utl.box.transform.rotate(new Laya.Vector3(0,-obj.rotation.x* Math.PI / 180,0),true);
      // //       utl.box.transform.rotate(new Laya.Vector3(obj.rotation.y* Math.PI / 180,0,0),true);
      //       utl.box.transform.rotation = new Laya.Vector3(obj.rotation.x,obj.rotation.y,obj.rotation.z)
    		// utl.box.transform.position = new Laya.Vector3(obj.position.x,obj.position.y,obj.position.z)
    		// Laya.Tween.to( utl.doposition,{x:obj.position.x,y:obj.position.y,z:obj.position.z}, 200,null,Laya.Handler.create(this,()=>{
      //           }));
    	}
    	
    };

    /**
     * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
     * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
     * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
     */
      let temp$2 =null,spled = {x:0,y:0,z:0},dfew=0;
    class GameUI extends Laya.Scene {
        constructor() {
            
            super();
            this.isTwoTouch = false;
            this.twoFirst = true;
            this.temprx=0;
            this.tempry=0;
            this.temprz=0;
            this.spled = 0;
            
            this.spledy=0;
    		this.loadScene("test/TestScene.scene");

    		this.newScene = Laya.stage.addChild(new Laya.Scene3D());
            utl.newScene = this.newScene;
    		temp$2 = this;
            // getServiceAddress()
    		//初始化照相机
    		// var camera = this.newScene.addChild(new Laya.Camera(0, 0.1, 100));
    		// camera.transform.translate(new Laya.Vector3(0, 100, 0));
    		// camera.transform.rotate(new Laya.Vector3(-90, 0, 0), true, false);
    		// // camera.orthographic = true;
      //       //正交垂直矩阵距离,控制3D物体远近与显示大小
      //       // camera.orthographicVerticalSize = 60;
      //       // camera.enableHDR = true; //关闭HDR
      //       utl.camera = camera
            
    	
    		let directionLight = new Laya.DirectionLight();
    		this.newScene.addChild(directionLight);
    		directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.transform.rotate(new Laya.Vector3(0, 90* Math.PI / 180, 0));
    		//设置平行光的方向
            // directionLight.transform.position = new Laya.Vector3(0, 10, 0)
    		let mat = directionLight.transform.worldMatrix;
    		mat.setForward(new Laya.Vector3(-0.02, -.2, -.02));
    		directionLight.transform.worldMatrix=mat;
    		directionLight.shadowMode = Laya.ShadowMode.SoftLow;
            // Set shadow max distance from camera.
            directionLight.shadowDistance = 5;
            // Set shadow resolution.
            directionLight.shadowStrength = .3;
            directionLight.shadowResolution = 1024;
            // Set shadow cascade mode.
            directionLight.shadowCascadesMode = Laya.ShadowCascadesMode.NoCascades;
    		// //平面
                //  var plane = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(-100, -100, 100, 100)));
                // var planeMat = new Laya.BlinnPhongMaterial();
                // Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(this, function(tex) {
                //     planeMat.albedoTexture = tex;
                // }));
                //设置纹理平铺和偏移
                // var tilingOffset = planeMat.tilingOffset;
                // tilingOffset.setValue(5, 5, 0, 0);
                // planeMat.tilingOffset = tilingOffset;
                //设置材质
                // plane.meshRenderer.material = planeMat;
                // plane.meshRenderer.receiveShadow = true;
                // let sphereSprite = this.addPBRSphere(Laya.PrimitiveMesh.createSphere(0.5), new Laya.Vector3(0, 0.2, 0.5), this.newScene);
                // sphereSprite.meshRenderer.castShadow = true;
                // sphereSprite.meshRenderer.receiveShadow = true;
    		
    		// //平面添加物理碰撞体组件
    		// var planeStaticCollider = plane.addComponent(Laya.PhysicsCollider);
    		// //创建盒子形状碰撞器
    		// var planeShape = new Laya.BoxColliderShape(10, 0, 10);
    		// //物理碰撞体设置形状
    		// planeStaticCollider.colliderShape = planeShape;
    		// //物理碰撞体设置摩擦力
    		// planeStaticCollider.friction = 2;
    		// //物理碰撞体设置弹力
    		// planeStaticCollider.restitution = 0.3;
      //       this.creaPlayer()
            
            // Laya.timer.loop(30,this,this.onUpdate);

            // var sfe = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1)));
            // var material = new Laya.BlinnPhongMaterial();
            // sfe.transform.position = new Laya.Vector3(1,20, 3);
            // Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(null, function(tex) {
            //         material.albedoTexture = tex;
            // }));
            // sfe.meshRenderer.material = material;
            // this.createBug()
            // this.creab()
            // let df1 = Laya.Sprite3D.load("res/test/xidf.lh")
            // let layaMonkey = this.newScene.addChild(df1);
            // console.log(layaMonkey,df1)
            
            // Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/Directional Light.lh", Laya.Handler.create(null, (sp)=> {
            //     let directionLight = this.newScene.addChild(sp);
            //     directionLight.shadowMode = Laya.ShadowMode.SoftLow;
            //     // Set shadow max distance from camera.
            //     directionLight.shadowDistance = 3;
            //     // Set shadow resolution.
            //     directionLight.shadowResolution = 1024;
            //     // Set shadow cascade mode.
            //     directionLight.shadowCascadesMode = Laya.ShadowCascadesMode.NoCascades;

            //     var plane = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(-100, -100, 100, 100)));
            //     var planeMat = new Laya.BlinnPhongMaterial();
            //     Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(this, function(tex) {
            //         planeMat.albedoTexture = tex;
            //     }));
            //     //设置纹理平铺和偏移
            //     var tilingOffset = planeMat.tilingOffset;
            //     tilingOffset.setValue(5, 5, 0, 0);
            //     planeMat.tilingOffset = tilingOffset;
            //     //设置材质
            //     plane.meshRenderer.material = planeMat;
            //     plane.meshRenderer.receiveShadow = true;
            //     let sphereSprite = this.addPBRSphere(Laya.PrimitiveMesh.createSphere(0.1), new Laya.Vector3(0, 0.2, 0.5), this.newScene);
            //     sphereSprite.meshRenderer.castShadow = true;
            //     sphereSprite.meshRenderer.receiveShadow = true;
            //     // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
            // }));
            Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/Plane.lh", Laya.Handler.create(null, (sp)=> {
                this.newScene.addChild(sp);
                sp.meshRenderer.receiveShadow = true;
                // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
            }));
            Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/Camera.lh", Laya.Handler.create(null, (sp)=> {
                var layaMonkey2 = this.newScene.addChild(sp);
                utl.camera = sp;
                 // utl.camera.transform.position =new Laya.Vector3(0,1,3)
                // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
            }));
            // Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/cu.lh", Laya.Handler.create(null, (sp)=> {
            //     var layaMonkey2 = this.newScene.addChild(sp);
            //     utl.cubec = sp
            //     sp.addComponent(MonkeyScript);
            //      // utl.camera.transform.position =new Laya.Vector3(0,1,3)
            //     // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
            // }));
            Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/gs.lh", Laya.Handler.create(null, (sp)=> {
               let layaMonkey2 = this.newScene.addChild(sp);
               utl.cubec = sp;
               sp.addComponent(MonkeyScript);
                // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
            }));
            this.createBall();
            // Laya.timer.frameLoop(1, this, ()=>{
            //     utl.box&&(utl.box.transform.position = utl.doposition);
            //     // utl.do.rotation&&(utl.box.transform.rotation = utl.do.rotation);
            //  });
            // utl.box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, .5,.8)));
            // var material = new Laya.BlinnPhongMaterial();
            // Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(null, function(tex) {
            //         material.albedoTexture = tex;
            // }));
            // utl.box4.meshRenderer.material = material;
            // Laya.timer.frameLoop(1, this, ()=>{
            //     for(let p of utl.players.keys()){
            //         let pn = utl.players.get(p).tempPosition
            //         let rn = utl.players.get(p).tempRotation
            //         if(pn){
            //             utl.players.get(p).transform.position =  new Laya.Vector3(pn.x/100,pn.y/100,pn.z/100)
            //         }
            //         if(rn){
            //             utl.players.get(p).transform.rotation =  new Laya.Vector3(rn.x/100,rn.y/100,rn.z/100)
            //         }
            //     }
            // });
           
            // Laya.timer.frameLoop(10, this, ()=>{
            //     let thisBox = utl.players.get(utl.userId)
            //     console.log(utl.takeSpeed)
            //     if(utl.socket&&thisBox){

            //         utl.socket.emit('123', {
            //             userId:utl.userId,
            //             takeSpeed:utl.takeSpeed,
            //             rotation:thisBox.transform.rotation,
            //             position:thisBox.transform.position
            //         })
            //     }
            // });
            // Laya.timer.frameLoop(1, this, ()=>{
            //     for(let p of utl.players.keys()){
            //         let player = utl.players.get(p)
            //         if(player.tempPositionFlag){
            //             if(player.tempPositions.length>0){
            //                 player.tempPositionFlag=false
            //                 let p =  player.tempPositions.shift()
            //                 Laya.Tween.to( player.tempPosition,p, 500,null,Laya.Handler.create(this,()=>{
            //                     player.tempPositionFlag=true

            //                 }));
            //             }
            //         }
                   
            //     }
            // });
              
        }
        addPBRSphere(sphereMesh, position, scene) {
            var mat = new Laya.PBRStandardMaterial();
            mat.smoothness = 0.2;

            var meshSprite = new Laya.MeshSprite3D(sphereMesh);
            meshSprite.meshRenderer.sharedMaterial = mat;
            var transform = meshSprite.transform;
            transform.localPosition = position;
            scene.addChild(meshSprite);
            return meshSprite;
        }
        createBall(){
            // for(let z =1;z<10;z++){
            //     for(let i =-10;i<10;i++){
            //         for(let l =-10;l<10;l++){
            //             let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.1, .1,.1)));
            //             // box4.transform.rotate(new Laya.Vector3(2 * Math.PI / 180,0, 10 * Math.PI / 180), true, true);
            //             let material1 = new Laya.BlinnPhongMaterial();
            //             box4.meshRenderer.material = material1;
            //             box4.transform.position =new Laya.Vector3(i*5,l*5,z*5)
            //         }
            //     }
            // }
        }
        flying(touchCount){
            console.log(touchCount);
            // let touchCount = this.scene.input.touchCount();
            if (1 === touchCount){
                //判断是否为两指触控，撤去一根手指后引发的touchCount===1
                if(this.isTwoTouch){
                    return;
                }
                let touch = this.newScene.input.getTouch(0);
                if(this.newTouch.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                }

                if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
                }
                
            }
            else if (2 === touchCount){
                this.isTwoTouch = true;
                //获取两个触碰点
                let touch = this.newScene.input.getTouch(0);
                let touch2 = this.newScene.input.getTouch(1);
                console.log(3333);
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
                        this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }
                    if(this.newTouch.scaleSmall(touch2.position.x,touch2.position.y)){
                        this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }

                    if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                        this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }
                    if(this.newTor.scaleSmall(touch2.position.x,touch2.position.y)){
                        this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
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
        setStatus(){
            if(utl.netPlayers){
                for(let p of utl.players.keys()){
                    let player = utl.players.get(p);
                    let netPlayers = utl.netPlayers.get(p);
                    if(utl.takeSpeed.x!=player.speed.x){
                        utl.takeSpeed.x>player.speed.x?player.speed.x+=.02:player.speed.x-=0.02;
                        if(utl.takeSpeed.x==0&&player.speed.x<0.02&&player.speed.x>-0.02){
                            player.speed.x=0;
                        }
                    }
                    if(utl.takeSpeed.y!=player.speed.y){
                        utl.takeSpeed.y>player.speed.y?player.speed.y+=.02:player.speed.y-=.02;
                        if(utl.takeSpeed.y==0&&player.speed.y<0.02&&player.speed.y>-0.02){
                            player.speed.y=0;
                        }
                    }
                    if(utl.takeSpeed.z!=player.speed.z){
                        utl.takeSpeed.z>player.speed.z?player.speed.z+=.02:player.speed.z-=.02;
                        if(utl.takeSpeed.z==0&&player.speed.z<0.02&&player.speed.z>-0.02){
                            player.speed.z=0;
                        }
                    }
                    
                    let x = player.speed.x*90/100;
                    let y = player.speed.y*90/100;
                    let z = player.speed.z*90/100;
                    // console.log(utl.box.transform.rotation.x)
                        
                    let tz = Math.cos(Math.PI/180*player.transform.rotationEuler.y)*utl.speedMove;
                    let tx = Math.sin(Math.PI/180*player.transform.rotationEuler.y)*utl.speedMove;
                    let ty = Math.sin(Math.PI/180*player.transform.rotationEuler.x)*utl.speedMove;

                    player.transform.rotate(new Laya.Vector3(0,0,-z* Math.PI / 180),true);
                    player.transform.rotate(new Laya.Vector3(0,-x* Math.PI / 180,0),true);
                    player.transform.rotate(new Laya.Vector3(y* Math.PI / 180,0,0),true);
                    player.transform.translate(new Laya.Vector3(tx,-ty,tz),false);
                }
            }
        }
        onUpdate() {
            // this.setStatus()
            let touchCount = this.newScene.input.touchCount();
            console.log(touchCount);
            this.flying(touchCount);
            // utl.camera&&utl.camera.transform.translate(new Laya.Vector3(0,0,.002),false)
            return
            
            if(utl.box){
                
                if(utl.takeSpeed.x!=utl.speed.x){
                    utl.takeSpeed.x>utl.speed.x?utl.speed.x+=.02:utl.speed.x-=0.02;
                    if(utl.takeSpeed.x==0&&utl.speed.x<0.02&&utl.speed.x>-0.02){
                        utl.speed.x=0;
                    }
                }
                if(utl.takeSpeed.y!=utl.speed.y){
                    utl.takeSpeed.y>utl.speed.y?utl.speed.y+=.02:utl.speed.y-=.02;
                    if(utl.takeSpeed.y==0&&utl.speed.y<0.02&&utl.speed.y>-0.02){
                        utl.speed.y=0;
                    }
                }
                if(utl.takeSpeed.z!=utl.speed.z){
                    utl.takeSpeed.z>utl.speed.z?utl.speed.z+=.02:utl.speed.z-=.02;
                    if(utl.takeSpeed.z==0&&utl.speed.z<0.02&&utl.speed.z>-0.02){
                        utl.speed.z=0;
                    }
                }
                    let x = utl.speed.x*90/100;
                    let y = utl.speed.y*90/100;
                    let z = utl.speed.z*90/100;
               
                // console.log(utl.box.transform.rotation.x)
                    
                let tz = Math.cos(Math.PI/180*utl.box.transform.rotationEuler.y)*utl.speedMove;
                let tx = Math.sin(Math.PI/180*utl.box.transform.rotationEuler.y)*utl.speedMove;
                let ty = Math.sin(Math.PI/180*utl.box.transform.rotationEuler.x)*utl.speedMove;


                let trx = utl.box.transform.rotation.x;
                let tryy = utl.box.transform.rotation.y;
                let trz = utl.box.transform.rotation.z;
                let wx = utl.box.transform.position.x;
                let wy = utl.box.transform.position.y;
                let wz = utl.box.transform.position.z;

                utl.box.transform.rotate(new Laya.Vector3(0,0,-z* Math.PI / 180),true);
                utl.box.transform.rotate(new Laya.Vector3(0,-x* Math.PI / 180,0),true);
                utl.box.transform.rotate(new Laya.Vector3(y* Math.PI / 180,0,0),true);
                utl.box.transform.translate(new Laya.Vector3(tx,-ty,tz),false);
              
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
            // Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/f.lh", Laya.Handler.create(null, (sp)=> {
            //     let layaMonkey1 = utl.newScene.addChild(sp);
            //     layaMonkey1.transform.position =new Laya.Vector3(0,3,0)
            //     // layaMonkey1.transform.rotate(new Laya.Vector3(90* Math.PI / 180,0, 0), true);
            //     utl.box = layaMonkey1
            //     utl.doposition= layaMonkey1.transform.position
            //     utl.players.set(utl.userId,utl.box )
            //      // utl.do.rotation = layaMonkey1.transform.rotation
            //      // utl.box.getChildByName('Box001').addChild(utl.camera);
            //     // layaMonkey1.linkSprite3DToAvatarNode("Box001",utl.camera);
            //     // console.log(layaMonkey1,sp)
            //     // utl.ani = layaMonkey1.getComponent(Laya.Animator);
            //     // //创建一个动画动作状态
            //     // var state1 = new Laya.AnimatorState();
            //     // //设置动作状态的名称
            //     // state1.name = "hello";
            //     // //设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
            //     // state1.clipStart = 0/45;
            //     // //设置动作状态播放的结束时间
            //     // state1.clipEnd = 45/45;
            //     // //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
            //     // state1.clip = utl.ani.getDefaultState().clip;
            //     // //动画播放是否循环
            //     // state1.clip.islooping = true;
            //     // //添加动画状态到动画组件里
            //     // utl.ani.addState(state1);
            //     //播放动画
                
            // }));
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
                this.creabox(f);
            }
        }
        
    }
    class MonkeyScript extends Laya.Script3D{
        constructor(){
            super();
            this.scene = null;
            this.text = null;
            this.camera = null;
            this.twoFirst = true;
            this.isTwoTouch = false;
            this.first = true;
        }
        onStart(){
            this.newTouch = new newtach();
            this.newTor = new newTwo();
            this.scene =  this.owner.parent;
        }
        onUpdate(){
            let touchCount = this.scene.input.touchCount();
            if (1 === touchCount){
                //判断是否为两指触控，撤去一根手指后引发的touchCount===1
                if(this.isTwoTouch){
                    return;
                }
                //获取当前的触控点，数量为1
                let touch = this.scene.input.getTouch(0);
                //是否为新一次触碰，并未发生移动
                if(this.newTouch.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                }

                if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
                }
                if (this.first){
                    //获取触碰点的位置
                    
                    this.first = false;
                }
                else{
                    //移动触碰点
                   
                }
            }
            else if (2 === touchCount){
                this.isTwoTouch = true;
                //获取两个触碰点
                let touch = this.scene.input.getTouch(0);
                let touch2 = this.scene.input.getTouch(1);
                //是否为新一次触碰，并未发生移动
                if (this.twoFirst){
                    if(this.newTouch.scaleSmall(touch.position.x,touch.position.y)){
                        this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }
                    if(this.newTouch.scaleSmall(touch2.position.x,touch2.position.y)){

                        this.newTouch.leftFormatMovePosition(touch2.position.x,touch2.position.y);
                    }

                    if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                        this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }
                    if(this.newTor.scaleSmall(touch2.position.x,touch2.position.y)){
                        this.newTor.leftFormatMovePosition(touch2.position.x,touch2.position.y);
                    }
                    //获取触碰点的位置
                    this.twoFirst = false;
                }
                else{
                   if(this.newTouch.scaleSmall(touch.position.x,touch.position.y)){
                        this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }
                    if(this.newTouch.scaleSmall(touch2.position.x,touch2.position.y)){
                        this.newTouch.leftFormatMovePosition(touch2.position.x,touch2.position.y);
                    }

                    if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                        this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }
                    if(this.newTor.scaleSmall(touch2.position.x,touch2.position.y)){
                        this.newTor.leftFormatMovePosition(touch2.position.x,touch2.position.y);
                    }
                }   
            }
            else if (0 === touchCount){
               
                this.first = true;
                this.twoFirst = true;
                this.isTwoTouch = false;
            }
        }
        onLateUpdate() {
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
        temp$2.creab();
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

    class ImageRunTime extends Laya.Sprite{
        constructor(){
                super();
                this.scaleTime = 100;
               this.width = 300;
                this.height = 300;
               this.x = 150;
                this.y = Laya.stage.height - 350;
                this.moveX = 0;
                this.moveY = 0;
                this.tx=50;
                this.twidth = 300;
                this.theight = 300;
                this.ty = Laya.stage.height - 350;
                this.flag = false;
                console.log(this.maind);
                
                //设置组件的中心点
                this.anchorX = this.anchorY = 0.5;
                //添加鼠标按下事件侦听。按时时缩小按钮。
                this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
                //添加鼠标抬起事件侦听。抬起时还原按钮。
                this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
                //添加鼠标离开事件侦听。离开时还原按钮。
                this.on(Laya.Event.MOUSE_OUT,this, this.outEvent);
                this.on(Laya.Event.MOUSE_MOVE,this, this.leftFormatMovePosition);
            }
            outEvent(){
              utl.tachLeftFlag = false;
            }
           scaleBig(e)
            {        
                console.log('MOUSE_UP');
                utl.tachLeftFlag = false;
                //变大还原的缓动效果
                utl.moveX = 0;
                utl.moveY = 0;
                utl.takeSpeed.x = 0;
                utl.takeSpeed.y = 0;
                // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
            }
            scaleSmall(e)
            {    
              if(this.tx<e.stageX&&
                e.stageX<this.tx+this.twidth&&
                this.ty<e.stageY&&
                e.stageY<this.ty+this.theight
                ){
                utl.tachLeftFlag = true;
              }else{
                utl.tachLeftFlag = false;
              }
              console.log('MOUSE_DOWN');
                //缩小至0.8的缓动效果
                // Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
            }
            getRoteImg(pobj) {
              let rotate = 0;
              if (pobj.x1 == pobj.x2){
                rotate=0;
              }
              if (pobj.x1 > pobj.x2) {
                let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
                rotate =~~(Math.atan(atanrotate) / Math.PI * 180) + 90;
              } else if (pobj.x1 < pobj.x2) {
                let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
                rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270;
              }
              return rotate
            }
            leftFormatMovePosition(e) {
              // if(!utl.tachLeftFlag){
              //   return
              // }
              // // utl.ani.play("hello");
              // let pobj = {}
              // pobj.x1 = e.stageX //点击
              // pobj.x2 =this.tx + this.twidth/2
              // pobj.y1 = e.stageY
              // pobj.y2 = this.ty + this.theight/2
              // if((e.stageX - this.tx - this.twidth/2) / (this.twidth/2) >1){
              //   utl.takeSpeed.x = 1
              // }else{
              //    utl.takeSpeed.x = (e.stageX - this.tx - this.twidth/2) / (this.twidth/2) 
              // }
              // if((e.stageX - this.tx - this.twidth/2) / (this.twidth/2) <-1){
              //   utl.takeSpeed.x = -1
              // }else{
              //    utl.takeSpeed.x = (e.stageX - this.tx - this.twidth/2) / (this.twidth/2) 
              // }
              // if((e.stageY - this.ty - this.theight/2) / (this.theight/2) >1){
              //    utl.takeSpeed.y = 1
              // }else{
              //   utl.takeSpeed.y = (e.stageY - this.ty - this.theight/2) / (this.theight/2) 
              // }
              // if((e.stageY - this.ty - this.theight/2) / (this.theight/2) <-1){
              //    utl.takeSpeed.y = -1
              // }else{
              //   utl.takeSpeed.y = (e.stageY - this.ty - this.theight/2) / (this.theight/2) 
              // }
              // let x = 1,y=1,z=1
              // console.log(utl.socket)
               
              // utl.takeSpeed.y = e.stageY - this.ty - this.theight/2
              // utl.box.transform.rotate(new Laya.Vector3(0,utl.rote* Math.PI / 180, 0), true);
              // utl.rote = this.getRoteImg(pobj) 
              // // tools.getRoteImg(pobj, databus.leftPositions)
              // let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
              // utl.moveX = (pobj.x1 - pobj.x2) * r /10
              // utl.moveY = (pobj.y1 - pobj.y2) * r/10
              // utl.box.transform.rotate(new Laya.Vector3(0,-utl.rote* Math.PI / 180,0), true);
              // console.log(this.moveX,this.moveY,utl.box.transform.position)
            }
    }

    class ImageRunTime$1 extends Laya.Sprite{
        constructor(){
                super();
                this.scaleTime = 100;
                this.width = 300;
                this.height = 300;
                this.x = Laya.stage.width - 350;
                this.y = Laya.stage.height - 350;
                this.moveX = 0;
                this.moveY = 0;
                this.tx=Laya.stage.width - 350;
                this.twidth = 300;
                this.theight = 300;
                this.ty = Laya.stage.height - 350;
                this.flag = false;
                console.log(this.maind);
                
                //设置组件的中心点
                this.anchorX = this.anchorY = 0.5;
                //添加鼠标按下事件侦听。按时时缩小按钮。
                this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
                //添加鼠标抬起事件侦听。抬起时还原按钮。
                this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
                //添加鼠标离开事件侦听。离开时还原按钮。
                this.on(Laya.Event.MOUSE_OUT,this, this.outEvent);
                this.on(Laya.Event.MOUSE_MOVE,this, this.leftFormatMovePosition);
            }
           scaleBig(e)
            {        
                utl.takeSpeed.z = 0;
                console.log('MOUSE_UP');
                utl.tachRightFlag = false;
                // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
            }
            outEvent(){
              utl.tachRightFlag = false;
            }
          
            scaleSmall(e)
            {    
              
              if(this.tx<e.stageX&&
                e.stageX<this.tx+this.twidth&&
                this.ty<e.stageY&&
                e.stageY<this.ty+this.theight
                ){
                utl.tachRightFlag = true;
              }else{
                utl.tachRightFlag = false;
              }
              console.log('MOUSE_DOWN');
                //缩小至0.8的缓动效果
                // Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
            }
            getRoteImg(pobj) {
              let rotate = 0;
              if (pobj.x1 == pobj.x2){
                rotate=0;
              }
              if (pobj.x1 > pobj.x2) {
                let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
                rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90;
              } else if (pobj.x1 < pobj.x2) {
                let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
                rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270;
              }
              return rotate
            }
            leftFormatMovePosition(e) {
              // console.log(33333)
              // if(!utl.tachRightFlag){
              //   return
              // }
              // // utl.ani.play("hello");
              // let pobj = {}
              // pobj.x1 = e.stageX //点击
              // pobj.x2 =this.tx + this.twidth/2
              // pobj.y1 = e.stageY
              // pobj.y2 = this.ty + this.theight/2
            
              // if((e.stageY - this.ty - this.theight/2) / (this.theight/2) >1){
              //    utl.takeSpeed.z = 1
              // }else{
              //   utl.takeSpeed.z = (e.stageY - this.ty - this.theight/2) / (this.theight/2) 
              // }
              // if((e.stageY - this.ty - this.theight/2) / (this.theight/2) <-1){
              //    utl.takeSpeed.z = -1
              // }else{
              //   utl.takeSpeed.z = (e.stageY - this.ty - this.theight/2) / (this.theight/2) 
              // }
            }

    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("script/GameUI.js",GameUI);
    		reg("script/hander/LeftHand.js",ImageRunTime);
    		reg("script/hander/RightHand.js",ImageRunTime$1);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode ="full";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;

    GameConfig.init();

    class Main {
    	constructor() {
    		//根据IDE设置初始化引擎		
    		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
    		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
    		Laya["Physics"] && Laya["Physics"].enable();
    		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    		Laya.stage.scaleMode = GameConfig.scaleMode;
    		Laya.stage.screenMode = GameConfig.screenMode;
    		Laya.stage.alignV = GameConfig.alignV;
    		Laya.stage.alignH = GameConfig.alignH;
    		//兼容微信不支持加载scene后缀场景
    		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
    		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
    		if (GameConfig.stat) Laya.Stat.show();
    		Laya.alertGlobalError(true);

    		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    	}

    	onVersionLoaded() {
    		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    	}

    	onConfigLoaded() {
    		//加载IDE指定的场景
    		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    	}
    }
    //激活启动类
    new Main();

}());
