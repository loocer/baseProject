import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import ImgClose from '../../assets/close_icon@xhdpi.png';
import ImgClose2X from '../../assets/close_icon@2x.png';
import ImgClose3X from '../../assets/close_icon@3x.png';
import ImgSx from '../../assets/couple/event2/sx.png';
import ImgSx2X from '../../assets/couple/event2/sx@2x.png';
import ImgSx3X from '../../assets/couple/event2/sx@3x.png';
import styles from './Event2Modal.less';

@connect()
export default class Event2Modal extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    const { visible, limit, limitShow } = nextProps;

    this.setState({ visible, limit, coupon: limitShow === true || limitShow === 'true' });
  }

  render() {
    return this.state.visible ? <div className={styles.overlayer}>
      <section className={styles.box}>
        <img
          src={ImgClose}
          srcSet={`${ImgClose2X} 2x, ${ImgClose3X} 3x`}
          className={styles.close}
          alt=""
          onClick={() => { this.props.dispatch(routerRedux.push({ pathname: '/huodong/sx/use' })); }}
        />
        <div className={styles.content}>
          <img
            src={ImgSx}
            srcSet={`${ImgSx2X} 2x, ${ImgSx3X} 3x`}
            alt=""
          />
          <h3>恭喜获得<span>￥{this.state.limit}</span>装修授信款</h3>
          {this.state.coupon ? <div>并获得家装分期12期免息券</div> : null}
          <Link to="/huodong/sx/use" className={styles.button}>立即使用额度</Link>
          <div>实际额度均以真实交易额度为准</div>
        </div>
      </section>
    </div> : null;
  }
}
