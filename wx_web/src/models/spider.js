import { search, searchDetail } from '../services/spider';

export default {
  namespace: 'spider',
  state: {
    searchResult: {},
    searchDetailResult: {},
  },
  reducers: {
    searchSuccess(state, { payload: { data, keyword } }) {
      let result = data;
      if (typeof data === 'string') try { result = JSON.parse(data); } catch(e) {} // eslint-disable-line

      return {
        ...state,
        searchResult: { ...state.searchResult, [keyword]: (result && result.data) || [] },
      };
    },
    searchDetailSuccess(state, { payload: { data, keyword } }) {
      let result = {};
      try { result = JSON.parse(data.data); } catch(e) {}; // eslint-disable-line
      return {
        ...state,
        searchDetailResult: { ...state.searchDetailResult, [keyword]: result.data },
      };
    },
  },
  effects: {
    *search({ payload: { keyword, loanId } }, { call, put, select }) {
      try {
        const { user: { id: userId }, token } = yield select(state => state.global);
        const oldData = yield select(state => state.spider.searchResult);
        if (oldData && oldData[keyword] && oldData[keyword].length) {
          yield put({ type: 'searchSuccess', payload: { data: { data: oldData[keyword] }, keyword } });
        } else {
          const { data } = yield call(search, userId, token, keyword, loanId);
          yield put({ type: 'searchSuccess', payload: { data, keyword } });
        }
      } catch(e) {} //eslint-disable-line
    },
    *searchDetail({ payload: keyword }, { call, put, select }) {
      try {
        const { user: { id: userId }, token } = yield select(state => state.global);
        const fuzzyData = yield select(state => state.spider.searchResult);
        let data = (fuzzyData[keyword] || [])
          .find(item => item.title === keyword && item.regLocation);
        if (!data) data = yield call(searchDetail, userId, token, keyword);
        yield put({ type: 'searchDetailSuccess', payload: { data, keyword } });
        return data;
      } catch(e) {} //eslint-disable-line
    },
  },
  subscriptions: {},
};
