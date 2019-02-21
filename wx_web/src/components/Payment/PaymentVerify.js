import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { List, WhiteSpace, Toast } from 'antd-mobile';
import InputItem from '../common/InputItem';
import Button from '../common/Button';
import Loading from '../common/Loading';
import styles from './PaymentInfo.less';
import { BANK_TYPE_MAPPING } from '../../constants';

function encryptCardNum(cardNum) {
  return cardNum.replace(/^(.*)(\d{8})(\d{4})$/, (match, $1, $2, $3) => {
    return `${$1}********${$3}`;
  });
}

function encryptCardOwner(owner, idCardNo = '') {
  return owner && owner.replace(/^(.{1})(.*)$/, (match, $1, $2) => `*${$2}`) +
  idCardNo.replace(/^(\d{4})(.*)(.{4})$/, (match, $1, $2, $3) => `(${$1 + '*'.repeat($2.length) + $3})`);
}

@connect(state => ({
  formData: state.payment.formData,
  payInfo: state.payment.payInfo,
  repaymentStatus: state.loan.repaymentStatus,
  repayCard: state.payment.repayCard,
}))
@createForm()
export default class PaymentVerify extends PureComponent {
  static childContextTypes = {
    form: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { loading } = props;
    this.state = { bindInfo: props.repayCard, loading, title: '处理中，请稍后' };
    this.count = 1;
  }

  getChildContext() {
    return { form: this.props.form };
  }

  componentWillMount() {
    if (!this.props.repaymentStatus) this.goToRepayment();
    if (!this.props.repaymentStatus.bindCard) this.props.dispatch({ type: 'payment/getRepaymentCards' });
    this.props.dispatch({ type: 'payment/prePayInit_sync' });
  }

  componentWillReceiveProps(nextProps) {
    const { repayCard } = nextProps;
    if (repayCard) {
      this.setState({
        bindInfo: Object.assign({}, this.state.bindInfo, {
          bankCode: repayCard.bankCode,
          cardNumber: repayCard.cardNo,
          accountName: repayCard.accountName,
        }),
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
      Toast.success('发送成功', 1, null, false);
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

  goToRepayment() {
    this.props.dispatch(routerRedux.push({
      pathname: `/loan/${btoa(this.props.id)}/repayment`,
    }));
  }

  failureHandle = (code) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/payment/fail',
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
      } else if (data.repaymentStatus === 'success') dispatch(routerRedux.push({ pathname: '/payment/success', state: { redirect: btoa(this.props.id) } }));
      else this.failureHandle();
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { error, bindInfo } = this.state;
    const getFieldDecorator = (field, options) => {
      return Object.assign({ id: field, error }, getFieldProps(field, options));
    };
    const bankLogo = bindInfo.bankCode ? `/icon/bank_${bindInfo.bankCode}.svg` : '/icon/bank.svg';
    if (!bindInfo) return <div />;
    return (<Loading loading={this.state.loading} title={this.state.title} mask={false}>
      <div className={`${styles['step-info']} ${styles['payment-info']}`}>
        <WhiteSpace size="xs" />
        <List>
          <section className={styles.info}>
            <div className={styles.card}>
              <img src={bankLogo} alt="" />
              <div className={styles['card-info']}>
                <div className={styles['bank-name']}>
                  <h3>{bindInfo.bankCode ? BANK_TYPE_MAPPING[bindInfo.bankCode] : ''}</h3>
                  <h4>{bindInfo.cardNumber ? encryptCardNum(bindInfo.cardNumber) : '' }</h4>
                </div>
              </div>
              <InputItem
                editable={false}
                value={encryptCardOwner(bindInfo.accountName, bindInfo.idCard)}
                labelNumber={6}
              >持卡人
              </InputItem>
            </div>
          </section>
        </List>
        <WhiteSpace size="xs" />
        <List>
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
            clear
            placeholder="请输入短信验证码"
            maxLength={6}
            type="number"
            labelNumber={6}
            className={styles['extra-code']}
            extra={<a className="check-code" onClick={this.onSendVerifyHandler}>
              {
                typeof this.state.seconds === 'number' ?
                  `${this.state.seconds} s`
                    :
                  '获取验证码'
              }
            </a>}
          >验证码
          </InputItem>
        </List>
        <div className={styles['btn-container']}><Button className="btn btn-reject" type="primary" onClick={this.onConfirmHandle}>立即付款</Button></div>
        {/* <div className={styles['server-protocol']}>
          <a>《宝付支付认证服务协议》</a>
        </div> */}
      </div>
    </Loading>);
  }
}
