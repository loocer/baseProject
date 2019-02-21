import { trace } from '../services/global';
import { BASE64 } from '../utils/pattern';

export default {
  namespace: 'trace',
  state: {},
  reducers: {},
  effects: {
    *trace({ payload }, { call, select, take }) {
      const {
        loanId, pathname, search, click,
      } = payload;
      let { user: { id } } = yield select(state => state.global);
      if (!id) yield take('global/loginSuccess');
      id = yield select(state => state.global.user.id);
      try { yield call(trace, id, loanId, pathname, search, click); } catch (e) {} //eslint-disable-line
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const pathes = pathname.split('/');
        const base64Arr = pathes.filter(path => BASE64.test(path));
        let loanId = '-';

        if (base64Arr && base64Arr.length) loanId = window.atob(base64Arr[0]);

        dispatch({ type: 'trace', payload: { loanId, pathname, search } });
      });
    },
  },
};
