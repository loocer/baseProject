import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Modal } from 'antd-mobile';
import InputItem from '../common/InputItem';
import Button from '../common/Button';
import Loading from '../common/Loading';
import styles from './PaymentVerifyModal.less';

function encryptPhoneNumber(str = '') {
  if (!str) return '';
  return str.replace(/^(\d{3})(\d*)(\d{3})$/, '$1 ***** $3');
}

@connect(state => ({
  payInfo: state.payment.payInfo,
  repaymentStatus: state.loan.repaymentStatus,
  repayCard: state.payment.repayCard,
}))
@createForm()
export default class PaymentVerfyModal extends PureComponent {
  static childContextTypes = {
    form: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { loading: false, title: '处理中，请稍后' };
    this.count = 1;
  }

  getChildContext() {
    return { form: this.props.form };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (!this.props.visible && visible) {
      if (this.state.intervalId) return;
      this.setState({ seconds: 60 });
      this.setState({
        intervalId: setInterval(() => {
          if (this.state.seconds === 0) {
            clearInterval(this.state.intervalId);
            this.setState({ seconds: undefined, intervalId: undefined });
          } else {
            this.setState({ seconds: this.state.seconds ? this.state.seconds - 1 : 60 });
          }
        }, 1000),
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  onSendVerifyHandler = () => {
    if (this.state.intervalId) return;
    const { dispatch, form } = this.props;
    this.setState({ loading: true });
    dispatch({ type: 'payment/prePay' }).then(() => {
      form.setFieldsValue({ smsCode: '' });
      this.setState({
        loading: false,
        intervalId: setInterval(() => {
          if (this.state.seconds === 0) {
            clearInterval(this.state.intervalId);
            this.setState({ seconds: undefined, intervalId: undefined });
          } else {
            this.setState({ seconds: this.state.seconds ? this.state.seconds - 1 : 60 });
          }
        }, 1000),
      });
    }, () => {
      this.setState({ loading: false });
    });
  }


  onConfirmHandle = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.redirect = true;
        this.setState({ loading: true });
        dispatch({ type: 'payment/confirmPay', payload: { ...values } }).then(this.successHandle, this.failureHandle);
      } else {
        this.setState({ error: err });
      }
    });
  }

  failureHandle = (code) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/payment/result/fail',
      search: `?code=${code}`,
    }));
  }

  successHandle = () => {
    this.count++;
    const { dispatch } = this.props;
    if (this.count >= 10) {
      this.failureHandle('processing');
      return;
    }
    dispatch({ type: 'payment/getRepaymentStatus' }).then((data) => {
      if (data.repaymentStatus === 'processing') {
        setTimeout(this.successHandle, 1000);
      } else if (data.repaymentStatus === 'success') dispatch(routerRedux.push({ pathname: '/payment/result/success', state: { redirect: btoa(this.props.id) } }));
      else this.failureHandle();
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { visible, onClose } = this.props;
    const { error } = this.state;
    const getFieldDecorator = (field, options) => {
      return Object.assign({ id: field, error }, getFieldProps(field, options));
    };
    return (<Modal
      visible={visible}
      transparent
      onClose={onClose}
      title="支付认证"
      className={styles.mymodal}
    >
      <Loading loading={this.state.loading} title={this.state.title} mask={false}>
        <div>
          <div>
            <div className={styles.tips}>已发送短信验证码到手机</div>
            <div className={styles.telphone}>
              {encryptPhoneNumber(this.props.repayCard && this.props.repayCard.mobile)}</div>
          </div>

          <InputItem
            {
              ...getFieldDecorator('smsCode', {
                rules: [
                  { required: true, message: '请输入短信验证码' },
                  { pattern: /^(\d{4})(\d{2})?$/, message: '请输入4或6位短信验证码' },
                  (rule, value, callback) => {
                    if (!this.props.payInfo.baofooPayId) {
                      callback('请先获取验证码!');
                    } else {
                      callback();
                    }
                  },
                ],
              })
            }
            placeholder="请输入短信验证码"
            maxLength={6}
            type="number"
            labelNumber={6}
            className={styles['extra-code']}
            extra={<span className={styles['check-code']} onClick={this.onSendVerifyHandler}>
              {
                typeof this.state.seconds === 'number' ?
                  `${this.state.seconds} s`
                    :
                  '重发'
              }
            </span>}
          />

          <div className={styles['btn-container']}><Button className="btn btn-reject" type="primary" onClick={this.onConfirmHandle}>确定</Button></div>
          {/* <div className={styles['server-protocol']}>
            <a>《宝付支付认证服务协议》</a>
          </div> */}
        </div>
      </Loading>
    </Modal>);
  }
}
