import request from '@/utils/request'


export function vehiclesList(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/vehicless`,
    method: 'get',
    params: param
  })
}
export function addvehicles(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/vehicles`,
    method: 'post',
    data: param.VehicleVO
  })
}
export function modifyvehicles(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/vehicles/${param.id}`,
    method: 'put',
    data: param.modyCar
  })
}
export function carStage(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/vehicle/stage`,
    method: 'get',
    params: param
  })
}
export function getCatByUserId(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/vehicles`,
    method: 'get',
    params: param
  })
}

