import { createForm } from 'rc-form';
import { connect } from 'dva';
import BaseAuth from './BaseAuth';

@connect(state => ({
  loading: state.loading.models.channel || state.loading.models.loan,
  bankCard: state.channel.bankCard,
  channel: {
    auth: 'authJzy',
    captcha: 'sendJzyCode',
    type: 'jzy',
    label: '中信银行',
    canChangeCard: true,
  },
}))
@createForm()
export default class JiaZhaoYe extends BaseAuth {
  state = {};
}
