const  Key1 = require('./hero/key1')
const init = (databus)=>{
	let key = databus.pools.getItemByClass('enemy1', Key1)
    key.init(databus,100,300,'1',111)
    databus.heros.add(key)
    let key1 = databus.pools.getItemByClass('enemy1', Key1)
    key1.init(databus,200,300,'2',111)
    databus.heros.add(key1)

    let key2 = databus.pools.getItemByClass('enemy1', Key1)
    key2.init(databus,100,100,'3',111)
    databus.heros.add(key2)
    let key5 = databus.pools.getItemByClass('enemy1', Key1)
    key5.init(databus,300,400,'4',222)
    databus.heros.add(key5)
    let key55 = databus.pools.getItemByClass('enemy1', Key1)
    key55.init(databus,360,400,'5',222)
    databus.heros.add(key55)
    let key66 = databus.pools.getItemByClass('enemy1', Key1)
    key66.init(databus,200,500,'6',222)
    databus.heros.add(key66)

    let rewr = databus.pools.getItemByClass('enemy1', Key1)
    rewr.init(databus,280,300,'7',222)
    databus.heros.add(rewr)
}
module.exports = init