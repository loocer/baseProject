
const roomsEngine=require('./tools/data').roomsEngine;
const create = require('../base/create')
const data = require('../house/data') 
const contant = require('../house/contant')
const Panel = require('../house/panel')

class roomPlayers{
	constructor(user){
		this.id = user.id
		this.color = '#d5d800'
		this.status = false
		this.fangzhu = null
		this.panels =[]//1:diyige
		this.user = user
		this.visible = true
		this.box = null
		this.speedMove = 0.1
		this.rotation = null
		this.position = null
		this.takeSpeed = {
			z:0,
			x:0,
			y:0
		}
	}
	update(){
		// if(this.box){
		// 	this.box.transform.rotate(new Laya.Vector3(0,0,this.rotes.z* Math.PI / 180),true);
		// 	this.box.transform.rotate(new Laya.Vector3(0,-this.rotes.x* Math.PI / 180,0),true);
		// 	this.box.transform.rotate(new Laya.Vector3(this.rotes.y* Math.PI / 180,0,0),true);
		// 		// utl.box.transform.rotation = new Laya.Vector3(utl.box.transform.rotation.x,utl.box.transform.rotation.y,utl.box.transform.rotation.z)
				
					
		// 	let tz = Math.cos(Math.PI/180*this.box.transform.rotationEuler.y)*this.speedMove
		// 	let tx = Math.sin(Math.PI/180*this.box.transform.rotationEuler.y)*this.speedMove
		// 	let ty = Math.sin(Math.PI/180*this.box.transform.rotationEuler.x)*this.speedMove
		// 	// utl.box.transform.translate(new Laya.Vector3(tx,-ty,tz),false)
		// 	let temp = utl.box.transform.position
		// 	this.trans = {
		// 		x:temp.x+tx,
		// 		y:temp.y-ty,
		// 		z:temp.z+tz
		// 	}
		// 	this.box.transform.position =new Laya.Vector3(this.trans.x,this.trans.y,this.trans.z)
		// }
		
	}
	action(event){
		this.takeSpeed = event.takeSpeed
		this.rotation = event.rotation
		this.position = event.position
		// action(event,this)
	}
}
module.exports=roomPlayers