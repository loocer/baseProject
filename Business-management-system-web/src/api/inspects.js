import request from '@/utils/request'
export function getInspectsList(param) {
  return request({
    url: `/api/v1/users/${param.curruid}/inspects`,
    method: 'get',
    params: param
  })
}
