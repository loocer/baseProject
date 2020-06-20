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
	let herosIds = UserEvent.herosIds
	let heros = [...databus.heros]
	for(let id of herosIds){
		for(let her of heros){
			if(her.id==id){
				her.setFireObj(UserEvent.Point)
			}
		}
		
	}
	databus.heros =  new Set(heros)
}
module.exports = action