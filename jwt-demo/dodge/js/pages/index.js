
import pass from './pass'
import login from './login'
import init from './init'
import Databus from '../databus'
let databus = new Databus()
let tempIndex = null
let list = null
export const work=(that)=>{
  if(databus.pageIndex!=tempIndex){
    list = [new init(),new login(),new pass()]
    wx.offTouchStart(databus.handTouchStart)
    wx.offTouchMove(databus.touchHandMove)
    wx.offTouchEnd(databus.handTouchEnd)
    list[databus.pageIndex].init()
    list[databus.pageIndex].addEventLinner(that)
    tempIndex = databus.pageIndex
  }
  return list[databus.pageIndex]
}