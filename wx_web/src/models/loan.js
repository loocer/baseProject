import { getLoan, getLoans, getRepayment, cancellation, changeCard, decorationAgreement, rentAgreement, getRepaymentStatus, refund } from '../services/loan';

export default {
  namespace: 'loan',
  state: {
    detail: {},
    repayment: {},
    hcj: {},
    hcjAuthorized: {},
  },
  reducers: {
    agreementSuccess(state, { payload: { data: agree } }) {
      return { ...state, agree };
    },
    changeCardSuccess(state, { payload: message }) {
      return { ...state, message };
    },
    getLoanSuccess(state, { payload: { data, id } }) {
      return { ...state, detail: Object.assign({}, state.detail, { [id]: data }) };
    },
    getLoansSuccess(state, { payload: data }) {
      const loans = data.filter(item => item.loanDetail.stateDescription !== '状态异常');
      loans.sort((arg0, arg1) => arg1.loanDetail.createDate - arg0.loanDetail.createDate);
      return { ...state, loans };
    },
    getRepaymentSuccess(state, { payload: { data: { result }, id } }) {
      const data = result.map((item) => {
        if (!item.state) item.state = '未还';
        item.totalAmount = item.totalAmount || item.expectedAmount;
        return item;
      });
      return { ...state, repayment: Object.assign({}, state.repayment, { [id]: data }) };
    },
    getRepaymentStatusSuc(state, { payload: repaymentStatus }) {
      return { ...state, repaymentStatus };
    },
  },
  effects: {
    *changeCard({ payload: { card, id } }, { call, select, put }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data: { loanDetailMap: { userBankCardId } } }
        = yield call(getLoan, userId, token, id, true);
      const { data } = yield call(changeCard, userId, token, id, userBankCardId, card);
      yield put({ type: 'changeCardSuccess', payload: data });
    },
    *getLoan({ payload: id }, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getLoan, userId, token, id, true);
      yield put({ type: 'getLoanSuccess', payload: { data, id } });
    },
    *getLoans(arg0, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getLoans, userId, token);
      yield put({ type: 'getLoansSuccess', payload: data });
    },
    *getRepayment({ payload: id }, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getRepayment, userId, token, id);
      yield put({ type: 'getRepaymentSuccess', payload: { data, id } });
    },
    *userCancellation({ payload: id }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(cancellation, userId, token, id);
    },
    *decorationAgreement({ payload: id }, { call, select, put }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(decorationAgreement, userId, token, id);
      yield put({ type: 'agreementSuccess', payload: { data } });
    },
    *rentAgreement({ payload: id }, { call, select, put }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(rentAgreement, userId, token, id);
      yield put({ type: 'agreementSuccess', payload: { data } });
    },
    *refund({ payload: { values, loanId } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(refund, userId, loanId, values, token);
    },
    *getRepaymentStatus({ payload: { loanId, repaymentId } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getRepaymentStatus, userId, token, loanId, repaymentId);
      // yield put({ type: 'getRepaymentStatusSuc', payload: data });
      return data;
    },
  },
  subscriptions: {},
};
