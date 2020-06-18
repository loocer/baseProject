// export const 
export const screenWidth = window.innerWidth
export const screenHeight = window.innerHeight
import DataBus from '../databus'
let databus = new DataBus()
export const GAME_IMG = new Map();

export const bgImag = () => {
  let img = new Image()
  img.src = 'images/bg.jpg'
  return img
}
export const ballImag = () => {
  let img = new Image()
  img.src = 'images/ball.jpg'
  return img
}
export const biu = () => {
  let img = new Image()
  img.src = 'images/biu.png'
  return img
}
export const loadingImage = ()=>{
  GAME_IMG.set('bg', bgImag())
  GAME_IMG.set('ballImag', ballImag())
  GAME_IMG.set('biu', biu())
}

