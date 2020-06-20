import {
  GAME_IMG
} from '../utils/common'
const draw = {}
draw.drawBullets = (ctx, bulletObj) => {
  const IMG = GAME_IMG.get('biu')
  if (!bulletObj.visible)
    return
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
draw.drawHero = (ctx, obj) => {
  if (!obj.visible)
    return
  ctx.save()
  ctx.translate(obj.x, obj.y)
  // ctx.rotate(obj.rotate * Math.PI / 180)
  ctx.beginPath();
  ctx.fillStyle = "#00917D";
  ctx.arc(0, 0, obj.width, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore()
}
export default draw