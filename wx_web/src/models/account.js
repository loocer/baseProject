import { getBankCard, bindCard, removeCard, sendBindCardCode } from '../services/bank';

export default {
  namespace: 'account',
  state: {
    cardID: '123',
  },
  reducers: {
    getBankCardSuccess(state, { payload: card }) {
      return { ...state, card };
    },
    apiContractAPPSuccess(state, { payload: signResult }) {
      return { ...state, signResult };
    },
  },
  effects: {
    *getBankCard(arg0, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getBankCard, userId, token);
      yield put({ type: 'getBankCardSuccess', payload: data });
    },
    *bindCard({ payload: { resultId, captcha } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(bindCard, userId, token, resultId, captcha);
    },
    *removeCard({ payload: cardNum }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(removeCard, userId, token, cardNum);
    },
    *sendBindCardCode({ payload: params }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(sendBindCardCode, userId, token, params);
      return data;
    },
  },
  subscriptions: {},
};
