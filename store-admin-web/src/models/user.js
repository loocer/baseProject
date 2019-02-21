import * as services from '../services/user';
import { DEFAULT_PAGE } from '../constants';
import { getAntPage } from '../utils/pageutil';

export default {

  namespace: 'user',

  state: {
    list: [],
    page: DEFAULT_PAGE,
    menu: [],
    operation:[],
  },

  reducers: {
    getRoleListSuccess(state, { payload: datalist }) {
      const list = datalist.data.list;
      return { ...state, list, page: getAntPage(datalist) };
    },
    getRoleAccessSuccess(state, { payload: datasource }) {
      const menu = datasource.all['Menu'];
      const operation = datasource.all['Operation'];
      return { ...state, menu, operation };
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
    *getRoleList({ payload: { page: { current: pageNo, pageSize }, param } },{ call, put, select }) {
      const { id : eId } =  yield select(state => state.global.role);
      const { id: sId } = yield select(state => state.global.salesman);
      const token = yield select(state => state.global.token);
      const  data  = yield call(services.getRoleList, sId, token, pageNo, pageSize, param);
      yield put({ type: 'getRoleListSuccess', payload: data });
      yield put({ type: 'getRoleAccess', payload: { sId, eId, token } });
    },
    *getRoleAccess({ payload: { sId, eId, token } }, { call, put }) {
      const { data } = yield call(services.getRoleAccess, sId, eId, token);
      yield put({ type: 'getRoleAccessSuccess', payload: data });
    },
    *addRole({ payload: values }, { call, put, select }) {
      const { id: sId } = yield select(state => state.global.salesman);
      const token = yield select(state => state.global.token);
      yield call(services.addRole, sId, token, values);
      yield put({ type: 'getRoleList', payload: { page: DEFAULT_PAGE, param: {} } });
    },
    *editRole({ payload: values }, { call, put, select }) {
      const { id: sId } = yield select(state => state.global.salesman);
      const token = yield select(state => state.global.token);
      yield call(services.editRole, sId, token, values);
      yield put({ type: 'getRoleList', payload: { page: DEFAULT_PAGE, param: {} } });
    },
    *deleteRole({ payload: id }, { call, put, select }) {
      const { id: sId } = yield select(state => state.global.salesman);
      const token = yield select(state => state.global.token);
      yield call(services.deleteRole, sId, token, id);
      yield put({type: 'getRoleList', payload: { page: DEFAULT_PAGE, param: {} } });
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
        if (pathname === '/user/management') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
        } else if (pathname === '/user/store') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
        } else if (pathname === '/user/role') {
          dispatch({ type: 'getRoleList', payload: { page: getAntPage(query) } });
        } else if (pathname === '/user/ledger') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
         }
      });
    },
  },
}
