
export default {

  namespace: 'order',

  state: {},

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
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
        if (pathname === '/order') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
        }
      });
    },
  },
}
