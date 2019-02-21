import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Icon from '../common/Icon';
import IconSmileSVG from '../../assets/fonts/smile.svg';
import CouponModal from '../Coupons/CouponModal';
import styles from './Result.less';

@connect(state => ({ user: state.global.user || {} }))
export default class AwardSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { couponShow } = this.props;
    if (couponShow === true || couponShow === 'true') {
      setTimeout(() => {
        this.setState({ visible: true });
      }, 1000);
    }
  }

  render() {
    const { limit, showIncreaseLimitBtn } = this.props;
    return (<div className={styles.result}>
      <Icon type={IconSmileSVG} size="lg" />
      <h3>恭喜您授信成功！</h3>
      <div className={styles.gray}>授信审批额度为{limit}元</div>
      {
        showIncreaseLimitBtn === true || showIncreaseLimitBtn === 'true' ? <footer>
          额度不满意？<Link to="/credit/increase">立即提额</Link>
        </footer> : null
      }
      {this.state.visible ? <CouponModal /> : null}
    </div>);
  }
}
