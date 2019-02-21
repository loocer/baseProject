import request, { getParamString, HEADER_JSON, HEADER_URLENCODED } from '../utils/request';

export function saveInfo(userId, Authorization, loanId, params) {
  return request(`/v1/users/${userId}/decoration_loans/${loanId}`, {
    method: 'PATCH',
    headers: Object.assign({ Authorization }, HEADER_JSON),
    body: JSON.stringify({ contract: params, step: '1', securities: params.securities }),
  });
}

export function saveCustomerImages(userId, Authorization, loanId, params, times) {
  const pathes = [];
  Object.keys(params).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      pathes.push(`${params[key]},${key}`);
    }
  });
  const data = { channel: 'rm', pathParam: pathes.join(';') };

  if (times) data.times = times;

  return request(`/v1/users/${userId}/loans/${loanId}/loan_attachments`, {
    method: 'POST',
    headers: Object.assign({ Authorization }, HEADER_URLENCODED),
    body: getParamString(data),
  });
}

export function saveImage(userId, Authorization, loanId, params, imageTypeVo) {
  return request(`/v1/users/${userId}/decoration_loans/${loanId}`, {
    method: 'PATCH',
    headers: Object.assign({ Authorization }, HEADER_JSON),
    body: JSON.stringify({ image: params, imageTypeVo, step: '2' }),
  });
}

export function submit(userId, Authorization, loanId) {
  return request(`/v1/users/${userId}/decoration_loans/${loanId}`, {
    method: 'PATCH',
    headers: Object.assign({ Authorization }, HEADER_JSON),
    body: JSON.stringify({ step: '3' }),
  });
}
