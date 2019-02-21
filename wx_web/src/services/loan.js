import request, { HEADER_JSON } from '../utils/request';

export function bindCard(userId, loanId, repaymentId, param, Authorization) {
  return request(`/v1/users/${userId}/loans/${loanId}/repayments/${repaymentId}/bind_card`, {
    method: 'POST',
    headers: Object.assign({}, HEADER_JSON, { Authorization }),
    body: JSON.stringify(param),
  });
}

export function cancellation(userId, Authorization, id) {
  return request(`/v2/users/${userId}/loans/${id}/cancellation`, {
    method: 'POST',
    headers: { Authorization },
  });
}

export function changeCard(userId, Authorization, id, oldCardId, newCardId) {
  return request(`/v3/users/${userId}/loans/${id}/cards/${oldCardId}?newBankCardId=${newCardId}`, {
    method: 'PATCH',
    headers: { Authorization },
  });
}

export function confirmPay(userId, loanId, repaymentId, baofooPayId, smsCode, Authorization) {
  return request(`/v2/users/${userId}/loans/${loanId}/repayments/${repaymentId}/confirmPay?baofooPayId=${baofooPayId}&smsCode=${smsCode}`, {
    method: 'POST',
    headers: { Authorization },
  });
}

export function decorationAgreement(userId, Authorization, loanId) {
  return request(`/v1/users/${userId}/decoration_loans/${loanId}/agreement`, {
    method: 'POST',
    headers: { Authorization },
  });
}

export function getLoan(userId, Authorization, id, isSimple) {
  return request(`/v1/users/${userId}/loans/${id}?isSimple=${isSimple}`, {
    headers: { Authorization },
  });
}

export function getContract(Authorization, loanId) {
  return request(`/v1/loans/${loanId}/contracts`, {
    headers: { Authorization },
  });
}

export function getLoans(userId, Authorization) {
  return request(`/v2/users/${userId}/loans/`, {
    headers: { Authorization },
  });
}

export function getToFillLoans(userId, Authorization) {
  return request(`/v1/users/${userId}/loans/?orderStates=00`, {
    headers: { Authorization },
  });
}

export function getRepayment(userId, Authorization, id) {
  return request(`/v1/users/${userId}/loans/${id}/repayment`, {
    headers: { Authorization },
  });
}

export function rentAgreement(userId, Authorization, loanId) {
  return request(`/v1/users/${userId}/renting_loans/${loanId}/agreement`, {
    method: 'POST',
    headers: { Authorization },
  });
}

export function prePay(userId, loanId, repaymentId, param, Authorization) {
  return request(`/v2/users/${userId}/loans/${loanId}/repayments/${repaymentId}/prePay`, {
    method: 'POST',
    headers: Object.assign({}, HEADER_JSON, { Authorization }),
    body: JSON.stringify(param),
  });
}

export function getRepaymentStatus(userId, Authorization, loanId, repaymentId) {
  return request(`/v1/users/${userId}/loans/${loanId}/repayments/${repaymentId}`, {
    headers: { Authorization },
  });
}

export function getRepaymentCards(userId, Authorization, loanId) {
  return request(`/v1/users/${userId}/loans/${loanId}/cards`, {
    headers: { Authorization },
  });
}

export function refund(userId, loanId, param, Authorization) {
  return request(`/v1/users/${userId}/refund/${loanId}`, {
    method: 'POST',
    headers: Object.assign({}, HEADER_JSON, { Authorization }),
    body: JSON.stringify(param),
  });
}
