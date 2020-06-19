const  Key1 = require('./hero/key1')
const DataBus = require('./databus')
let databus = new DataBus()
const init = ()=>{
	let key = databus.pools.getItemByClass('enemy1', Key1)
    key.init(100,100)
    databus.heros.add(key)
}
module.exports = init