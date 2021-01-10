 import utl from "../utl.js"
export default class Bullet extends Laya.Script3D { 
	constructor() {
		super();
		this.tempy = 0
		this.box = null;
		this.time = 0
		this.speed = new Laya.Vector3();
		Laya.timer.loop(10,this,this.onUpdate);
	}
	onAwake() {
		this.box = this.owner;
		if(utl.c1&&utl.c2){
			let bV3 = new Laya.Vector3();
        	Laya.Vector3.subtract(utl.c2.transform.position, utl.c1.transform.position, bV3);
			
			Laya.Vector3.normalize(bV3,this.speed);
			// let scale =  (utl.speedMove + 1) / 1
			Laya.Vector3.scale(this.speed, (utl.speedMove + .01), this.speed);
		}
        
	}
	onUpdate(){
		this.time++ 
		// let vx = utl.box.transform.position.x - this.box.transform.position.x 
		// let vy = utl.box.transform.position.y - this.box.transform.position.y 
		// let vz = utl.box.transform.position.z - this.box.transform.position.z
		// let ry = utl.getAngle(vx,vz)
		// this.box.transform.rotate(new Laya.Vector3(0,-this.tempy* Math.PI / 180,0), true);
		// this.box.transform.rotate(new Laya.Vector3(0,ry* Math.PI / 180,0), true);
		// this.tempy = ry
		 this.box.transform.translate(this.speed,false)
		 if(this.time==500 ){
		 	this.box.removeSelf();
		 }
	}
	onStart() {}

	onTriggerEnter()
	{
	    this.box.removeSelf();
		console.log("bu--onTriggerEnter");
	}
	onTriggerStay()
	{
		console.log("bu--onTriggerStay");
	}
	onTriggerExit()
	{
		console.log("bu--onTriggerExit");
	}
	onEnable() {
	} 
	onDisable() {
	}
}