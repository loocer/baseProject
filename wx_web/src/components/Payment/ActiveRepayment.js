import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import { List, WhiteSpace, Toast, Popover } from 'antd-mobile';
import Icon from '../common/Icon';
import Picker from '../common/Picker';
import Button from '../common/Button';
import BaseFormContext from '../common/BaseFormContext';
import IconQuestionSVG from '../../assets/fonts/problem.svg';
import PaymentVerifyModal from './PaymentVerifyModal';
import { formatMoney } from '../../utils/stringutil';
import { BANK_TYPE_MAPPING } from '../../constants';
import styles from './ActiveRepayment.less';

function filterRepayment(item, index, arr) {
  return ((new Date(item.expectedDate) < new Date() || index === 0 || new Date(arr[index - 1].expectedDate) < new Date()) && item.state.includes('未还'));
}

@connect(state => ({
  repayment: state.loan.repayment,
  repayCard: state.payment.repayCard || {},
}))
@createForm()
export default class ActiveRepayment extends BaseFormContext {
  state = {};

  componentWillMount() {
    const { dispatch, id } = this.props;

    dispatch({ type: 'loan/getRepayment', payload: id }).then(() => {
      const { repayment } = this.props;
      const repayments = repayment[id] && repayment[id].filter(filterRepayment);
      const periods = repayments && repayments.map(item => ({ label: `${item.period}期`, value: item.period }));
      const repay = repayments && repayments[0];

      this.setState({ repayments, periods, repay });
      // 绑卡的paymentid为最早一期id
      dispatch({
        type: 'payment/init_sync',
        payload: {
          repaymentId: repay.planId,
          transAmount: repay.totalAmount,
          loanId: repay.loanId,
        },
      });
      this.canChangeCard(repay);
    });
  }

  canChangeCard = ({ planId, loanId }) => {
    const { dispatch, id } = this.props;
    dispatch({ type: 'loan/getRepaymentStatus', payload: { loanId, repaymentId: planId } }).then((data) => {
      this.setState({ repaymentStatus: data });
      if (!data.bindCard) {
        dispatch({ type: 'payment/getRepaymentCards', payload: id });
      }
    });
  }

  onOkHandler = (e) => {
    const { dispatch, repayCard } = this.props;
    if (!repayCard.cardNumber) {
      Toast.fail('请选择银行卡');
      return;
    }
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        this.setState({ prepayloading: true });
        dispatch({ type: 'payment/prePay' }).then(() => {
          this.setState({ visible: true, prepayloading: false });
        }, () => {
          this.setState({ prepayloading: false });
        });
      } else {
        Toast.fail('请正确输入信息', 1, null, false);
        this.setState({ error: err });
      }
    });
  }

  onPeriodChangedHandler = ([period]) => {
    const repay = this.state.repayments.find(item => period === item.period);
    this.setState({ repay });
    this.canChangeCard(repay);
  }

  onBankCardChangeHandler = () => {
    if (!this.state.repaymentStatus || !this.state.repaymentStatus.bindCard) return;
    const { dispatch } = this.props;
    dispatch(routerRedux.push({ pathname: '/payment/bank/card/pick', state: { id: btoa(this.props.id) } }));
  }

  onCloseVerifyModal = () => {
    this.setState({ visible: false });
  }

  render() {
    const { repayCard } = this.props;
    const { getFieldProps } = this.props.form;
    const { error } = this.state;
    const getFieldDecorator = (field, options) => {
      return Object.assign({ id: field, error }, getFieldProps(field, options));
    };
    const { repay } = this.state;

    return (<div className={`${styles['step-info']} ${styles['active-repayment']}`}>
      <WhiteSpace size="xs" />
      <List>
        <Picker
          {
            ...getFieldDecorator('period', {
              rules: [{ required: true, message: '请选择还款期号' }],
              onChange: this.onPeriodChangedHandler,
              initialValue: repay ? repay.period : '',
            })
          }
          disabled
          data={this.state.periods}
          cols={1}
        >还款期号
        </Picker>
        <List.Item
          extra={<Popover
            className={styles.popover}
            placement="bottom"
            overlay={[
              <Popover.Item key="1">本金：{repay ? formatMoney(repay.expectedPrinciple, 2) : '0.00'}</Popover.Item>,
              <Popover.Item key="2">利息：{repay ? formatMoney(repay.serviceFee, 2) : '0.00'}</Popover.Item>,
              <Popover.Item key="3">滞纳金：{repay ? formatMoney(repay.overdueAmount, 2) : '0.00'}</Popover.Item>,
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-50, 10],
            }}
          >
            <span>
              {repay ? formatMoney(repay.totalAmount, 2) : '0.00'}
              <Icon
                type={IconQuestionSVG}
                style={{
                  position: 'relative', top: '.05rem', marginLeft: '.05rem',
                }}
              />
            </span>
          </Popover>}
        >待还金额(元)</List.Item>
      </List>
      <WhiteSpace size="xs" />
      <List>
        <List.Item
          onClick={this.onBankCardChangeHandler}
          className={styles.bankcard}
          extra={
            repayCard.cardNumber ? `${BANK_TYPE_MAPPING[repayCard.bankCode]}(${repayCard.cardNumber.substr(repayCard.cardNumber.length - 4)})` : '请选择银行卡'
            }
          arrow="horizontal"
        >银行卡</List.Item>
        <List.Item extra={repayCard.mobile}>预留手机号</List.Item>
      </List>
      <section className={styles.description}>
        <dl>
          <dt>温馨提示:</dt>
          <dd>1. 此功能不支持多期同时还款，请分笔进行操作。</dd>
          <dd>2. 如对还款金额存在疑问，请在还款前拨打客服电话<a href="tel:400-811-8536">400-811-8536</a>询问详情。</dd>
          <dd>3. 还款到账24小时内，还款状态将自动变更。</dd>
        </dl>
      </section>
      <PaymentVerifyModal
        visible={this.state.visible}
        onClose={this.onCloseVerifyModal}
        id={this.props.id}
      />
      <footer><Button onClick={this.onOkHandler} loading={this.state.prepayloading} type="primary" >立即付款</Button></footer>
    </div>);
  }
}
