import * as services from '../services/channel';
import { getLoan } from '../services/loan';
import { getCardInfo } from '../services/bank';

export default {
  namespace: 'channel',
  state: {
    bankCard: {},
  },
  reducers: {
    sendSmileCodeSuccess(state, { payload: smileRequestNo }) {
      return { ...state, smileRequestNo };
    },
    authHuaDaoSuccess(state, { payload: data }) {
      return { ...state, huadao: Object.assign({}, state.huadao, { check: data }) };
    },
    getBankCardSuccess(state, { payload: { data, id } }) {
      return { ...state, bankCard: { ...state.bankCard, [id]: data } };
    },
  },
  effects: {
    *authHuaDao({ payload: { loanId, smsCode } }, { call, put, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(services.authHuaDao, userId, token, loanId, smsCode);
      yield put({ type: 'authHuaDaoSuccess', payload: data });
    },
    *authJzy({ payload: { id, authCode } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(services.authJzy, userId, token, id, authCode);
    },
    *authSmile({ payload: { id, mobileCode, requestNo } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(services.authSmile, userId, token, id, mobileCode, requestNo);
    },
    *authBaiRong({ payload: { id, authCode } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(services.authBaiRong, userId, token, id, authCode);
    },
    *authZl({
      payload: {
        id, authCode, lng, lat,
      },
    }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(services.authZhaoLian, userId, token, id, authCode, lng, lat);
    },
    *getBankCard({ payload: id }, { call, select, put }) { // 根据订单编号获取银行卡号
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data: { loanDetailMap: { userBankCardId } } } =
        yield call(getLoan, userId, token, id, true);
      const { data } = yield call(getCardInfo, userId, token, userBankCardId);
      yield put({ type: 'getBankCardSuccess', payload: { data, id } });
    },
    *getHCJingStatus({ payload: { id, type, orderNo } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(services.getHCJingStatus, userId, token, id, type, orderNo);
      return data;
    },
    *getHCJingSignInfo({ payload: id }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(services.getHCJingSignInfo, userId, token, id);
      return data;
    },
    *getHCJingConfirmInfo({ payload: id }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(services.getHCJingConfirmInfo, userId, token, id);
      return data;
    },
    *getHSResult({ payload: id }, { call, select }) {
      try {
        const { user: { id: userId }, token } = yield select(state => state.global);
        const { data } = yield call(services.getHSInsuranceResult, userId, token, id);
        const json = JSON.parse(data);
        return JSON.parse(json.body).proposalStatus;
      } catch (e) {
        return 0;
      }
    },
    *getHSInsurance({ payload: { id, redirect, type } }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(services.getHSInsurance, userId, token, id, redirect, type);
      const json = JSON.parse(data);
      return JSON.parse(json.body);
    },
    *getZLProtocolParams({ payload: id }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      const { data } = yield call(services.getZLProtocolParams, userId, token, id);
      return data;
    },
    *sendHuaDaoCode({ payload: id }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(services.getHuaDaoAuthInfo, userId, token, id);
    },
    *sendSmileCode({ payload: id }, { call, select, put }) {
      try {
        const { user: { id: userId }, token } = yield select(state => state.global);
        const { data } = yield call(services.sendSmileSmsCode, userId, token, id);
        yield put({ type: 'sendSmileCodeSuccess', payload: data });
      } catch (e) {
        if (+e.returnCode === 2003) return { code: 2003 };
        else throw e;
      }
    },
    *sendBaiRongCode({ payload: id }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(services.sendBaiRongSmsCode, userId, token, id);
    },
    *sendJzyCode({ payload: id }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(services.sendJzySmsCode, userId, token, id);
    },
    *sendZlCode({ payload: id }, { call, select }) {
      const { user: { id: userId }, token } = yield select(state => state.global);
      yield call(services.sendZhaoLianSmsCode, userId, token, id);
    },
  },
  subscriptions: {},
};
