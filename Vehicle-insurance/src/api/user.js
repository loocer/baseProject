import request from '@/utils/request'
import axios from 'axios'

export function getUserInfo() {
  return request({
    url: '/api/v1/curruser',
    method: 'get'
  })
}
export function userList(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/users`,
    method: 'get',
    params: param
  })
}
export function addUser(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/users`,
    method: 'post',
    data: param.userVO 
  })
}
export function modifyUser(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/users/${param.id}`,
    method: 'put',
    data: param.userVO
  })
}
export function deleteUser(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/users/${param.id}`,
    method: 'DELETE',
    data: param
  })
}
export function getImgToken(){
  return axios({
    url: `https://image${process.env.IMG_ADDRESS}.ybejia.com/jsp/controller.jsp?action=getToken`,
    method: 'get'
  })
}
