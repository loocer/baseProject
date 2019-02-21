import { storeList, getCoupon, getCouponsList, getCouponsState, checkCoupon } from '../services/coupons';
import { getSignature } from '../services/wx';
import { award } from '../services/credit';

export default {
  namespace: 'coupons',
  state: {},
  reducers: {
    getStoreListSuccess(state, { payload: store }) {
      return { ...state, store };
    },
    getCouponSuccess(state, { payload: couponSate }) {
      const { status } = couponSate;
      return { ...state, couponSate, status };
    },
    getCouponsListSuccess(state, { payload: couponList }) {
      return { ...state, couponList };
    },
    getCouponsStateSuccess(state, { payload: isCoupon }) {
      return { ...state, isCoupon };
    },
    getSignatureSuccess(state, { payload: signature }) {
      return { ...state, signature };
    },
    checkCouponSuccess(state, { payload: checkStatus }) {
      return { ...state, checkStatus };
    },
    awardSuccess(state, { payload: data }) {
      return { ...state, award: data };
    },
  },
  effects: {
    *getStoreList({ payload: city }, { call, put, select }) {
      const { user: { id: userId } } = yield select(state => state.global);
      const { data } = yield call(storeList, userId, city);
      yield put({ type: 'getStoreListSuccess', payload: data });
    },
    *getCoupon({ payload: { phoneNo, smsCode, actionName } }, { call, put }) {
      const data = yield call(getCoupon, phoneNo, smsCode, actionName);
      yield put({ type: 'getCouponSuccess', payload: data });
    },
    *getCouponsList(arg0, {
      call, put, select, take,
    }) {
      const { token } = yield select(state => state.global);
      let { user: { loginName } } = yield select(state => state.global);
      if (!loginName) yield take('global/getUserInfoSuccess');
      loginName = yield select(state => state.global.user.loginName);
      const { data } = yield call(getCouponsList, token, loginName);
      yield put({ type: 'getCouponsListSuccess', payload: data });
    },
    *getCouponsState(arg0, { call, put, select }) {
      const { user: { loginName }, token } = yield select(state => state.global);
      if (loginName) {
        const { data } = yield call(getCouponsState, token, loginName);
        yield put({ type: 'getCouponsStateSuccess', payload: data });
      }
    },
    *getSignature({ payload: url }, { call, put, select }) {
      const { token } = yield select(state => state.global);
      const { signature } = yield select(state => state.coupons);
      if (!signature) {
        const data = yield call(getSignature, token, url);
        yield put({ type: 'getSignatureSuccess', payload: data });
      }
    },
    *checkCoupon({ payload: { phoneNo } }, { call, put }) {
      const { status } = yield call(checkCoupon, phoneNo);
      yield put({ type: 'checkCouponSuccess', payload: status });
    },
    *award({ payload: values }, { call, put, select }) {
      const { token } = yield select(state => state.global);
      const { data } = yield call(award, values.phoneNo, token, values);
      yield put({ type: 'awardSuccess', payload: data });
    },
  },
  subscriptions: {},
};
