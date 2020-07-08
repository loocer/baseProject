
const roomsEngine=require('./tools/data').roomsEngine;
const create = require('../base/create')
const data = require('../house/data') 
const contant = require('../house/contant')
const Panel = require('../house/panel')
const acType = {
	ON_COME : 'ON_COME',
	ON_READY : 'ON_READY',
	ON_START : 'ON_START',
	SHOW_VALUE : 'SHOW_VALUE',
	GAME_PASS : 'GAME_PASS',
	GAME_PK : 'GAME_PK',
	ON_RAISE: 'ON_RAISE',
	ADD_RAISE: 'ADD_RAISE',
	GAME_OVER: 'GAME_OVER'
}
const stepType ={
	BEGEN:'BEGEN',
	DOING: 'DOING',
	OVER: 'OVER'
}
class roomPlayers{
	constructor(user){
		this.id = user.id
		this.color = '#d5d800'
		this.stepType = acType.BEGEN
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
		this.panels[0] =  contant.houseType
	}
}
module.exports=roomPlayers