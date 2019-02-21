import Cookies from 'js-cookie'

const TokenKey = 'token'
const userIdKey = 'userId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getUserId() {
  return Cookies.get(userIdKey)
}

export function setUserId(id) {
  return Cookies.set(userIdKey, id)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
