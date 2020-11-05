
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
		this.houses = []
	}
	update(){
		for(let ps of this.panels){
			for(let p of ps){
				p[1].exObj.update()
			}
		}
	}
	init(main){
		this.setPanel(main)
		create({type:data.MAINHOUSE,databus:main.databus,player:this,x:100,y:400})
	}
	setPanel(main){
		for(let obj of contant.houseType){
			let panel = new Panel()
			obj[1].exObj = panel
		}
		for(let obj of contant.houseType2){
			let panel = new Panel()
			obj[1].exObj = panel
		}
		this.panels[0] =  contant.houseType
		this.panels[1] =  contant.houseType2
		this.panels[2] =  contant.houseType
		this.panels[3] =  contant.houseType2
	}
}
module.exports=roomPlayers