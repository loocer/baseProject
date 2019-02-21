import { login, logout, getInfo } from '@/api/login'
import { getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, setUserId, getUserId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    roles: [],
    userInfo:null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USE_INFO: (state, user) => {
      state.userInfo = user
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if(response.status){
            setToken(response.data.token)
            setUserId(response.data.user.id)
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

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } 
          commit('SET_USE_INFO', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
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

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
