import * as service from '@/api/orders'
const order = {
  state: {
    orderDetail:{},
    JiekuanUser:{
      certType:'s',
      clientType:1,
      imageInfo:null,
    },
    vehicles:[]
  },

  mutations: {
    SET_JIEKUANREN: (state, JiekuanUser) => {
      state.JiekuanUser = JiekuanUser
    },
    SET_VEHICLES: (state, order) => {
      state.order = order
    },
    SET_ORDER_DETAIL: (state, orderDetail) => {
      state.orderDetail = orderDetail
    },
    CHANGE_ORDER: (state, orderDetail) => {
      state.orderDetail = orderDetail
    },
  },

  actions: {
    SetVehicles({ commit,state }, cars) {
      const order = state.orderDetail
      order.vehicles = cars
      let money = 0
      for(let i in cars){
        for(let o in cars[i].insuranceInfos){
          if(cars[i].insuranceInfos[o].productCode === 'B01'){
            money+=cars[i].insuranceInfos[o].premium
          }
        }
      }
      order.businessInsuranceTotalAmount = money
      commit('SET_VEHICLES', order)
    },
    ChangeOrder({commit,state},order){
      commit('CHANGE_ORDER', order)
    },
    OrderList({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.orderList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddOrder({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.addOrder(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetOrder({ commit,state }, param) {
      return new Promise((resolve, reject) => {
        service.getOrder(param).then(response => {
          commit('SET_ORDER_DETAIL', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ModifyOrder({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.modifyOrder(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddJiekuanUser({ commit, state }, param) {
      const applicantVO = state.JiekuanUser
      param.applicantVO = applicantVO
      return new Promise((resolve, reject) => {
        if(applicantVO.id){
          service.modifyJiekuanUser(param).then(response => {
            if(response.status){
              const order = state.orderDetail
              order.applicantVO = response.data
              commit('SET_ORDER_DETAIL', order)
              commit('SET_JIEKUANREN', response.data)
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }else{
          service.addJiekuanUser(param).then(response => {
            response.status&&commit('SET_JIEKUANREN', response.data)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      }
      })
    },
    deleteJiekuanrenId({ commit, state }, param) {
      const je = state.JiekuanUser
      delete je.id
      commit('SET_JIEKUANREN', je)
    },
    GetJiekuanrenByidcard({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getJiekuanrenByidcard(param).then(response => {
          response.data&&commit('SET_JIEKUANREN', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default order
