import { stringify } from 'query-string';
import request, { HEADER_URLENCODED } from '../utils/request';

export function authHuaDao(userId, Authorization, loanId, smsCode) {
  return request(`/v2/users/${userId}/hd/info_check`, {
    method: 'POST',
    headers: Object.assign({}, HEADER_URLENCODED, { Authorization }),
    body: stringify({ loanId, smsCode }),
  });
}

export function authSmile(userId, Authorization, id, mobileCode, requestNo) {
  return request(`/v1/users/${userId}/loans/${id}/smiling_face/auth`, {
    method: 'POST',
    headers: Object.assign({ Authorization }, HEADER_URLENCODED),
    body: stringify({ mobileCode, requestNo }),
  });
}

export function authJzy(userId, Authorization, id, authCode) {
  return request(`/v1/users/${userId}/loans/${id}/jzy/auth`, {
    method: 'POST',
    headers: Object.assign({ Authorization }, HEADER_URLENCODED),
    body: stringify({ authCode }),
  });
}

export function authBaiRong(userId, Authorization, id, authCode) {
  return request(`/v1/users/${userId}/loans/${id}/BAIRONG/auth`, {
    method: 'POST',
    headers: Object.assign({ Authorization }, HEADER_URLENCODED),
    body: stringify({ authCode }),
  });
}

export function authZhaoLian(userId, Authorization, id, authCode, custLongtitude, custLatitude) {
  return request(`/v1/users/${userId}/loans/${id}/ZHAOLIAN/auth`, {
    method: 'POST',
    headers: Object.assign({ Authorization }, HEADER_URLENCODED),
    body: stringify({ authCode, custLongtitude, custLatitude }),
  });
}

export function getHuaDaoAuthInfo(userId, Authorization, loanId) {
  return request(`/v2/users/${userId}/hd/user_auth?loanId=${loanId}`, {
    headers: { Authorization },
  });
}

export function getHCJingStatus(userId, Authorization, loanId, type, orderNo) {
  return request(`/v2/users/${userId}/loans/${loanId}/hcj_info?type=${type}&orderNo=${orderNo}`, {
    headers: { Authorization },
  });
}

export function getHCJingSignInfo(userId, Authorization, loanId) {
  return request(`/v2/users/${userId}/loans/${loanId}/hcj_sign_info`, {
    headers: { Authorization },
  });
}

export function getHCJingConfirmInfo(userId, Authorization, loanId) {
  return request(`/v2/users/${userId}/loans/${loanId}/hcj_confirm_info`, {
    headers: { Authorization },
  });
}

export function getHSInsurance(userId, Authorization, loanId, redirect, type) {
  return request(`/v1/users/${userId}/HUISHANG/insuranceApply/loan/${loanId}/type/${type}?redirectUrl=${redirect}`, {
    headers: { Authorization },
  });
}

export function getHSInsuranceResult(userId, Authorization, loanId) {
  return request(`/v1/users/${userId}/HUISHANG/insuranceApplyQuery/loan/${loanId}`, {
    headers: { Authorization },
  });
}

export function getZLProtocolParams(userId, Authorization, loanId) {
  return request(`/v1/agreement/getAgreement/loans/${loanId}`, {
    headers: { Authorization },
  });
}

export function sendSmileSmsCode(userId, Authorization, id) {
  return request(`/v1/users/${userId}/loans/${id}/smiling_face/send_code`, {
    method: 'POST',
    headers: { Authorization },
  });
}

export function sendJzySmsCode(userId, Authorization, id) {
  return request(`/v1/users/${userId}/jzy/send_code?loanId=${id}`, {
    headers: { Authorization },
  });
}

export function sendBaiRongSmsCode(userId, Authorization, id) {
  return request(`/v1/users/${userId}/loans/${id}/BAIRONG/send_code`, {
    headers: { Authorization },
  });
}

export function sendZhaoLianSmsCode(userId, Authorization, id) {
  return request(`/v1/users/${userId}/loans/${id}/ZHAOLIAN/send_code`, {
    headers: { Authorization },
  });
}
