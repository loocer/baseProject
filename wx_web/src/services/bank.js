import request, { HEADER_JSON } from '../utils/request';

export function getBankCard(userId, Authorization) {
  return request(`/v2/users/${userId}/cards?isDeleted=false`, {
    headers: { Authorization },
  });
}

export function getBaofooCards(userId, Authorization) {
  return request(`/v1/users/${userId}/baofooCards`, {
    headers: { Authorization },
  });
}

export function getCardInfo(userId, Authorization, id) {
  return request(`/v1/users/${userId}/cards/${id}`, {
    headers: { Authorization },
  });
}

export function sendBindCardCode(userId, Authorization, params) {
  return request(`/v2/users/${userId}/cards/getcode`, {
    headers: { Authorization, ...HEADER_JSON },
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export function bindCard(userId, Authorization, resultId, smsCode) {
  return request(`/v2/users/${userId}/verifycard/${resultId}?smsCode=${smsCode}`, {
    headers: { Authorization },
    method: 'POST',
  });
}

export function removeCard(userId, Authorization, cardId) {
  return request(`/v2/users/${userId}/cards/${cardId}`, {
    headers: { Authorization },
    method: 'DELETE',
  });
}
