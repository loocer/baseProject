import request, { HEADER_JSON, getParamString, HEADER_URLENCODED } from '../utils/request';

export function count(userId, actionName, phoneNo, url) {
  return request(`/v1/actions/${actionName}/count`, {
    method: 'POST',
    headers: HEADER_JSON,
    body: JSON.stringify({ userId, phoneNo, url }),
  });
}

export function dailingContact(actionName, commercialName, commercimalPhone) {
  return request(`/v1/actions/${actionName}/dailingCount`, {
    method: 'POST',
    headers: HEADER_URLENCODED,
    body: getParamString({
      commercialName,
      commercimalPhone,
    }).slice(1),
  });
}
