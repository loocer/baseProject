import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import { getDateString } from '../../utils/dateutil';
import { PAY_TYPE_MAPPING, BALANCE_PAYMENT } from '../../constants';
import Loading from '../common/Loading';
import Button from '../common/Button';
import styles from '../common/List.less';

const FORMATTER = 'YYYY/MM/DD';

@connect(state => ({
  loading: state.loading.models.rent,
  contract: state.rent.contract || {},
}))
@createForm()
export default class IndexPage extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: 'rent/getContract', payload: this.props.id });
  }

  toNextPage = () => {
    this.props.dispatch(routerRedux.go(-1));
  }

  render() {
    const { contract, id } = this.props;
    const data = contract[id] || {};

    return (<div className={styles['step-info']} style={{ paddingBottom: 0 }}>
      <Loading loading={this.props.loading}>
        <WhiteSpace size="xs" />
        <List>
          <InputItem
            editable={false}
            value={data.monthlyPayments ? data.monthlyPayments
              : data.loanAmount / data.loanPeriod}
          >
            月租金
          </InputItem>
          <InputItem
            clear
            editable={false}
            value={`${getDateString(data.rentStartTime, FORMATTER)}至${getDateString(data.rentEndTime, FORMATTER)}`}
          >起止日期
          </InputItem>
          <InputItem editable={false} value={data.balancePayment ? BALANCE_PAYMENT[data.balancePayment] : ''}>分期方式</InputItem>
          <InputItem editable={false} value={PAY_TYPE_MAPPING[data.payType ? data.payType.toLowerCase() : ''] || '暂无数据'}>
            用户已支付
          </InputItem>
          <InputItem
            clear
            editable={false}
            value={`${data.province || ''}${data.city || ''}${data.town || ''}${data.addrDetail || ''}`}
          >房屋地址
          </InputItem>
        </List>
        <List>
          <InputItem editable={false} value={data.storeName}>签约经纪人</InputItem>
          <InputItem editable={false} value={data.storePhone}>联系电话</InputItem>
        </List>
        <footer>
          <Button type="primary" onClick={this.toNextPage}>确定</Button>
        </footer>
      </Loading>
    </div>);
  }
}
