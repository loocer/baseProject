import request from '@/utils/request'
export function getRouterList(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/functions`,
    method: 'get',
    params: param
  })
}

export function addRouter(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/functions`,
    method: 'post',
    data: param.func
  })
}

export function deleteRouter(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/functions/${param.id}`,
    method: 'DELETE',
    params: param
  })
}

export function getRouter(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/functions/${param.id}`,
    method: 'get',
    params: param
  })
}

export function modifyRouter(param) {
  return request({
    url: `/api/v1/user/${param.curruid}/functions/${param.id}`,
    method: 'put',
    data: param.func
  })
}

export function getRolesList(param){
	return request({
    url: `/api/v1/user/${param.curruid}/roles`,
    method: 'get',
    params: param
  })
}

export function addRoles(param){
  return request({
    url: `/api/v1/user/${param.curruid}/roles`,
    method: 'post',
    data: param.role
  })
}

export function deleteRoles(param){
  return request({
    url: `/api/v1/user/${param.curruid}/roles/${param.id}`,
    method: 'DELETE',
  })
}

export function getRoles(param){
  return request({
    url: `/api/v1/user/${param.curruid}/roles/${param.id}`,
    method: 'GET',
  })
}

export function modifyRoles(param){
  return request({
    url: `/api/v1/user/${param.curruid}/roles/${param.id}`,
    method: 'PUT',
    params: param
  })
}
