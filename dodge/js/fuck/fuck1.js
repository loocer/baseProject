import * as Matter from '../libs/matter'
var World = Matter.World,
  Bodies = Matter.Bodies;
import DataBus from '../databus'
const databus = new DataBus()
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
let ciFlag = true
let kongFlag = true

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
const kongBall = [{
    y: screenHeight / 2 - 100,
    x: 10,
    r: 12
  },
  {
    y: screenHeight / 2 - 100,
    x: 159,
    r: 12
  },
  {
    y: screenHeight / 2 - 100,
    x: 41,
    r: 12
  },
  {
    y: screenHeight / 2 - 100,
    x: 71,
    r: 12
  },
  {
    y: screenHeight / 2 - 100,
    x: 111,
    r: 12
  },
  {
    y: screenHeight / 2 - 100,
    x: 200,
    r: 12
  },
  {
    y: screenHeight / 2 - 100,
    x: 160,
    r: 12
  },

  {
    y: screenHeight / 2 - 140,
    x: 20,
    r: 12
  },
  {
    y: screenHeight / 2 - 140,
    x: 159,
    r: 12
  },
  {
    y: screenHeight / 2 - 140,
    x: 51,
    r: 12
  },
  {
    y: screenHeight / 2 - 140,
    x: 191,
    r: 12
  },
  {
    y: screenHeight / 2 - 140,
    x: 81,
    r: 12
  },
  {
    y: screenHeight / 2 - 140,
    x: 120,
    r: 12
  },
  {
    y: screenHeight / 2 - 140,
    x: 100,
    r: 12
  },
]
const create = () => {
  console.log(2222)
  let tempg = screenHeight / 2 / 30
  for (let i = tempg; i >0; i--) {
    let cX = rnd(0, screenWidth / 2)-100
    let max = rnd(screenWidth / 4, screenWidth / 2)
    let flag = true
    while (flag) {
       
      if (cX < max) {
        databus.kong.push({
          x: cX,
          y:i*40,
          r:16
        })
      }else{
        flag = false
      }
      cX += 30
    }
  }

}
export const addFuck = () => {
  if (kongFlag) {
    kongFlag = false
    create()
  }
  if (ciFlag) {
    if (databus.trans.y > screenHeight / 3) {
      ciFlag = false
      let cicyl = Bodies.circle(screenWidth / 2, -databus.trans.y, 10, {
        density: 10,
      })
      World.add(databus.world, [
        cicyl
      ]);
      databus.csBall.push(cicyl)

    }
  }

}