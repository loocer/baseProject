import request from '../utils/request';

export function search(userId, Authorization, kw, loanId) {
  return request(`/v1/search/${loanId}?fuzzy=${kw}`, {
    headers: { Authorization },
  });
}

export function searchDetail(userId, Authorization, kw) {
  return request(`/v1/search?accurate=${kw}`, {
    headers: { Authorization },
  });
}
