import { getQuestions, saveFeedback, getCalculator } from '../services/setting';
import { unbind } from '../services/wx';

export default {
  namespace: 'setting',
  state: {},
  reducers: {
    getQuestionsSuccess(state, { payload: questions }) {
      return { ...state, questions };
    },
    calculatorSuccess(state, { payload: calculator }) {
      return { ...state, calculator };
    },
    unbindSuccess(state) {
      return { ...state, unbind: true };
    },
  },
  effects: {
    *getQuestions(arg0, { call, put, select }) {
      const { token } = yield select(state => state.global);
      const { questions } = yield select(state => state.setting);
      if (!questions) {
        const { data } = yield call(getQuestions, token);
        yield put({ type: 'getQuestionsSuccess', payload: data });
      }
    },
    *saveFeedback({ payload: question }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(saveFeedback, userId, token, question);
    },
    *calculator({ payload: param }, { call, put }) {
      const { data } = yield call(getCalculator, param);
      yield put({ type: 'calculatorSuccess', payload: data });
    },
    *unbind(arg0, { call, select, put }) {
      const { token, user: { id: userId } } = yield select(state => state.global);
      yield call(unbind, userId, token);
      yield put({ type: 'unbindSuccess' });
    },
  },
  subscriptions: {},
};
