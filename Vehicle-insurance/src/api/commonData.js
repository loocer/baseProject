import request from '@/utils/request'
import axios from 'axios'

export function dataPermissions(param) {
  return request({
    url: `/api/v1/commercials/${param.commercialId}/users/${param.curruid}/data-permissions`,
    method: 'get'
  })
}
export function getStoreList(param){    
  return request({
    url: `/api/v1/users/${param.curruid}/stores`,
    method: 'get',
    params: param
  })
}