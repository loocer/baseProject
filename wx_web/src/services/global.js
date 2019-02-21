import request, { getFormData } from '../utils/request';
import { QN_TOKEN_SERVICE_PATH, APP_NAME, TRACE_URL } from '../constants';
import { BASE64 } from '../utils/pattern';

export function getUserInfo(userId, Authorization) {
  return request(`/v2/users/${userId}/user-info`, {
    headers: { Authorization },
  });
}

export function getQiNiuToken() {
  return request(QN_TOKEN_SERVICE_PATH);
}

export function login(param) {
  return request('/v1/authentication', {
    method: 'POST',
    body: getFormData(param),
  });
}

export function sendCaptcha(phone) {
  return request(`/v1/verification_code?phoneNo=${phone}`, {
    method: 'POST',
  });
}

export function sendVoiceCaptcha(phone) {
  return request(`/v1/verification_voice_code?phoneNo=${phone}`, {
    method: 'POST',
  });
}

export function resetPassword({ cellphone, code, newPassword }) {
  return request(`/v1/users?cellphone=${cellphone}&newPassword=${newPassword}&telephoneCode=${code}`, {
    method: 'PATCH',
  });
}

export function trace(userId = '-', loanId = '-', pathname, search, click = '-') {
  let index = 0;
  const path = pathname.split('/').map(item => (BASE64.test(item) ? `:id${index++ || ''}` : item));
  const view = `${path.slice(1).join('-')}${search}`;

  return request(`${TRACE_URL}/${APP_NAME}/${userId}/${loanId}/${encodeURIComponent(view) || '-'}/${click}`, {
    credentials: 'omit',
    mode: 'no-cors',
  });
}
