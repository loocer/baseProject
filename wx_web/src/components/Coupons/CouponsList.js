import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { createForm } from 'rc-form';
import Img from '../../assets/couple/coupon3.png';
import Loading from '../common/Loading';
import styles from './CouponsList.less';

@connect(state => ({
  list: state.coupons.couponList || [],
  loading: state.loading.models.coupons,
}))
@createForm()
export default class CouponsList extends Component {
  constructor(props) {
    super(props);
    const { list, loading } = props;
    this.state = { list, loading };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'global/getUserInfo' });
    this.props.dispatch({ type: 'coupons/getCouponsList' });
  }

  componentWillReceiveProps(nextProps) {
    const { list, loading } = nextProps;
    this.setState({ list, loading });
  }

  renderList = () => {
    const types = {};
    const list = this.state.list.filter((item) => {
      const actionId = !item.actionId || item.actionId === '家装免息劵' ? '家装免息劵' : actionId;
      if (!types[actionId]) {
        types[actionId] = true;
        return true;
      }
      return false;
    });

    if (!list.length) return <span>暂无优惠券</span>;

    return <Link to="/huodong/11/jzmx"><img src={Img} alt="" /></Link>;
  }

  render() {
    return (<Loading loading={this.state.loading}>
      <div className={styles['coupons-list']}>
        {this.renderList()}
      </div>
    </Loading>);
  }
}
