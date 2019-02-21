import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import ImgCoupon from '../../assets/coupon@xhdpi.png';
import ImgCoupon2X from '../../assets/coupon@2x.png';
import ImgCoupon3X from '../../assets/coupon@3x.png';
import ImgClose from '../../assets/close_icon@xhdpi.png';
import ImgClose2X from '../../assets/close_icon@2x.png';
import ImgClose3X from '../../assets/close_icon@3x.png';
import styles from './CouponModal.less';

@connect()
export default class CouponModal extends Component {
  state = { visible: true };

  componentWillMount() {
    const htmlStyles = getComputedStyle(document.documentElement);
    const rem = window.parseInt(htmlStyles.fontSize);
    this.setState({ rem });
  }

  onHideHandler = () => {
    this.setState({ visible: false });
  }

  render() {
    if (!this.state.visible) return null;
    return (<div className={styles.overlayer}>
      <section className={styles.box}>
        <img
          className={styles.close}
          src={ImgClose}
          srcSet={`${ImgClose2X} 2x,${ImgClose3X} 3x`}
          alt=""
          onClick={this.onHideHandler}
        />
        <img
          className={styles.coupon}
          width={this.state.rem * 2.82}
          height={this.state.rem * 2.04}
          src={ImgCoupon}
          srcSet={`${ImgCoupon2X} 2x,${ImgCoupon3X} 3x`}
          alt=""
        />
        <div className={styles.info}>
          <div>— 恭喜获得 —</div>
          <div>家装e分期12期免息券</div>
        </div>
        <Link to="/huodong/sx/use" className={styles.button}>查看活动详情</Link>
      </section>
    </div>);
  }
}
