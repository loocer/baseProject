import { award, increase, getCreditInfo } from '../services/credit';

export default {
  namespace: 'credit',
  state: {},
  reducers: {
    awardSuccess(state, { payload: data }) {
      return { ...state, award: data };
    },
    increaseSuccess(state, { payload: data }) {
      return { ...state, increase: data };
    },
    getCreditInfoSuccess(state, { payload: credit }) {
      return { ...state, credit };
    },
  },
  effects: {
    *award({ payload: values }, { call, put, select }) {
      const { user: { loginName }, token } = yield select(state => state.global);
      const { data } = yield call(award, loginName, token, values);
      yield put({ type: 'awardSuccess', payload: data });
    },
    *increase({ payload: values }, { call, put, select }) {
      const { user: { loginName }, token } = yield select(state => state.global);
      const { data } = yield call(increase, loginName, token, values);
      yield put({ type: 'increaseSuccess', payload: data });
    },
    *getCreditInfo(arg0, { call, put, select }) {
      try {
        const { user: { id: userId, loginName }, token } = yield select(state => state.global);
        const { data } = yield call(getCreditInfo, userId, token, loginName);
        yield put({ type: 'getCreditInfoSuccess', payload: data });
      } catch (e) {} // eslint-disable-line
    },
  },
  subscriptions: {},
};
