import physics from '../physics/index'
import pass from './pass'
import Databus from '../databus'
let databus = new Databus()
let tempIndex = null
let list = null
export const work=(that)=>{
  if(databus.pageIndex!=tempIndex){
    list = [new pass(),new physics()]
    wx.offTouchStart(databus.touchHandler)
    wx.offTouchMove(databus.moveHandler)
    list[databus.pageIndex].addEventLinner(that)
    tempIndex = databus.pageIndex
  }
  return list[databus.pageIndex]
}