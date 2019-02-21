import request, { HEADER_JSON } from '../utils/request';

export function award(phone, Authorization, values) {
  return request(`/v1/credit?phoneNo=${phone}`, {
    method: 'POST',
    body: JSON.stringify({
      creditAwarding: values,
      increaseLimit: false,
    }),
    headers: Object.assign({ Authorization }, HEADER_JSON),
  });
}

export function increase(phone, Authorization, values) {
  return request(`/v1/credit?phoneNo=${phone}`, {
    method: 'POST',
    body: JSON.stringify({
      increaseLimitVo: values,
      increaseLimit: true,
    }),
    headers: Object.assign({ Authorization }, HEADER_JSON),
  });
}

export function getCreditInfo(userId, Authorization, phoneNo) {
  return request(`/v1/users/${userId}/credit?loginPhone=${phoneNo}`, {
    headers: { Authorization },
  });
}
