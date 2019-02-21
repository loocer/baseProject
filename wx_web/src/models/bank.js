import * as services from '../services/bank';

export default {
  namespace: 'bank',
  state: {
    detail: {},
  },
  reducers: {
    getCardSuccess(state, { payload: { id, data } }) {
      return { ...state, detail: { ...state.detail, [id]: data } };
    },
    getCardsSuccess(state, { payload: cards }) {
      return { ...state, cards };
    },
    isHasCard(state, { payload: hasCard }) {
      return { ...state, hasCard };
    },
  },
  effects: {
    *getCard({ payload: id }, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(services.getCardInfo, userId, token, id);
      yield put({ type: 'getCardSuccess', payload: { data, id } });
    },
    *getCards(arg0, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(services.getBankCard, userId, token);
      yield put({ type: 'getCardsSuccess', payload: data });
    },
    *hasCard(arg0, { call, put, select }) {
      const { user: { id }, token } = yield select(state => state.global);
      const { data } = yield call(services.getBankCard, id, token);
      yield put({ type: 'isHasCard', payload: !!(data && data.length) });
    },
  },
  subscriptions: {},
};
