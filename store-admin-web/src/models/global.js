import { login, editPassword, menusInfo, logout } from '../services/global';

export default {
  namespace: 'global',
  state: {
    role: {
      id: '',
    },
    salesman: {
      id: '',
    },
    perms: [],
    isLogined: false,
  },
  reducers: {
    clearError(state) {
      return { ...state, exception: null };
    },
    throwError(state, { payload: exception }) {
      return { ...state, exception };
    },
    initCheckedMenu(state, { payload: path }) {
      return { ...state, path };
    },
    loginSuccess(state, { payload: { role, token, salesman } }) {
      return { ...state, isLogined: true, role, token, salesman };
    },
    getUserMenusSuccess(state, { payload: data }) {
      const menus = data.result.Menu;
      return { ...state, menus };
    },
    logoutSuccess(state) {
      return { ...state, token: null, isLogined: false };
    },
  },
  effects: {
    *takeEffect({ payload: { effect, param } }, { put, take, select }) {
      let { role: { id: eId }, token, salesman: { id: sId } } = yield select(state => state.global);
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
    *login({ payload: values }, { call, put }) {
      const  data = yield call(login, values);
      if (data && data.role) {
        const { role, token, salesman } = data;
        const eId = role.id;
        const sId = salesman.id;
        yield put({ type: 'loginSuccess', payload: { role, token, salesman } });
        yield put({ type: 'getUserInfo', payload: { sId, eId, token } });
      } else if (Object.keys(values).length > 1) {
        throw new Error('用户名或密码错误');
      }
    },
    *logout({ payload: eId }, { call, put }) {
      yield call(logout, eId);
      yield put({ type: 'logoutSuccess' });
    },
    *getUserInfo({ payload: { sId, eId, token } }, { put, call }) {
      const  data  = yield call(menusInfo, sId, eId, token);
      yield put({ type: 'getUserMenusSuccess', payload: data });
    },
    *editPassword({ payload: { eId, values } }, { call }) {
      yield call(editPassword, eId, values);
    },
  },
  subscriptions: {
    setUp({ dispatch, history }) {
      let inited = false;
      return history.listen(({ pathname }) => {
        if (!inited) {
          inited = true;
          dispatch({ type: 'takeEffect', payload: { effect: 'getUserInfo', param: { } } });
          dispatch({ type: 'initCheckedMenu', payload: pathname });
        }
      });
    },
  },
};
