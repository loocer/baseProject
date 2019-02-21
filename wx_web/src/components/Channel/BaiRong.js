import { connect } from 'dva';
import { createForm } from 'rc-form';
import BaseAuth from './BaseAuth';

@connect(state => ({
  loading: state.loading.models.channel || state.loading.models.loan,
  bankCard: state.channel.bankCard,
  channel: {
    auth: 'authBaiRong',
    captcha: 'sendBaiRongCode',
    label: '京东支付',
    type: 'br',
    canChangeCard: false,
  },
}))
@createForm()
export default class BaiRong extends BaseAuth {
  state = {};
}
