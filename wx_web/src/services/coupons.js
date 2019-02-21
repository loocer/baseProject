import request from '../utils/request';

export function storeList(userId, city) {
  return request(`/v1/commercialInfos?city=${city}&supportCoupon=true`, {
    method: 'GET',
  });
}

export function getCoupon(phoneNo, smsCode, actionName) {
  return request(`/v1/coupons?phoneNo=${phoneNo}&smsCode=${smsCode}&actionName=${actionName}`, {
    method: 'POST',
  });
}

export function getCouponsList(Authorization, userCellphone) {
  return request(`/v1/coupons?phoneNo=${userCellphone}&used=false&actionName=DOUBLE11`, {
    method: 'GET',
    headers: { Authorization },
  });
}

export function getCouponsState(Authorization, userCellphone) {
  return request(`/v1/coupons?phoneNo=${userCellphone}&isValid=true`, {
    method: 'GET',
    headers: { Authorization },
  });
}

export function getCouponsAccount(type, actionName) {
  return request(`/v1/wx/share_count?actionName=${actionName}&type=${type}`, {
    method: 'GET',
  });
}

export function checkCoupon(phoneNo) {
  return request(`/v1/verification_code?phoneNo=${phoneNo}`, {
    method: 'POST',
  });
}
