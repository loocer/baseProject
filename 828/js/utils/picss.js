export const icon = [{
  name: 'boom-icon',
  fileId: '828/icon/boom.png',
},
{
  name: 'addspeed-icon',
  fileId: '828/icon/add-speed.png',
}, {
  name: 'fire-color',
  fileId: '828/icon/firing.png'
},
{
  name: 'mosterHouse',
  fileId: '828/icon/moster-house.png'
}, {
  name: 'bullets',
  fileId: '828/icon/bullets.png'
}
]
export const cool = [{
name: 'slowSpeed',
fileId: '828/cool/speed.png'
}]
export const over = [{
  name: 'over1',
  fileId: '828/button/over1.png'
}, {
  name: 'over2',
  fileId: '828/bg/BG.png'
},
{
  name: 'over3',
  fileId: '828/button/over-b.png'
}
]
export const hand = [{
name: 'hand',
fileId: '828/button/hand.png'
}]
export const booms = [{
  name: 'boom1',
  fileId: '828/booms/1.png',
},
{
  name: 'boom2',
  fileId: '828/booms/2.png',
},
{
  name: 'boom3',
  fileId: '828/booms/3.png',
},
{
  name: 'boom4',
  fileId: '828/booms/4.png',
},
{
  name: 'boom5',
  fileId: '828/booms/5.png',
}
]
export const antBug = (() => {
let list = []
for (let i = 1; i < 6; i++) {
  list.push({
    name: 'antBugs' + i,
    fileId: `828/enemy_ant/${i}.png`,
  })
}
return list
})()
export const bihuBug = (() => {
let list = []
for (let i = 1; i < 6; i++) {
  list.push({
    name: 'bihuBugs' + i,
    fileId: `828/enemy_bihu/${i}.png`,
  })
}
return list
})()
export const yellowBug = (() => {
let list = []
for (let i = 1; i < 21; i++) {
  list.push({
    name: 'yellowBugs' + i,
    fileId: `828/enemy_yellowBug/${i}.png`,
  })
}
return list
})()

export const learnBg = (() => {
let list = []
for (let i = 1; i < 4; i++) {
  list.push({
    name: 'learnBg' + i,
    fileId: `828/bg/learn${i}.png`,
  })
}
return list
})()
export const blackBug = (() => {
let list = []
for (let i = 1; i < 6; i++) {
  list.push({
    name: 'blackBugs' + i,
    fileId: `828/enemy_blackBug/${i}.png`,
  })
}
return list
})()
export const pass = (() => {
let list = []
for (let i = 1; i < 7; i++) {
  list.push({
    name: 'pass' + i,
    fileId: `828/pass/${i}.png`,
  })
}
return list
})()
export const bullet = (() => {
let list = [{
    name: 'bullet1',
    fileId: `828/bullets/bullet.png`,
  },
  {
    name: 'bullet2',
    fileId: `828/bullets/tanst.png`,
  },
  {
    name: 'bullet3',
    fileId: `828/bullets/ggg.png`,
  }
]
return list
})()
// export const netResourse = [{
//   name: 'title',
//   fileId: '828/button/tittle.png'}, ...booms, ...icon,]
export const netResourse = [{
name: 'title',
fileId: '828/button/tittle.png',
}, ...booms, ...icon, ...yellowBug, ...over, ...antBug, ...bihuBug, ...blackBug, ...bullet, ...hand, ...learnBg, ...cool,...pass]