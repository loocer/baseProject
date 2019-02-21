import { getUserInfo, login, sendCaptcha, sendVoiceCaptcha, getQiNiuToken, resetPassword } from '../services/global';
import { unbind } from '../services/wx';
import { getBankCard } from '../services/bank';

export default {
  namespace: 'global',
  state: {
    user: {},
    messageCount: '',
    qn: {},
  },
  reducers: {
    clearError(state) {
      return { ...state, exception: null };
    },
    throwError(state, { payload: exception }) {
      return { ...state, exception };
    },
    clearLogin(state) {
      return {
        ...state, isLogined: false, user: { id: '123' }, token: null,
      };
    },
    loginSuccess(state, { payload: { user, token } }) {
      return {
        ...state, isLogined: true, user, token,
      };
    },
    getUserInfoSuccess(state, { payload: user }) {
      return { ...state, user };
    },
    getQiNiuTokenSuccess(state, { payload: { token } }) {
      return { ...state, qn: { token, tokenTimes: Date.now() } };
    },
    resetPasswordSuccess(state, { payload: { user, token } }) {
      return { ...state, user, token };
    },
    hasCardSuccess(state, { payload: hasCard }) {
      return { ...state, hasCard };
    },
  },
  effects: {
    *getUserInfo(arg0, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getUserInfo, userId, token);
      yield put({ type: 'getUserInfoSuccess', payload: data });
    },
    *login({ payload: values }, { call, put }) {
      const { data } = yield call(login, values);
      if (data && data.user) {
        const { user, token } = data;
        yield put({ type: 'loginSuccess', payload: { user, token } });
        if (window.location.search.indexOf('code') >= 0) {
          window.history.pushState({}, document.title, `/${window.location.hash}`);
        }
      } else if (Object.keys(values).length > 1) {
        throw new Error('用户名或密码错误');
      }
    },
    *logout(arg0, { call, select }) {
      const { token, user: { id: userId } } = yield select(state => state.global);
      yield call(unbind, userId, token);
    },
    *getQiNiuToken(arg0, { call, put, select }) {
      const { token, tokenTimes } = yield select(state => state.global.qn);
      if (!token || ((Date.now() - tokenTimes) > 5 * 60 * 1000)) {
        const data = yield call(getQiNiuToken);
        yield put({ type: 'getQiNiuTokenSuccess', payload: data });
      }
    },
    *hasCard(arg0, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getBankCard, userId, token);
      yield put({ type: 'hasCardSuccess', payload: data && data.length });
    },
    *sendCaptcha({ payload: phone }, { call }) {
      yield call(sendCaptcha, phone);
    },
    *sendVoiceCaptcha({ payload: phone }, { call }) {
      yield call(sendVoiceCaptcha, phone);
    },
    *resetPassword({ payload: values }, { call, put }) {
      const { data } = yield call(resetPassword, values);
      const { user, token } = data;
      yield put({ type: 'resetPasswordSuccess', payload: { user, token } });
    },
  },
  subscriptions: {},
};
