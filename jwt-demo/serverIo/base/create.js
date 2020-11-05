const House = require('./house');
const data = require('../house/data') 


const bandDdde = {}
const baseOn = (databus,type)=>{
    let obj =  databus.pools.getItemByClass(type, House)
    databus.house.add(obj)
    return obj
}
bandDdde[data.MAINHOUSE] = ({databus,player,x,y})=>{
    let obj = baseOn(databus,data.MAINHOUSE)
    obj.init({databus,x,y,player,name:data.MAINHOUSE,width:100,height:100})
}
bandDdde[data.POWER]= ({databus,player,x,y})=>{
    let obj = baseOn(databus,data.POWER)
    obj.init({databus,x,y,player,name:data.POWER,width:100,height:100})
}
bandDdde[data.BARRACKS]= ({databus,player,x,y})=>{
    let obj = baseOn(databus,data.BARRACKS)
    obj.init({databus,x,y,player,name:data.BARRACKS,width:100,height:100})
}
bandDdde[data.ARSENAL]= ({databus,player,x,y})=>{
    let obj = baseOn(databus,data.ARSENAL)
    obj.init({databus,x,y,player,name:data.ARSENAL,width:100,height:100})
}
bandDdde[data.RADAR]= ({databus,player,x,y})=>{
    let obj = baseOn(databus,data.RADAR)
    obj.init({databus,x,y,player,name:data.RADAR,width:100,height:100})
}
const create = ({type,databus,player,x,y})=>{
    bandDdde[type]({databus,player,x,y})
}
module.exports = create