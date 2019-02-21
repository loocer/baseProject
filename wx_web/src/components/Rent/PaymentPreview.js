import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button } from 'antd-mobile';
import Repayment from '../Loan/Repayment';

@connect()
export default class PaymentPreview extends PureComponent {
  onOkHandler = () => {
    this.props.dispatch(routerRedux.go(-1));
  }

  render() {
    return (<Repayment id={this.props.id}>
      <Button type="primary" onClick={this.onOkHandler}>确认</Button>
    </Repayment>);
  }
}
