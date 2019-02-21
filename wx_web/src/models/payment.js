import { bindCard, prePay, confirmPay, getRepaymentCards, getRepaymentStatus } from '../services/loan';
import { getBaofooCards } from '../services/bank';

export default {
  namespace: 'payment',
  state: {
    formData: {},
    payInfo: {},
  },
  reducers: {
    init_sync(state, { payload: { repaymentId, loanId, transAmount } }) {
      return {
        ...state,
        payInfo: {
          ...state.payInfo,
          repaymentId,
          loanId,
          transAmount,
        },
      };
    },
    preBindCard(state, { payload: { data } }) {
      return {
        ...state,
        formData: {
          ...data,
        },
      };
    },
    bindCardSuc(state, { data }) {
      return {
        ...state,
        formData: {
          ...state.formData,
          ...data,
        },
        repayCard: {
          ...data,
        },
      };
    },
    updateCard(state, { payload: { data } }) {
      return { ...state, formData: { ...state.formData, ...data }, repayCard: { ...data } };
    },
    prePaySuc(state, { data }) {
      return { ...state, payInfo: { ...state.payInfo, baofooPayId: data } };
    },
    confirmPaySuc(state) {
      return { ...state };
    },
    getRepaymentCardsSuc(state, { data }) {
      return { ...state, repayCard: { ...data, cardNumber: data.cardNo } };
    },
    getBankCardsSuccess(state, { payload: bankCards }) {
      return { ...state, bankCards };
    },
  },
  effects: {
    *bindCard({ payload: { values } }, { call, select, put }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { loanId, repaymentId } = yield select(state => state.payment.payInfo);
      const { data } = yield call(bindCard, userId, loanId, repaymentId, values, token);
      yield put({ type: 'bindCardSuc', data });
    },
    *prePay(arg0, { call, select, put }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { loanId, repaymentId, transAmount } = yield select(state => state.payment.payInfo);
      const { cardNumber } = yield select(state => state.payment.formData);
      const body = { cardNum: cardNumber, transAmount: transAmount.toString() };
      const { data } = yield call(prePay, userId, loanId, repaymentId, body, token);
      yield put({ type: 'prePaySuc', data });
    },
    *confirmPay({ payload: { smsCode } }, { call, select, put }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { loanId, repaymentId, baofooPayId } = yield select(state => state.payment.payInfo);
      const { data } =
        yield call(confirmPay, userId, loanId, repaymentId, baofooPayId, smsCode, token);
      yield put({ type: 'confirmPaySuc', data });
    },
    *getBankCards(arg0, { call, select, put }) {
      const { user: { id }, token } = yield select(state => state.global);
      const { data } = yield call(getBaofooCards, id, token);
      yield put({ type: 'getBankCardsSuccess', payload: data });
    },
    *getRepaymentCards({ payload: id }, { call, select, put }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getRepaymentCards, userId, token, id);
      yield put({ type: 'getRepaymentCardsSuc', data });
    },
    *getRepaymentStatus(arg0, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { loanId, repaymentId } = yield select(state => state.payment.payInfo);
      const { data } = yield call(getRepaymentStatus, userId, token, loanId, repaymentId);
      return data;
    },
  },
};
