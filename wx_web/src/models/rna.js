import { authenticate } from '../services/rna';

export default {
  namespace: 'rna',
  state: {},
  reducers: {},
  effects: {
    *authenticate({ payload: params }, { call, select }) {
      const { user: { id }, token } = yield select(state => state.global);
      yield call(authenticate, id, token, params);
    },
  },
  subscriptions: {},
};
