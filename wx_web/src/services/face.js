import { stringify } from 'query-string';
import request, { HEADER_JSON } from '../utils/request';

export function getRedirectUrl(userId, Authorization, params) {
  return request(`/v2/users/${userId}/liveCheck/token?${stringify(params)}`, {
    headers: { Authorization },
  });
}

export function getLiveCheckResult(userId, Authorization) {
  return request(`/v2/users/${userId}/liveCheck/result`, {
    headers: { Authorization },
  });
}

export function cognizeIdCard(userId, Authorization, params) {
  const { idCardFront: frontPath, idCardReverse: reversePath, idCardHold: holdPath } = params;

  const body = {};

  if (frontPath) body.frontPath = frontPath.charAt(0) === '/' ? frontPath.substr(1) : frontPath;
  if (reversePath) body.reversePath = reversePath.charAt(0) === '/' ? reversePath.substr(1) : reversePath;
  if (holdPath) body.holdPath = holdPath.charAt(0) === '/' ? holdPath.substr(1) : holdPath;

  return request(`/v1/users/${userId}/idcard`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: Object.assign({ Authorization }, HEADER_JSON),
  });
}

export function cognizeBankCard(userId, Authorization, bankCardFrontImg) {
  return request(`/v1/users/${userId}/bankCard?bankCardFrontImg=${bankCardFrontImg}`, {
    headers: { Authorization },
  });
}
