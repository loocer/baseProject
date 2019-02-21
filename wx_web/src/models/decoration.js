
import { getContract, getLoan } from '../services/loan';
import { saveInfo, saveCustomerImages, saveImage, submit } from '../services/decoration';
import { getBankCard } from '../services/bank';

export default {
  namespace: 'decoration',
  state: {
    contract: {},
    loan: {},
    amount: {},
  },
  reducers: {
    getContractSuccess(state, { payload: { data, id } }) {
      return { ...state, contract: Object.assign({}, state.contract, { [id]: data }) };
    },
    getLoanSuccess(state, { payload: { data, id } }) {
      return { ...state, loan: Object.assign({}, state.loan, { [id]: data }) };
    },
    getLoanAmountSuccess(state, { payload: { amount, id, guarantorCount } }) {
      return {
        ...state,
        amount: Object.assign({}, state.amount, { [id]: amount }),
        guarantorCount: Object.assign({}, state.guarantorCount, { [id]: guarantorCount }),
      };
    },
    hasCardSuccess(state, { payload: hasCard }) {
      return { ...state, hasCard };
    },
  },
  effects: {
    *getContract({ payload: loanId }, { call, put, select }) {
      const { token } = yield select(state => state.global);
      const { data } = yield call(getContract, token, loanId);
      yield put({ type: 'getContractSuccess', payload: { data, id: loanId } });
    },
    *getLoan({ payload: loanId }, {
      call, put, select, take,
    }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getLoan, userId, token, loanId, false);
      const {
        decorationLoanInfo: info, decorationLoanImage: image, securities, fieldsMap,
      } = data;
      info.securities = securities;
      yield put({ type: 'getLoanSuccess', payload: { data: { info, image, fieldsMap }, id: loanId } });
      yield put({ type: 'global/getUserInfo' });
      yield take('global/getUserInfo/@@end');
    },
    *getLoanAmount({ payload: loanId }, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data: { guarantorCount, loanDetailMap: { loanAmount } } } =
        yield call(getLoan, userId, token, loanId, true);
      yield put({ type: 'getLoanAmountSuccess', payload: { amount: loanAmount, id: loanId, guarantorCount } });
    },
    *hasCard(arg0, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getBankCard, userId, token);
      yield put({ type: 'hasCardSuccess', payload: data && data.length });
    },
    *getIndexInfo({ payload: loanId }, {
      select, put, fork, join,
    }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const task1 = yield fork(getBankCard, userId, token);
      const task2 = yield fork(getContract, token, loanId);
      const task3 = yield fork(getLoan, userId, token, loanId, true);
      yield join(task1, task2, task3);
      yield put({ type: 'getLoanSuccess', payload: { data: { info: task3.result().data.loanDetailMap }, id: loanId } });
      yield put({ type: 'hasCardSuccess', payload: !!Object.keys(task1.result().data).length });
      yield put({ type: 'getContractSuccess', payload: { data: task2.result().data, id: loanId } });
    },
    *saveInfo({ payload: { info, id } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(saveInfo, userId, token, id, info);
    },
    *saveCustomerImages({ payload: { image, id, times } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(saveCustomerImages, userId, token, id, image, times);
    },
    *saveImage({ payload: { image, imageTypeVo, id } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(saveImage, userId, token, id, image, imageTypeVo);
    },
    *submit({ payload: { image, id } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(saveImage, userId, token, id, image);
      yield call(submit, userId, token, id);
    },
  },
  subscriptions: {},
};
