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
draw.drawBullet1 = (ctx, bulletObj) => {
  if (!bulletObj.visible)
    return
  ctx.save()
  ctx.translate(bulletObj.x, bulletObj.y)
  // ctx.rotate(obj.rotate * Math.PI / 180)
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(0, 0, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore()
}
draw.drawHero = (ctx, obj,that) => {
  if (!obj.visible)
    return
  ctx.save()
  ctx.translate(obj.x, obj.y)
  // ctx.rotate(obj.rotate * Math.PI / 180)
  ctx.beginPath();
  ctx.fillStyle = obj.color;
  ctx.arc(0, 0, obj.r, 0, 2 * Math.PI);
  ctx.fill();
  if(obj.ioChiose||that.typeId!=obj.typeId){
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillRect(-obj.r, -12, obj.r*2, -4);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle =  obj.color;
    let leng = (obj.r*2*(obj.life/obj.allLife))
    leng = leng<0?0:leng
    ctx.fillRect(-obj.r, -12, leng, -4);
    ctx.fill();
  }
  ctx.restore()
  
}
export default draw