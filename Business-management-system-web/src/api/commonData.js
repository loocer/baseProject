import request from '@/utils/request'
import axios from 'axios'

export function getCityList(curruid) {
  return request({
    url: `/api/v1/users/${curruid}/stores/citys`,
    method: 'get'
  })
}
export function getStoreAccountList(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/stores/${param.storeId}/accounts`,
    method: 'get',
    params: param
  })
}
export function getAccountRecords(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/audit/records/${param.id}`,
    method: 'get',
    params: param
  })
}
export function getSignsList(curruid) {
  return request({
    url: `/api/v1/users/${curruid}/stores/signs`,
    method: 'get'
  })
}
export function getProvincesList(curruid) {
  return request({
    url: `/api/v1/user/${curruid}/provinces`,
    method: 'get'
  })
}
export function getCitiesList(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/province/cities?pids=${param.pids}`,
    method: 'get'
  })
}
export function getRolesList(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/menus`,
    method: 'get'
  })
}
export function getAreasList(curruid) {
  return request({
    url: `/api/v1/user/${curruid}/areas`,
    method: 'get'
  })
}
export function getImgToken(){
  return axios({
    url: `https://image${process.env.IMG_ADDRESS}.ybejia.com/jsp/controller.jsp?action=getToken`,
    method: 'get'
  })
}
export function contractPermissions(curruid) {
  return request({
    url: `/api/v1/users/${curruid}/contract-permissions`,
    method: 'get'
  })
}
export function getMunes(curruid) {
  return request({
    url: `/api/v1/user/${curruid}/menus`,
    method: 'get'
  })
}

