import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import BaseAuth from './BaseAuth';

@connect(state => ({
  loading: state.loading.models.channel || state.loading.models.loan,
  requestNo: state.channel.smileRequestNo,
  bankCard: state.channel.bankCard,
  channel: {
    label: '宝易付通',
    type: 'smile',
    canChangeCard: true,
  },
}))
@createForm()
export default class SmileAuth extends BaseAuth {
  state = {};

  componentDidMount() {
    const now = (new Date()).getTime();
    const times = localStorage.getItem('$$SMILE');
    const num = times && (now - parseInt(times, 10)) / 1000;

    if (times && num <= 100) {
      this.startLoop(100 - num);
    }
  }

  onOkHandler = () => {
    const { form, dispatch, id } = this.props;
    const requestNo = this.props.requestNo || localStorage.getItem('$$SMILE_CODE');

    form.validateFields((err, value) => {
      if (!err) {
        dispatch({ type: 'channel/authSmile', payload: { id, mobileCode: value.mobileCode, requestNo } }).then(this.success);
      } else {
        Toast.fail('请输入验证码', 2, null, false);
      }
    });
  }

  onSendCodeHandler = () => {
    const { dispatch, id } = this.props;
    const now = (new Date()).getTime();

    dispatch({ type: 'channel/sendSmileCode', payload: id }).then((arg) => {
      if (arg && arg.code === 2003) dispatch(routerRedux.push({ pathname: `/channel/${btoa(id)}/auth/success` }));
      else localStorage.setItem('$$SMILE_CODE', this.props.requestNo);
    });
    localStorage.setItem('$$SMILE', now);
    this.startLoop(100);
  }

  startLoop = (t) => {
    const times = Math.ceil(t);

    if (times) {
      this.setState({ times });
      setTimeout(() => {
        this.startLoop(times - 1);
      }, 1000);
    } else {
      this.setState({ times: null });
      localStorage.removeItem('$$SMILE');
    }
  }
}
