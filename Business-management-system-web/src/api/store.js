import request from '@/utils/request'

export function getStoreList(param){    
  return request({
    url: `/api/v1/users/${param.curruid}/stores`,
    method: 'get',
    params: param
  })
}
export function changeSigns(param){    
  return request({
    url: `/api/v1/users/${param.curruid}/stores/${param.storeId}/sign`,
    method: 'put',
    params: param
  })
}
export function storeDetails(param){    
  return request({
    url: `/api/v1/users/${param.curruid}/stores/${param.id}`,
    method: 'get',
    params: param
  })
}
export function getStoreRelationList(param){
  return request({
    url: `/api/v1/users/${param.curruid}/stores/${param.storeId}/relation`,
    method: 'get'
  })
}
export function storeSigned(param){
  return request({
    url: `/api/v1/users/${param.curruid}/stores/signed`,
    method: 'get',
    params: param
  })
}
export function addStoreRalation(param){
  return request({
    url: `/api/v1/users/${param.curruid}/stores/${param.storeId}/relation`,
    method: 'post',
    data: param.relationVO
  })
}
export function getRalationList(param){
  return request({
    url: `/api/v1/users/${param.curruid}/stores/${param.storeId}/relation`,
    method: 'get',
  })
}
export function modifyStoreRatation(param){
  return request({
    url: `/api/v1/users/${param.curruid}/stores/${param.id}`,
    data: param.storeVO,
    method: 'put',
  })
}
export function deleteRatation(param){
  return request({
    url: `/api/v1/users/${param.curruid}/stores/${param.storeId}/relation/${param.id}`,
    method: 'DELETE',
  })
}
export function getReports(param){
  return request({
    url: `/api/v1/users/${param.curruid}/inspect/${param.inspectId}/reports`,
    method: 'get',
  })
}
