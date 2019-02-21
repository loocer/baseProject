import React from 'react';
import { connect } from 'dva';
import Loanlist from '../components/Finance/Loanlist';
import Repayment from '../components/Finance/Repayment';
import Overdue from '../components/Finance/Overdue';
import Rentrefund from '../components/Finance/Rentrefund';

export default class Finance extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const mapping = {
      '/finance/loanlist': <Loanlist/>,
      '/finance/Repayment': <Repayment />,
      '/finance/overdue': <Overdue />,
      '/finance/rentrefund': <Rentrefund />,
    };

    return mapping[pathname] || <span>error url</span>;
  }
}
