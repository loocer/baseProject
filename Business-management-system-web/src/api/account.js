import request from '@/utils/request'


export function userList(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/users`,
    method: 'get',
    params: param
  })
}
export function addUser(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/users`,
    method: 'post',
    data: param.user
  })
}
export function getUserDilel(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/users/${param.id}`,
    method: 'get'
  })
}
export function getCityList(curruid) {
  return request({
    url: `/api/v1/users/${curruid}/stores/citys`,
    method: 'get'
  })
}
export function accountList(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/accounts`,
    method: 'get',
    params: param
  })
}
export function addAccountBase(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/account/config/items`,
    method: 'get',
    params: param
  })
}
export function addAccount(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/accounts/${param.accountId}/config`,
    method: 'post',
    data: param.formObj
  })
}
export function modifyAccountConfig(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/accounts/${param.accountId}/config`,
    method: 'put',
    data: param.formObj
  })
}
export function getAccountConfig(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/accounts/${param.accountId}/config`,
    method: 'get',
    params: param
  })
}
export function modifyUser(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/users/${param.id}`,
    method: 'put',
    data: param.user
  })
}
