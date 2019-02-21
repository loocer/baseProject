import request, { HEADER_JSON } from '../utils/request';

export function generateSignature(userId, Authorization) {
  return request(`/v1/contract/sign/${userId}`, {
    method: 'POST',
    headers: { Authorization },
  });
}

export function save(userId, Authorization, loanId, params) {
  return request(`/v2/users/${userId}/renting_loans/${loanId}`, {
    method: 'PATCH',
    headers: Object.assign({}, HEADER_JSON, { Authorization }),
    body: JSON.stringify(params),
  });
}

export function submit(userId, Authorization, loanId, selfHelpAuditVo) {
  const params = { submit: true };
  if (selfHelpAuditVo) params.selfHelpAuditVo = selfHelpAuditVo;

  return request(`/v2/users/${userId}/renting_loans/${loanId}`, {
    method: 'PATCH',
    headers: Object.assign({}, HEADER_JSON, { Authorization }),
    body: JSON.stringify(params),
  });
}
