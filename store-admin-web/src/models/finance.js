
export default {

  namespace: 'finance',

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
        if (pathname === '/finance') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
        } else if (pathname === '/finance/loanlist') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
        } else if (pathname === '/finance/Repayment') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
        } else if (pathname === '/finance/overdue') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
        } else if (pathname === '/finance/rentrefund') {
          dispatch({ type: 'takeEffect', payload: { effect: '', param: { page: getAntPage(query), param } } });
        }
      });
    },
  },
}
