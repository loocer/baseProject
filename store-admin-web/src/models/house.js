import * as services from '../services/house';
import { DEFAULT_PAGE } from '../constants';
import { getAntPage } from '../utils/pageutil';

export default {

  namespace: 'house',

  state: {
    list: [],
    page: DEFAULT_PAGE,
  },

  reducers: {
    getListSuccess(state, { payload: data }) {
      const list = data.list;
      return { ...state, list, page: getAntPage(list) };
    },
  },

  effects: {
     *takeEffect({ payload: { effect, param } }, { put, take, select }) {
      let { role: { id: eId }, token, sId } = yield select(state => state.global);
      if (!eId || !token ||!sId) {
        yield take('global/loginSuccess');
        eId = yield select(state => state.global.role.id);
        token = yield select(state => state.global.token);
        sId = yield select(state => state.global.salesman.id);
      }
      param.eId = eId;
      param.token = token;
      param.sId = sId;
      yield put({ type: effect, payload: param });
    },
    *getList({ payload: { page: { current: pageNo, pageSize }, param } },{ call, put, select }) {
      const { id: sId } = yield select(state => state.global.salesman);
      const token = yield select(state => state.global.token);
      const { data } = yield call(services.getList, sId, token, pageNo, pageSize, param);
      yield put({ type: 'getListSuccess', payload: data });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const param = Object.assign({}, query);
        delete param.pageNo;
        delete param.pageSize;
        delete param.page;
        delete param.per;
        if (pathname === '/house') {
          dispatch({ type: 'getList', payload: { page: getAntPage(query) } });
        }
      });
    },
  },
}
