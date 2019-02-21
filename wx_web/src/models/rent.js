import { getContract, getLoan } from '../services/loan';
import { save, submit, generateSignature } from '../services/rent';

export default {
  namespace: 'rent',
  state: {
    contract: {},
    loan: {},
  },
  reducers: {
    getContractSuccess(state, { payload: { data, id } }) {
      return { ...state, contract: Object.assign({}, state.contract, { [id]: data }) };
    },
    getLoanSuccess(state, { payload: { data, id } }) {
      return { ...state, loan: Object.assign({}, state.loan, { [id]: data }) };
    },
  },
  effects: {
    *getContract({ payload: loanId }, { call, put, select }) {
      const { token } = yield select(state => state.global);
      const { data } = yield call(getContract, token, loanId);
      yield put({ type: 'getContractSuccess', payload: { data, id: loanId } });
    },
    *getLoan({ payload: loanId }, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(getLoan, userId, token, loanId, false);
      const { rentLoanInfo: info, rentLoanImage: image, fieldsMap } = data;
      yield put({ type: 'getLoanSuccess', payload: { data: { info, image, fieldsMap }, id: loanId } });
    },
    *generateSignature(arg0, { call, select }) {
      try {
        const { user: { id: userId }, token } = yield select(state => state.global);
        yield call(generateSignature, userId, token);
      } catch (e) {} //eslint-disable-line
    },
    *saveImage({ payload: { image, imageTypeVo, id } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(save, userId, token, id, { imageInfo: image, imageTypeVo });
    },
    *saveInfo({ payload: { info, id } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(save, userId, token, id, { baseInfo: info });
    },
    *saveBankInfo({ payload: { bankInfo, id } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(save, userId, token, id, { bankCardVo: bankInfo });
    },
    *submit({ payload: { selfHelpAuditVo, id } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(submit, userId, token, id, selfHelpAuditVo);
    },
  },
  subscriptions: {},
};
