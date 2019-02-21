import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Carousel, Button, Modal, Toast } from 'antd-mobile';
import {
  TYPE_MAPPING, TYPE_URL_MAPPING,
  CLIENT_STATE_CREATED, CLIENT_STATE_AUDITING, CLIENT_STATE_LOANING, CLIENT_STATE_PASSED,
  CLIENT_STATE_TURN_DOWN_TO_BOTH, CLIENT_STATE_TURN_DOWN_TO_USER,
  CLIENT_STATE_TURN_DOWN_TO_MERCHANTE, CLIENT_STATE_REPAYMENT, CLIENT_STATE_CANCELED,
  CLIENT_STATE_REJECTED, CLIENT_STATE_PAID_OFF, CLIENT_STATE_REFUNDED, TYPE_RENT,
} from '../../constants';
import { getBindCardUrl } from '../../utils/loan-util';
import Icon from '../common/Icon';
import { formatMoney } from '../../utils/stringutil';
import { deducePlatform } from '../../utils/platform';
import TimeLine from './LoansTimeLine';
import IconArrowRight from '../../assets/fonts/arrow-right.svg';
import ImgPage2X from '../../assets/page@2x.png';
import styles from './Loans.less';

const TRACE_STATES = [
  CLIENT_STATE_AUDITING,
  CLIENT_STATE_LOANING,
  CLIENT_STATE_PASSED,
  CLIENT_STATE_TURN_DOWN_TO_BOTH,
  CLIENT_STATE_TURN_DOWN_TO_USER,
  CLIENT_STATE_TURN_DOWN_TO_MERCHANTE,
];
const DETAIL_STATES = [
  CLIENT_STATE_CANCELED,
  CLIENT_STATE_REJECTED,
  CLIENT_STATE_PAID_OFF,
  CLIENT_STATE_REFUNDED,
];

@connect(state => ({
  hasCard: state.global.hasCard,
}))
export default class Loans extends Component {
  constructor(props) {
    super(props);
    const { loans } = props;
    this.state = { loans };
  }

  toDetailPage = (id, h5Supported) => {
    this.props.dispatch(routerRedux.push({ pathname: `/loan/${btoa(id)}`, search: `?h5Supported=${h5Supported}` }));
  }

  toCompletePage = (type, id, h5Supported) => {
    const { dispatch, hasCard } = this.props;

    if (h5Supported === false && !deducePlatform()) {
      Toast.fail('请使用元宝亿家APP填单!');
      return;
    }

    if (hasCard || type === TYPE_RENT) {
      dispatch(routerRedux.push(`/${TYPE_URL_MAPPING[type]}/${btoa(id)}`));
    } else {
      Modal.alert(<div><div>您还未实名绑卡，需要</div><div>实名绑卡后才可以进行分期哦~</div></div>, '', [
        { text: '稍后再来' },
        {
          text: '开始绑卡',
          style: { background: '#1B88EE', color: '#FFF' },
          onPress: () => {
            dispatch(routerRedux.push(getBindCardUrl(type, id)));
          },
        },
      ]);
    }
  }

  renderTraceLoan = (loanDetail, orderFillInProcedureControlInfo) => {
    const { h5Supported } = orderFillInProcedureControlInfo || {};

    return (<div className={styles.auditing} key={loanDetail.loanId}>
      <section>
        <div>
          <h4>{TYPE_MAPPING[loanDetail.type]}e分期</h4>
          <h2>{formatMoney(loanDetail.loanAmount, 0)}</h2>
        </div>
        <a onClick={this.toDetailPage.bind(this, loanDetail.loanId, h5Supported)}>
          合同详情<Icon type={IconArrowRight} /></a>
      </section>
      <section>
        <TimeLine
          type={loanDetail.type}
          h5Supported={h5Supported}
          id={loanDetail.loanId}
          dataSource={loanDetail.traces}
        />
      </section>
    </div>);
  }

  renderCreatedLoan = (loanDetail, orderFillInProcedureControlInfo) => {
    const { h5Supported } = orderFillInProcedureControlInfo || {};

    return (<div className={styles.normal} key={loanDetail.loanId}>
      <div className={styles.flex}>
        <section><img src={ImgPage2X} alt="" /></section>
        <section className={styles.amount}>￥{formatMoney(loanDetail.loanAmount, 0)}</section>
        <section className={styles.state}>待完善{TYPE_MAPPING[loanDetail.type]}e分期</section>
        <section className={styles.op}>
          <Button type="primary" onClick={this.toCompletePage.bind(this, loanDetail.type, loanDetail.loanId, h5Supported)}>立即完善</Button>
        </section>
      </div>
    </div>);
  }

  renderRepaymentLoan = (loanDetail, repaymentInfo) => {
    return (<div className={styles.repayment} key={loanDetail.loanId}>
      <div className={styles.title}>{TYPE_MAPPING[loanDetail.type]}e分期</div>
      <div className={styles.amount}>{formatMoney(loanDetail.loanAmount, 0)}</div>
      <div className={styles.date}>
        {
          repaymentInfo.overdueDays ? <span style={{ color: '#FF6460' }}>已逾期 {repaymentInfo.overdueDays} 天</span>
            : `还款日期 ${(repaymentInfo.nextPayDate || '').substr(5)}`
        }
      </div>
      <ul>
        <li><div>{repaymentInfo.alreadyPaidAmount}</div>已还款</li>
        <li><div>{repaymentInfo.notPayAmount}</div>未还款</li>
        <li><div>{repaymentInfo.nextPayAmount}</div>下次还款</li>
      </ul>
      <section className={styles.op}>
        <Button type="primary" onClick={this.toDetailPage.bind(this, loanDetail.loanId)}>查看详情</Button>
      </section>
    </div>);
  }

  renderNormalLoan = (loanDetail) => {
    return (<div className={styles.normal} key={loanDetail.loanId}>
      <section><img src={ImgPage2X} alt="" /></section>
      <section className={styles.amount}>￥{formatMoney(loanDetail.loanAmount, 0)}</section>
      <section className={styles.state}>{loanDetail.stateDescription}</section>
      {~DETAIL_STATES.indexOf(loanDetail.clientState) ?
        <Button type="primary" onClick={this.toDetailPage.bind(this, loanDetail.loanId)}>查看详情</Button> : null}
    </div>);
  }

  renderLoan = ({ loanDetail, repaymentInfo, orderFillInProcedureControlInfo }) => {
    if (TRACE_STATES.indexOf(loanDetail.clientState) >= 0) {
      return this.renderTraceLoan(loanDetail, orderFillInProcedureControlInfo);
    }
    if (loanDetail.clientState === CLIENT_STATE_CREATED) {
      return this.renderCreatedLoan(loanDetail, orderFillInProcedureControlInfo);
    }
    if (loanDetail.clientState === CLIENT_STATE_REPAYMENT) {
      return this.renderRepaymentLoan(loanDetail, repaymentInfo || {});
    }

    return this.renderNormalLoan(loanDetail);
  }

  render() {
    return (<div className={styles.normal}>
      <Carousel selectedIndex={0} infinite>
        {this.state.loans.map(loan => this.renderLoan(loan))}
      </Carousel>
    </div>);
  }
}
