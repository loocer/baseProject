import Enemy1 from '../enemy1/index'
import Enemy2 from '../enemy2/index'
import Enemy3 from '../enemy3/index'
import {
  rnd
} from '../../utils/tools'
import {
  groundWidth,
  groundHeight,
  screenWidth,
  screenHeight
} from '../../utils/common'
import DataBus from '../../main/databus'
let databus = new DataBus()
export const c7 =  () => {
  for (let i = 0; i < 30; i++) {
    let mosterHouse = databus.pools.getItemByClass('mosterHouse', Enemy1)
    mosterHouse.init({
      x: rnd(0, groundWidth),
      y: rnd(0, groundHeight),
      l: 50,
      li:4
    })
    databus.mosterHouse.add(mosterHouse)
  }
  for (let i = 0; i <20; i++) {
    let mosterHouse = databus.pools.getItemByClass('mosterHouse2', Enemy2)
    mosterHouse.init({
      x: rnd(0, groundWidth),
      y: rnd(0, groundHeight),
      c:700,
      l:5
    })
    databus.mosterHouse.add(mosterHouse)
  }
  for (let i = 0; i < 30; i++) {
    let mosterHouse = databus.pools.getItemByClass('mosterHouse', Enemy3)
    mosterHouse.init({
      x: rnd(0, 2)?rnd(-100, -30):rnd( groundWidth+20,groundWidth+100),
      y:  rnd(0, 2)?rnd(-100, -30):rnd( groundHeight+20,groundHeight+100),
      l: 2
    })
    databus.mosterHouse.add(mosterHouse)
  }
}