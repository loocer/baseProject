import request, { getParamString, HEADER_URLENCODED, HEADER_JSON } from '../utils/request';
import { DEFAULT_PAGE_SIZE } from '../constants';

export function getRoleList(sId, token,
  pageNo = 1, pageSize = DEFAULT_PAGE_SIZE, param = {}) {
  return request(`/salesmen/${sId}/admin/role?pageNo=${pageNo}&pageSize=${pageSize}`, {
    headers: { token },
  });
}

export function getRoleAccess(sId, eId, token) {
  return request(`/salesmen/${sId}/admin/role/resources`, {
    headers: { token },
  });
}

export function addRole(sId, token, values) {
  return request(`/salesmen/${sId}/admin/role`, {
    method: 'POST',
    body:  JSON.stringify(values),
    headers: Object.assign( { token }, HEADER_JSON ),
  });
}

export function editRole(sId, token, values) {
  return request(`/salesmen/${sId}/admin/role`, {
    method: 'PATCH',
    body:  JSON.stringify(values),
    headers: Object.assign( { token }, HEADER_JSON ),
  });
}

export function deleteRole(sId, token, roleId) {
  return request(`/salesmen/${sId}/admin/role?roleId=${roleId}`, {
    method: 'DELETE',
    headers: Object.assign( { token }, HEADER_URLENCODED ),
  });
}

