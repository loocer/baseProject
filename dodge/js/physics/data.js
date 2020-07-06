const mstatus = {
  HIDE: 'HIDE',
  SHOW: 'SHOW',
  WAIT: 'WAIT',
  CRETING: 'CRETING',
  FINISH: 'FINISH'
}
const home = [[
  'power',{exObj:{progress:0,time:100}}
]]
const tool = [{
  color: '#00d0ff',
  status: mstatus.CRETING
}, {
  color: '#c000ff',
  status: mstatus.CRETING
}, {
  color: '#ff4700',
  status: mstatus.CRETING
}]
const sojer = [{
  status: mstatus.CRETING,
  color: '#ff4700',
  num: 4
}, {
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 4
}, {
  color: '#ff4700',
  status: mstatus.CRETING,
  num: 4
}, {
  status: mstatus.CRETING,
  color: '#ff4700',
  num: 4
}, {
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 4
}, {
  color: '#ff4700',
  status: mstatus.CRETING,
  num: 4
}, {
  status: mstatus.CRETING,
  color: '#ff4700',
  num: 4
}, {
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 4
}, {
  color: '#ff4700',
  status: mstatus.CRETING,
  num: 4
}]
const tanke = [{
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 3
}, {
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 12
}, {
  color: '#ff4700',
  status: mstatus.CRETING,
  num: 100
},{
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 3
}, {
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 12
}, {
  color: '#ff4700',
  status: mstatus.CRETING,
  num: 100
},{
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 3
}, {
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 12
}, {
  color: '#ff4700',
  status: mstatus.CRETING,
  num: 100
},{
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 3
}, {
  color: '#c000ff',
  status: mstatus.CRETING,
  num: 12
}, {
  color: '#ff4700',
  status: mstatus.CRETING,
  num: 100
}]
export default new Map([
  ['home', home],
  ['tool', tool],
  ['sojer', sojer],
  ['tanke', tanke]
])