import React, { PureComponent } from 'react';
import { List, Flex, Modal, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import { getDateString } from '../../utils/dateutil';
import { close } from '../../utils/pageutil';
import { deducePlatform } from '../../utils/platform';
import {
  TYPE_URL_MAPPING, TYPE_DECORATION, CLIENT_STATE_PASSED, CLIENT_STATE_REPAYMENT,
  CLIENT_STATE_TURN_DOWN_TO_BOTH, CLIENT_STATE_TURN_DOWN_TO_MERCHANTE,
  CLIENT_STATE_TURN_DOWN_TO_USER, CLIENT_STATE_LOANING, CLIENT_STATE_AUDITING,
  CLIENT_STATE_REJECTED, CLIENT_STATE_CREATED,
} from '../../constants';
import Loading from '../common/Loading';
import Button from '../common/Button';
import styles from './Detail.less';

const { Item } = List;
const { alert } = Modal;

const AUDIT_STATES = [
  CLIENT_STATE_LOANING,
  CLIENT_STATE_TURN_DOWN_TO_BOTH,
  CLIENT_STATE_TURN_DOWN_TO_MERCHANTE,
  CLIENT_STATE_TURN_DOWN_TO_USER,
  CLIENT_STATE_REJECTED,
  CLIENT_STATE_AUDITING,
  CLIENT_STATE_PASSED,
  CLIENT_STATE_LOANING,
];

@connect(state => ({
  detail: state.loan.detail || {},
  agree: state.loan.agree || '',
  loading: state.loading.models.loan,
}))
export default class Detail extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { detail, id } = props;
    this.state = { details: detail[id] || {}, id };
  }

  componentWillMount() {
    const { id, dispatch } = this.props;
    dispatch({ type: 'loan/getLoan', payload: id });
  }

  componentWillReceiveProps(nextProps) {
    const { detail, id } = nextProps;
    if (detail[id]) {
      const { type = '' } = detail[id].loanDetailMap;
      const loanType = TYPE_URL_MAPPING[type];
      this.setState({ details: detail[id], loanType });
    }
  }

  // 驳回
  onRejectHandler = () => {
    const { dispatch, id, h5Supported } = this.props;

    if (h5Supported || deducePlatform()) dispatch(routerRedux.push(`/loan/${btoa(id)}/edit`));
    else Toast.fail('请到元宝亿家APP填单');
  }

  onAwaitAgreeHandler = () => {
    this.props.dispatch({ type: `loan/${this.state.loanType}Agreement`, payload: this.props.id }).then(() => {
      const { id, agree, dispatch } = this.props;

      if (agree && agree.flag) {
        dispatch(routerRedux.push({ pathname: `/channel/${btoa(id)}`, search: `?type=${agree.flag}` }));
      } else {
        Toast.success('订单同意成功', 2, close);
      }
      dispatch({ type: 'loan/agreementSuccess', payload: { data: {}, status: false } });
    });
  }

  onRepaymentHandler = () => {
    this.props.dispatch(routerRedux.push(`/loan/${btoa(this.state.id)}/repayment`));
  }

  /**
   * 待用户同意
   * 29  元宝e家、华道
   * 20  晋商
   */
  alertAwaitAgree = () => {
    alert('是否同意分期?', '', [
      { text: '再想想' },
      { text: '确定', onPress: this.onAwaitAgreeHandler, style: { background: '#1B88EE', color: '#FFF' } },
    ]);
  }

  toCompletePage = (type, id) => {
    this.props.dispatch(routerRedux.push({
      pathname: `/${TYPE_URL_MAPPING[type]}/${btoa(id)}`,
    }));
  }

  toChangeCardPage = () => {
    const { dispatch, id, detail } = this.props;
    const { loanDetailMap = {} } = (detail[id] || {});
    dispatch(routerRedux.push({
      pathname: '/bank/card/pick',
      search: `?redirect=/loan/${btoa(id)}/bank/card/change&id=${loanDetailMap.userBankCardId}`,
    }));
  }

  renderDecoration() {
    const { loanDetailMap = {} } = this.state.details;
    const isAuditing = ~AUDIT_STATES.indexOf(loanDetailMap.clientState);

    return (<List className="loan-status">
      <Item extra={loanDetailMap.orderState}>订单状态</Item>
      <Item extra={loanDetailMap.orderNumber}>订单编号</Item>
      <Item extra={loanDetailMap.title}>商户名称</Item>
      <Item extra={`${loanDetailMap.loanAmount || ''}元`}>申请分期金额</Item>
      <Item extra={`${loanDetailMap.loanPeriod || ''}期`}>申请分期数</Item>
      {
        loanDetailMap.realAmount ? <div>
          <Item extra={`${loanDetailMap.realAmount || ''}元`}>{isAuditing ? '实际审批' : '实际放款'}金额</Item>
          <Item extra={`${loanDetailMap.realPeriod || ''}期`}>{isAuditing ? '审批' : '实际'}分期数</Item>
        </div> : null
      }
      <Item extra={`${loanDetailMap.monthlyPayments || ''}元`}>月还款金额</Item>
    </List>);
  }

  renderRent() {
    const { loanDetailMap = {} } = this.state.details;
    return (<List className="loan-status">
      <Item extra={loanDetailMap.orderState}>订单状态</Item>
      <Item extra={loanDetailMap.orderNumber}>订单编号</Item>
      <Item extra={loanDetailMap.title}>商户名称</Item>
      <Item extra={`${loanDetailMap.loanAmount || ''}元`}>申请分期金额</Item>
      <Item extra={`${loanDetailMap.loanPeriod || ''}期`}>申请分期期数</Item>
      <Item
        extra={`${getDateString(loanDetailMap.rentStartTime)}
          至${getDateString(loanDetailMap.rentEndTime)}`}
      >租房起止日期</Item>
      <Item extra={loanDetailMap.leaseMonth ? `${loanDetailMap.leaseMonth}月${loanDetailMap.leaseDate}天` : ''}>房屋租期</Item>
    </List>);
  }

  render() {
    const { loanDetailMap } = this.state.details;

    if (!loanDetailMap || this.props.loading) return <Loading loading={this.props.loading} />;

    const buttons = [];

    if (loanDetailMap.clientState === 'turn_down_user' || loanDetailMap.clientState === 'turn_down_both') {
      buttons.push({
        key: 'reject',
        btn: <Button className="btn btn-reject" type="primary" onClick={this.onRejectHandler}>驳回修改</Button>,
      });
    }
    if (loanDetailMap.clientState === CLIENT_STATE_PASSED) {
      buttons.push({
        key: 'agree',
        btn: <Button type="primary" inline size="large" onClick={this.onAwaitAgreeHandler}>同意分期</Button>,
      });
    }
    if (loanDetailMap.clientState === CLIENT_STATE_REPAYMENT) {
      buttons.push({
        key: 'repayment',
        btn: <div className={styles.btn}>
          <Button type="ghost" className={styles.btnReplace} onClick={this.toChangeCardPage}>更换银行卡</Button>
          <Button type="primary" className={styles.btnRepayment} onClick={this.onRepaymentHandler}>还款计划</Button>
        </div>,
      });
    }
    if (loanDetailMap.clientState === CLIENT_STATE_CREATED) {
      buttons.push({
        key: 'complete',
        btn: <Button type="primary" onClick={this.toCompletePage.bind(this, loanDetailMap.type, loanDetailMap.loanId)}>立即完善</Button>,
      });
    }

    return (<div className={styles.detail}>
      {loanDetailMap.type === TYPE_DECORATION ? this.renderDecoration() : this.renderRent()}
      {~loanDetailMap.clientState.indexOf('turn_down') ? <List><Item extra={loanDetailMap.remark}>驳回理由</Item></List> : null}
      <Flex className="btn-groups-loan">
        {buttons.map(item => (<Flex.Item key={item.key}>{item.btn}</Flex.Item>))}
      </Flex>
    </div>);
  }
}
