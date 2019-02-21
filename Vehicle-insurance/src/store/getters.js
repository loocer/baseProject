const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo:state => state.user.userInfo,

  dataPermissions:state => state.commonData.dataPermissions,
  users:state => state.user.users,

  modyCar:state => state.car.modyCar,
  detailCar:state => state.car.detailCar,
  carList:state => state.car.carList,
  tuancheStup:state => state.commonData.tuancheStup,

  JiekuanUser:state => state.order.JiekuanUser,
  orderDetail:state => state.order.orderDetail
}
export default getters
