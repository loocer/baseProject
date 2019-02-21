import request from '@/utils/request'

export function getCityList(curruid) {
  return request({
    url: `/api/v1/users/${curruid}/stores/citys`,
    method: 'get'
  })
}
export function getSignsList(curruid) {
  return request({
    url: `/api/v1/users/${curruid}/stores/signs`,
    method: 'get'
  })
}
export function contractList(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/contracts`,
    method: 'get',
    params: param
  })
}

export function contractTidy(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/contracts/${param.id}/tidy`,
    method: 'post',
    params: param
  })
}

export function contractDiely(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/contracts/${param.id}`,
    method: 'get',
    params: param
  })
}
export function changeStatus(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/contracts/${param.id}/coop-state`,
    method: 'put',
    params: param
  })
}