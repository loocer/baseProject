import { login, logout } from '@/api/login'
import { getImgToken } from '@/api/user'
import { getUserInfo, userList, addUser, modifyUser, deleteUser } from '@/api/user'
import { getToken, setToken, removeToken, setUserId, getUserId, setCommercialId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    roles: [],
    userInfo:null,
    imgToken:null,
    users:[],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USE_INFO: (state, user) => {
      state.userInfo = user
    },
    SET_IMGTAKEN:(state, token) => {
      state.imgToken = token
    },
    SET_USER_LIST:(state, users) => {
      state.users = users
    },
  },

  actions: {
    // 登录
    Login({ commit }, param) {
      const username = param.username.trim()
      return new Promise((resolve, reject) => {
        login(username, param.password).then(response => {
          if(response.status){
            setToken(response.data.token)
            setUserId(response.data.user.id)
            setCommercialId(response.data.user.commercialId)
            commit('SET_TOKEN', response.data.token)
            commit('SET_USE_INFO', response.data.user)
            resolve(response)
          }else{
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          commit('SET_USE_INFO', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    GetUserList({ commit }, param) {
      return new Promise((resolve, reject) => {
        userList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetImgToken({ commit }){
      return new Promise((resolve, reject) => {
        getImgToken().then(response => {
          commit('SET_IMGTAKEN', response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddUser({ commit }, param){
      return new Promise((resolve, reject) => {
        addUser(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ModifyUser({ commit }, param){
      return new Promise((resolve, reject) => {
        modifyUser(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAllUser({ commit }, param){
      return new Promise((resolve, reject) => {
        userList(param).then(response => {
          commit('SET_USER_LIST', response.data.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteUser({ commit }, param){
      return new Promise((resolve, reject) => {
        deleteUser(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user
