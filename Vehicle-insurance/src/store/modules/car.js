import * as service from '@/api/car'
const car = {
  state: {
    modyCar: {},
    detailCar:{},
    carList:[],
  },

  mutations: {
    SET_MODIFY_CAR: (state, modyCar) => {
      state.modyCar = modyCar
    },
    SET_DETAIL_CAR: (state, detailCar) => {
      state.detailCar = detailCar
    },
    SET_LIST_CAR: (state, car) => {
      const cars = state.carList
      for(let i in cars){
        if(cars[i].id === car.id){
          cars[i]=car
        }
      }
      state.carList = cars.concat()
    },
    CHANGE_LIST_CAR: (state, cars) => {
      state.carList = cars
    },
    ADD_LIST_CAR: (state, car) => {

      const cars = state.carList
      console.log(car)
      
      console.log(cars)
      state.carList = cars.push(car)
      console.log(state.carList)
    },
    DELETE_LIST_CAR: (state, id) => {
      const cars = state.carList
      let index = null
      for(let i in cars){
        if(cars[i].id === id){
          index = i
        }
      }
      cars.splice(index, 1);
      state.carList = cars.concat()
    }
  },

  actions: {
    Addvehicles({ commit }, param) {
      return new Promise((resolve, reject) => {
        console.log(param)
        service.addvehicles(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    modifyCarList({ commit }, car){
      commit('SET_LIST_CAR', car)
    },
    addCartoList({ commit }, car){
      commit('ADD_LIST_CAR', car)
    },
    deleteCatList({ commit }, id){
      commit('DELETE_LIST_CAR', id)
    },
    setDetail({ commit }, car) {
      commit('SET_DETAIL_CAR', car)
    },
    setModyCar({ commit }, car) {
      commit('SET_MODIFY_CAR', car)
    },
    ChangeCarList({ commit }, car){
      commit('CHANGE_LIST_CAR', car)
    },
    GetCatByUserId({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getCatByUserId(param).then(response => {
          commit('CHANGE_LIST_CAR', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addCar({ commit }, param){
      return new Promise((resolve, reject) => {
        service.addvehicles(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Modifyvehicles({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.modifyvehicles(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CarStage({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.carStage(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default car
