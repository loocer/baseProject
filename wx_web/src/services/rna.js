import request, { HEADER_JSON } from '../utils/request';

export function authenticate(userId, Authorization, certificationVo) {
  return request(`/v2/users/${userId}/user-info`, {
    method: 'POST',
    headers: Object.assign({}, HEADER_JSON, { Authorization }),
    body: JSON.stringify(certificationVo),
  });
}
