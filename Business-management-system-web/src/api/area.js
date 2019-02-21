import request from '@/utils/request'
export function getAreaList(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/areas/pages`,
    method: 'get',
    params: param
  })
}

export function addArea(param) {
  return request({
     url: `/api/v1/user/${param.curruid}/areas`,
    method: 'post',
    data: param.areaVO
  })
}

export function deleteArssea(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/areas/${param.id}`,
    method: 'DELETE',
    params: param
  })
}

export function modifyArssea(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/areas/${param.id}`,
    method: 'PUT',
    params: param
  })
}

export function getArea(param) {
  return request({
     url: `/api/v1/user/${param.curruid}/areas/${param.id}`,
    method: 'get',
  })
}