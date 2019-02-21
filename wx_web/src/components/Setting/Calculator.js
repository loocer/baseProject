import React from 'react';
import { createForm } from 'rc-form';
import { List, Button, Toast, WhiteSpace } from 'antd-mobile';
import { connect } from 'dva';
import { TYPE_MAPPING, PAYTYTE, RENT_LOAN_PERIOD, DECORATION_LOAN_PERIOD } from '../../picker-data';
import Loading from '../common/Loading';
import styles from './Calculator.less';
import InputItem from '../common/InputItem';
import Picker from '../common/Picker.js';
import BaseFormContext from '../common/BaseFormContext';

@connect(state => ({
  calculator: state.setting.calculator || {},
  loading: state.loading.models.setting && !state.global.exception,
}))
@createForm()
export default class Calculator extends BaseFormContext {
  constructor(props) {
    super(props);
    const { calculator, loading } = props;
    this.state = {
      calculator, loading, type: '01', payType: 'averageCapital',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { calculator, loading } = nextProps;
    this.setState({ calculator, loading });
  }

  onTypeChangeHandler = (val) => {
    this.setState({ type: val[0] });
  }

  onOkHandler = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const { loanAmount } = value;
        if (this.state.type === '01') {
          if (loanAmount > 400000) {
            Toast.fail('家装最大限额400000', 2);
            return;
          }
        } else if (this.state.type === '02') {
          if (loanAmount > 50000) {
            Toast.fail('房租最大限额50000', 2);
            return;
          }
        }
        value.type = value.type[0] || '';
        value.payType = value.payType[0] || '';
        value.loanPeriod = value.loanPeriod[0] || '';
        this.props.dispatch({ type: 'setting/calculator', payload: value });
      } else {
        Toast.fail(Object.values(err)[0].errors[0].message, 2);
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (<Loading loading={this.state.loading} mask={false}>
      <div className={styles['step-info']}>
        <WhiteSpace />
        <List className={styles.header}>
          <InputItem
            {...getFieldProps('loanAmount', {
              rules: [{ required: true, message: '请输入分期总金额' }],
            })}
            type="money"
            placeholder="请输入分期总金额"
            extra="元"
          >
            分期总金额
          </InputItem>
          <Picker
            data={TYPE_MAPPING}
            extra="请选择"
            {...getFieldProps('type', {
              onChange: this.onTypeChangeHandler,
              rules: [{ required: true, message: '请选择产品类型' }],
            })}
            cols={1}
          >产品类型
          </Picker>
          <Picker
            data={PAYTYTE}
            extra="请选择"
            {...getFieldProps('payType', {
              rules: [{ required: true, message: '请选择服务费支付方式' }],
            })}
            cols={1}
          >服务费支付方式
          </Picker>
          <Picker
            data={this.state.type === '01' ? DECORATION_LOAN_PERIOD : RENT_LOAN_PERIOD}
            extra="请选择"
            {...getFieldProps('loanPeriod', {
              rules: [{ required: true, message: '请选择分期数' }],
            })}
            cols={1}
          >分期数
          </Picker>
        </List>
        <List renderHeader={() => '计算结果'} className={styles.footer}>
          <InputItem
            value={this.state.calculator.monthPrincipal}
            editable={false}
            extra="元"
            placeholder="0.00"
          >
            月还本金
          </InputItem>
          <InputItem
            value={this.state.calculator.poundage}
            editable={false}
            placeholder="0.00"
            extra="元"
            labelNumber={6}
          >
            {this.state.payType === 'averageCapital' ? '月分期服务费' : '总分期服务费'}
          </InputItem>
          <InputItem
            value={this.state.calculator.monthRate}
            editable={false}
            extra="%"
            placeholder="0.00"
          >
            {this.state.type === '01' ? '月利率' : '年利率'}
          </InputItem>
          <InputItem
            value={this.state.calculator.monthlyRepayment}
            editable={false}
            extra="元"
            placeholder="0.00"
            className={styles.totalPayment}
            labelNumber={6}
          >
            每月还款共计
          </InputItem>
        </List>
        <div className={styles['btn-container']}>
          <Button type="primary" onClick={this.onOkHandler}>算一算</Button>
        </div>
        <WhiteSpace size="xl" />
      </div>
    </Loading>);
  }
}
