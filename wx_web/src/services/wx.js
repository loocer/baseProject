import request from '../utils/request';
import { WX_URL_PREFIX } from '../constants';

export function unbind(userId, Authorization) {
  return request(`/v1/users/${userId}/wx/un_sign`, {
    headers: { Authorization },
  });
}

export function getSignature(Authorization, url = window.location.href.split('#')[0]) {
  return request(`/jsapi/signature?url=${url}`, {
    method: 'GET',
    headers: { Authorization, Accept: 'application/json' },
  }, WX_URL_PREFIX);
}
