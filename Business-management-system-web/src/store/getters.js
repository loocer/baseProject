const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo:state => state.user.userInfo,
  roles: state => state.user.roles,

  record:state => state.filing.record,
  
  filingStatus:state => state.commonData.filingStatus,
  cityList:state => state.commonData.cityList,
  signs:state => state.commonData.signs,
  jiazu:state => state.commonData.jiazu,
  provincesList:state => state.commonData.provincesList,
  areasCitiesList:state => state.commonData.areasCitiesList,
  areasTree:state => state.commonData.areasTree,
  muneTree:state => state.commonData.muneTree,

  storesRelation:state => state.stores.storesRelation,
  signed:state => state.stores.signed,
  reports:state => state.stores.reports,

  roleList:state => state.system.roleList
}
export default getters
