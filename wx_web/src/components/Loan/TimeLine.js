import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Loading from '../common/Loading';
import TimeLine from '../Global/LoansTimeLine';

@connect(state => ({
  loans: state.loan.loans || [],
  loading: state.loading.models.loan,
}))
export default class TimeLinePage extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: 'loan/getLoans' });
  }

  render() {
    const { loans, id } = this.props;
    const loan = loans.find(item => item && item.loanDetail.loanId === id);

    return (<Loading loading={this.props.loading}>
      {
        loan ? <div style={{ width: '100%', height: '100%', background: '#FFF' }}>
          <TimeLine
            type={loan.loanDetail.type}
            h5Supported={loan.orderFillInProcedureControlInfo.h5Supported}
            id={loan.loanDetail.loanId}
            dataSource={loan.loanDetail.traces}
          />
        </div> : null
      }
    </Loading>);
  }
}
