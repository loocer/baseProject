import { count, dailingContact } from '../services/analysis';

const debug = require('debug')('wx-analysis');

export default {
  namespace: 'analysis',
  state: {},
  reducers: {},
  effects: {
    *count({ payload: { url, actionName } }, { select, call }) {
      try {
        const { user: { id: userId, loginName } } = yield select(state => state.global);
        yield call(count, userId, actionName, loginName, url);
      } catch (e) {
        debug(e);
      }
    },
    *dailingContact({ payload: { actionName, commercialName, commercialPhone } }, { call }) {
      try {
        yield call(dailingContact, actionName, commercialName, commercialPhone);
      } catch (e) {
        debug(e);
      }
    },
  },
  subscriptions: {},
};
