import request, { HEADER_URLENCODED, getParamString, Y_REQUEST_SOURCE } from '../utils/request';

export function login(values) {
  return request('/authentication', {
    method: 'POST',
    body: getParamString(values),
    headers: Object.assign( Y_REQUEST_SOURCE, HEADER_URLENCODED ),
  });
}

export function menusInfo(sId, eId, token) {
  return request(`/salesmen/${sId}/admin/role/resources/has?roleId=${eId}`, {
    headers: Object.assign({ token }, HEADER_URLENCODED),
  });
}



