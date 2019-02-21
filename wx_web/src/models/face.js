import { getRedirectUrl, getLiveCheckResult } from '../services/face';
import { getUserInfo } from '../services/global';

export default {
  namespace: 'face',
  state: {},
  reducers: {
    getRedirectCheckFaceUrlSuccess(state, { payload: { verificationUrl, token } }) {
      const url = verificationUrl && token ? `${verificationUrl}?token=${token}` : null;
      return { ...state, redirect: { url } };
    },
    getLiveCheckResultSuccess(state, { payload: result }) {
      return { ...state, result };
    },
    clearRedirect(state) {
      return { ...state, redirect: null };
    },
  },
  effects: {
    *getLiveCheckResult(arg0, { call, put, select }) {
      try {
        const { user: { id: userId }, token } = yield select(state => state.global);
        const { data } = yield call(getLiveCheckResult, userId, token);
        const { data: { realName, idCard } } = yield call(getUserInfo, userId, token);
        if (!realName || !idCard) return { manuallyCertification: false };
        yield put({ type: 'getLiveCheckResultSuccess', payload: data });
        return data;
      } catch (e) {
        return { manuallyCertification: false };
      }
    },
    *getRedirectCheckFaceUrl({ payload }, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getRedirectUrl, userId, token, payload);
      yield put({ type: 'getRedirectCheckFaceUrlSuccess', payload: data });
    },
  },
  subscriptions: {},
};
