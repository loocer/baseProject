import request from '@/utils/request'


export function orderList(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/orders`,
    method: 'get',
    params: param
  })
}
export function addOrder(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/orders`,
    method: 'post',
    data: param.orderVO
  })
}
export function getOrder(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/orders/${param.id}`,
    method: 'get',
  })
}
export function modifyOrder(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/orders/${param.id}`,
    method: 'put',
    params: param.orderVO
  })
}
export function addJiekuanUser(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/order/applicants`,
    method: 'post',
    data: param.applicantVO
  })
}
export function modifyJiekuanUser(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/order/applicants/${param.applicantVO.id}`,
    method: 'put',
    data: param.applicantVO
  })
}
export function getJiekuanrenByidcard(param){
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/order/applicants`,
    method: 'get',
    params: param
  })
}