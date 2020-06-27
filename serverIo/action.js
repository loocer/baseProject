const  DataBus = require('./databus')
const databus = new DataBus()
const action = (UserEvent)=>{
	switch(UserEvent.evType)
	{
	    case 'MOVE':
	        moveAction(UserEvent)
	        break;
	}
}
const moveAction = (UserEvent)=>{
	let tempKey = Date.parse(new Date())
	let herosIds = UserEvent.herosIds
	let heros = [...databus.heros]
	let controls = []
	for(let id of herosIds){
		for (let key of databus.moveTeam.keys()) {
			let tempList = []
			for(let obj of databus.moveTeam.get(key)){
				if(obj.id!=id){
					tempList.push(obj)
				}
			}
			databus.moveTeam.set(key,tempList)
		  }
		for(let her of heros){
			if(her.id==id){
				her.teamId = tempKey
				controls.push(her)
				her.setFireObj(UserEvent.Point)
			}
		}
	}
	databus.moveTeam.set(tempKey,controls)
	console.log(databus.moveTeam)
}
module.exports = action