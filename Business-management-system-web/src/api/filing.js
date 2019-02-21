import request from '@/utils/request'

export function setFilingList(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/records`,
    method: 'get',
    params: param
  })
}
export function toFiling(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/records`,
    method: 'post',
    data: param.recordVO
  })
}
export function filedList(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/records/${param.recordId}/lists`,
    method: 'get',
  })
}
export function Lists(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/records/${param.recordId}/lists`,
    method: 'post',
    data: param.listVO
  })
}
export function toFilingAgain(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/store/records`,
    method: 'put',
    data: param.recordVO
  })
}
