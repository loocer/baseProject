import {
  GAME_IMG
} from '../utils/common'

export const draw = (ctx,bulletObj)=>{
  const IMG = GAME_IMG.get('biu')
  if (!bulletObj.visible)
      return
    console.log(222222222)
    ctx.save()
    let length = Math.sqrt((bulletObj.x - bulletObj.zx) * (bulletObj.x - bulletObj.zx) + (bulletObj.y - bulletObj.zy) * (bulletObj.y - bulletObj.zy))
    ctx.translate(bulletObj.x, bulletObj.y)
    ctx.rotate(bulletObj.rotate * Math.PI / 180)
    if (bulletObj.stopFlagTemp) {

      ctx.drawImage(
        IMG,
        0, bulletObj.showLength,
        10, bulletObj.height,
        -bulletObj.width / 2,
        0,
        bulletObj.width,
        length
      )
    } else {
      ctx.drawImage(
        IMG,
        -bulletObj.width / 2,
        0,
        bulletObj.width,
        length
      )
    }
    ctx.restore()
}