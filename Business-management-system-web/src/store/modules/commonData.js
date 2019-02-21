import * as service from '@/api/commonData'
import { recordStatus, merchantType } from '@/utils/statusCode'
import { formatToTree, formatTomMnueTree, formatAreasTree } from '@/utils/tool'
import { getToken, setToken, removeToken } from '@/utils/auth'

const listTool = (obj)=>{
  let list = []
  Object.keys(obj).forEach(function(key){
    let treeObj = {
      value:obj[key].cityId,
      label:obj[key].cityName
    }
    list.push(treeObj)
  });
  return list
}
const statusTool = (obj)=>{
  let list = []
  Object.keys(obj).forEach(function(key){
    let treeObj = {
      value:key,
      label:obj[key]
    }
    list.push(treeObj)
  });
  return list
}
const commonData = {
  state: {
    cityList: [],
    signs:[],
    contractors: [],
    provincesList:[],
    areasCitiesList:[],
    imgToken:null,
    areasTree:[],
    muneTree:[],
    jiazu:statusTool(merchantType),
    filingStatus:statusTool(recordStatus)
  },

  mutations: {
    SET_CITY_LIST: (state, cityList) => {
      state.cityList = listTool(cityList)
    },
    SET_SIGNS_LIST: (state, signList) => {
      state.signs = signList
    },
    SET_AREAS_CITYS_LIST: (state, areasCitiesList) => {
      state.areasCitiesList = areasCitiesList
    },
    SET_PROVINCES_LIST: (state, provincesList) => {
      state.provincesList = provincesList
    },
    SET_IMGTAKEN:(state, token) => {
      state.imgToken = token
    },
    SET_AREA_TREE:(state, areasTree) => {
      state.areasTree = areasTree
    },
    SET_MNUE_TREE:(state, muneTree) => {
      state.muneTree = muneTree
    }
  },

  actions: {
    GetCityList({ commit }, userId) {
      return new Promise((resolve, reject) => {
        service.getCityList(userId).then(response => {
          commit('SET_CITY_LIST', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetImgToken({ commit }){
      return new Promise((resolve, reject) => {
        service.getImgToken().then(response => {
          commit('SET_IMGTAKEN', response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetSignsList({ commit }, userId) {
      return new Promise((resolve, reject) => {
        service.getSignsList(userId).then(response => {
          let list = []
          Object.keys(response.data).forEach(function(key){
            let treeObj = {
              value:response.data[key].id,
              label:response.data[key].name
            }
            list.push(treeObj)
          });
          commit('SET_SIGNS_LIST', list)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetStoreAccountList({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getStoreAccountList(param).then(response => {
          let list = []
          Object.keys(response.data).forEach(function(key){
            let treeObj = {
              value:response.data[key].id,
              label:response.data[key].cardNo
            }
            list.push(treeObj)
          });
          resolve(list)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAccountRecords({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getAccountRecords(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetProvincesList({ commit }, param){
      return new Promise((resolve, reject) => {
        service.getProvincesList(param).then(response => {
          commit('SET_PROVINCES_LIST', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAreaCitiesList({ commit }, param){
      return new Promise((resolve, reject) => {
        service.getCitiesList(param).then(response => {
          commit('SET_AREAS_CITYS_LIST', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRolesList({ commit }, param){
      return new Promise((resolve, reject) => {
        service.getRolesList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAreasTree({ commit }, curruid){
      return new Promise((resolve, reject) => {
        service.getAreasList(curruid).then(response => {
          const treeArea = formatAreasTree(response.data)
          console.log(treeArea)
          commit('SET_AREA_TREE', treeArea)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ContractPermissions({ commit }, curruid){
      return new Promise((resolve, reject) => {
        service.contractPermissions(curruid).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetMuneTree({ commit }, curruid){
      return new Promise((resolve, reject) => {
        service.getMunes(curruid).then(response => {
          console.log(response.data.list)
          const mnueTree = formatTomMnueTree(response.data.list)
          commit('SET_MNUE_TREE', mnueTree)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default commonData
