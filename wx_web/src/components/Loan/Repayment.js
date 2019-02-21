import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import { Button } from 'antd-mobile';
import Loading from '../common/Loading';
import { getDateString } from '../../utils/dateutil';
import { formatMoney } from '../../utils/stringutil';
import { TYPE_RENT } from '../../constants';
import styles from './Repayment.less';
import RefundModal from './RefundModal';

@connect(state => ({
  repayment: state.loan.repayment,
  detail: state.loan.detail,
  loading: state.loading.models.loan,
}))
@createForm()
export default class Repayment extends Component {
  constructor(props) {
    super(props);
    const { repayment, id } = props;
    this.state = { repayments: repayment[id] || [] };
  }

  componentWillMount() {
    const { id, dispatch } = this.props;
    dispatch({ type: 'loan/getRepayment', payload: id });
    dispatch({ type: 'loan/getLoan', payload: id });
  }

  componentWillReceiveProps(nextProps) {
    const { repayment, id, detail } = nextProps;
    this.setState({
      repayments: repayment[id] || [],
      amount: detail[id] && detail[id].loanDetailMap &&
        (detail[id].loanDetailMap.realAmount || detail[id].loanDetailMap.loanAmount),
    });
  }

  onActivePaymentHandle = () => {
    this.props.dispatch(routerRedux.push(`/payment/${btoa(this.props.id)}`));
  }

  getStateColor = (state = '') => {
    if (state.indexOf('逾期未还') >= 0) return 'red';
    else if (state.indexOf('已还') >= 0) return '#1B88EE';
    return '#8E919A';
  }

  getRowColor = (state = '') => {
    return state.indexOf('已还') >= 0 ? '#1B88EE' : '#8E919A';
  }

  renderFooter = () => {
    const { detail, id } = this.props;
    const data = detail[id] || {};
    const { type } = (data.loanDetailMap || {});
    const disabled = !this.state.repayments.some((item, index, arr) => {
      const { state = '' } = item;
      const now = new Date();
      return ((new Date(item.expectedDate) < now || !index || new Date(arr[index - 1].expectedDate) < now) && state.includes('未还'));
    });

    if (this.props.children) return this.props.children;
    if (type === TYPE_RENT) {
      return (<div className={styles.btn}>
        <RefundModal id={this.props.id} >
          <Button type="ghost" onClick={this.toRent}>申请退租</Button>
        </RefundModal>
        <Button type="primary" className={styles.btnRepayment} disabled={disabled} onClick={this.onActivePaymentHandle}>主动还款</Button>
      </div>);
    }
    return null;
  }

  render() {
    return (<Loading loading={this.props.loading}>
      <div className={`${styles.repayment} ${this.props.className}`}>
        <header>
          <div>
            <h5>分期金额(元)</h5>
            <div className={styles.amount}>{formatMoney(this.state.amount, 2)}</div>
          </div>
          <div>
            <Link to="/loan/repayment/notice" className={styles.tips}>还款须知</Link>
          </div>
        </header>
        <main>
          <div className={styles['table-box']}>
            <table cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th>期数</th>
                  <th>金额</th>
                  <th>还款时间</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.repayments.map(record => (<tr key={record.planId || record.period} >
                    <td style={{ color: `${this.getRowColor(record.state)}` }}>{record.period}</td>
                    <td style={{ color: `${this.getRowColor(record.state)}` }}>￥{record.totalAmount}</td>
                    <td style={{ color: `${this.getRowColor(record.state)}` }}>{getDateString(record.expectedDate)}</td>
                    <td style={{ color: `${this.getStateColor(record.state)}` }}>{record.state === '逾期已还' ? '已还' : record.state}</td>
                  </tr>))
                }
              </tbody>
            </table>
          </div>
        </main>
        <footer>
          {this.renderFooter()}
        </footer>
      </div>
    </Loading>);
  }
}
