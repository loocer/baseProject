const  DataBus = require('./databus')
const databus = new DataBus()
const action = (UserEvent,main)=>{
	switch(UserEvent.evType)
	{
	    case 'MOVE':
	        moveAction(UserEvent,main)
			break;
		case 'MOVE':
			moveAction(UserEvent,main)
			break;	
	}
}
const moveAction = (UserEvent,main)=>{
	let tempKey = Date.parse(new Date())
	let herosIds = UserEvent.herosIds
	let heros = [...main.databus.heros]
	let controls = []
	for(let id of herosIds){
		for (let key of main.databus.moveTeam.keys()) {
			let tempList = []
			for(let obj of main.databus.moveTeam.get(key)){
				if(obj.id!=id){
					tempList.push(obj)
				}
			}
			main.databus.moveTeam.set(key,tempList)
		  }
		for(let her of heros){
			if(her.id==id){
				her.teamId = tempKey
				controls.push(her)
				her.setFireObj(UserEvent.Point)
			}
		}
	}
	main.databus.moveTeam.set(tempKey,controls)
	console.log(main.databus.moveTeam)
}
module.exports = action