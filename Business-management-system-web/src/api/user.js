import request from '@/utils/request'

export function getUserInfo(){    
  return request({
    url: '/api/v1/curruser',
    method: 'get'
  })
}
