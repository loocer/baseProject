 import utl from "../utl.js"
export default class Enemy extends Laya.Script3D { 
	constructor() {
		super();
		this.tempy = 0
		this.box = null;
		this.time = 0
		this.speed = new Laya.Vector3();
		Laya.timer.loop(30,this,this.onUpdate);
		Laya.timer.loop(10,this,this.onFind);
	}
	onAwake() {
		this.box = this.owner;
		this.onFind()
	}
	onFind(){
		if(utl.box){
			let bV3 = new Laya.Vector3();
        	Laya.Vector3.subtract( utl.box.transform.position,this.box.transform.position, bV3);
			
			Laya.Vector3.normalize(bV3,this.speed);
			// let scale =  (utl.speedMove + 1) / 1
			Laya.Vector3.scale(this.speed, 0.1, this.speed);
		}

	}
	onUpdate(){
		this.time++ 
		// let vx = utl.box.transform.position.x - this.box.transform.position.x 
		// let vy = utl.box.transform.position.y - this.box.transform.position.y 
		// let vz = utl.box.transform.position.z - this.box.transform.position.z
		// let ry = utl.getAngle(vx,vz)
		// console.log(ry)
		// this.box.transform.rotate(new Laya.Vector3(0,-this.tempy* Math.PI / 180,0), true);
		// this.box.transform.rotate(new Laya.Vector3(0,ry* Math.PI / 180,0), true);
		// this.tempy = ry
		 this.box.transform.translate(this.speed,false)
		 // if(this.time==1000 ){
		 // 	this.box.removeSelf();
		 // }
	}
	onStart() {}

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