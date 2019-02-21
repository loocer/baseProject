import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { post } from '../../utils/formutil';

@connect()
export default class HCJing extends PureComponent {
  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch({ type: 'channel/getHCJingSignInfo', payload: id }).then((res) => {
      const { url, ...params } = JSON.parse(res);
      const orderNo = params.orderNo || params.orderNumber;
      this.orderNo = orderNo;
      if (url) post(url, params, '_hcj');
      this.loopStatus();
    });

    const meta = document.getElementsByTagName('meta')[1];
    this.oldMeta = meta.getAttribute('content');
    meta.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1');
  }

  componentWillUnmount() {
    this.loopPayment = null;
    this.loopStatus = null;
    const meta = document.getElementsByTagName('meta')[1];
    meta.setAttribute('content', this.oldMeta);
  }

  loopStatus = () => {
    const { dispatch, id } = this.props;

    dispatch({ type: 'channel/getHCJingStatus', payload: { id, type: '01', orderNo: this.orderNo } }).then(({ status }) => {
      if (status === 'middle') {
        setTimeout(this.loopStatus, 1000);
      } else {
        dispatch({ type: 'channel/getHCJingConfirmInfo', payload: id }).then((res) => {
          const { url, ...params } = JSON.parse(res);
          const orderNo = params.orderNo || params.orderNumber;
          this.orderNo = orderNo;
          if (url) post(url, params, '_hcj');
          this.loopPayment();
        });
      }
    });
  }

  loopPayment = () => {
    const { dispatch, id } = this.props;
    dispatch({ type: 'channel/getHCJingStatus', payload: { id, type: '02', orderNo: this.orderNo } }).then(({ status }) => {
      if (status === 'middle') {
        setTimeout(this.loopPayment, 1000);
      } else if (status === 'success') {
        dispatch(routerRedux.push(`/channel/${btoa(id)}/auth/success`));
      }
    });
  }

  render() {
    const style = {
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      border: 'none',
    };
    return (<iframe id="_hcj" name="_hcj" style={style} />);
  }
}
