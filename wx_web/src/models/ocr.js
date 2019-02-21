import { cognizeBankCard, cognizeIdCard } from '../services/face';

export default {
  namespace: 'ocr',
  state: {},
  reducers: {
    cognizeBankCardSuccess(state, { payload: bankCard }) {
      return { ...state, bankCard };
    },
    cognizeIdCardSuccess(state, { payload: idCard = {} }) {
      return { ...state, idCard };
    },
  },
  effects: {
    *cognizeBankCard({ payload: bankCardFrontImg }, { call, put, select }) {
      try {
        const { user: { id: userId }, token } = yield select(state => state.global);
        const { data } = yield call(cognizeBankCard, userId, token, bankCardFrontImg);
        yield put({ type: 'cognizeBankCardSuccess', payload: data });
      } catch (e) {
        yield put({ type: 'cognizeBankCardSuccess', payload: {} });
      }
    },
    *cognizeIdCard({ payload: params }, { call, select, put }) {
      try {
        const { user: { id }, token } = yield select(state => state.global);
        const { data } = yield call(cognizeIdCard, id, token, params);
        yield put({ type: 'cognizeIdCardSuccess', payload: data });
      } catch (e) {
        yield put({ type: 'cognizeIdCardSuccess', payload: {} });
        throw { message: '身份证照片识别失败，请输入您的身份信息或重新上传照片' }; // eslint-disable-line
      }
    },
  },
  subscriptions: {},
};
