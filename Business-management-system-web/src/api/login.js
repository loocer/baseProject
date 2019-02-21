import request from '@/utils/request'

export function login(loginName, password) {
  return request({
    url: `/api/v1/authentication`,
    method: 'POST',
    params: {
      loginName,
      password
    }
  })
}