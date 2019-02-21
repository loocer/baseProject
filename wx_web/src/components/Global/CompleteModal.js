import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal } from 'antd-mobile';
import { TYPE_URL_MAPPING, TYPE_DECORATION } from '../../constants';
import { getBindCardUrl } from '../../utils/loan-util';
import ImgClose from '../../assets/close_icon_blue@xhdpi.png';
import ImgClose2X from '../../assets/close_icon_blue@2x.png';
import ImgClose3X from '../../assets/close_icon_blue@3x.png';
import ImgPage from '../../assets/page@xhdpi.png';
import ImgPage2X from '../../assets/page@2x.png';
import ImgPage3X from '../../assets/page@3x.png';
import styles from './CompleteModal.less';

@connect(state => state.global)
export default class CompleteModal extends Component {
  state = { visible: false };

  componentWillReceiveProps(nextProps) {
    const { loan, dispatch } = nextProps;

    if (loan && !this.inited) {
      this.inited = true;
      let poped = false;
      if (localStorage && localStorage.getItem) poped = !!localStorage.getItem('loan:poped');
      dispatch({ type: 'global/hasCard' }).then(() => {
        if (!poped) {
          this.setState({ hasCard: this.props.hasCard, visible: true });
          if (localStorage && localStorage.setItem) localStorage.setItem('loan:poped', true);
        }
      });
    }
  }

  onToCompleteHandler = () => {
    const { loan: { loanDetail }, dispatch } = this.props;
    if (!this.state.hasCard && loanDetail.type === TYPE_DECORATION) {
      dispatch(routerRedux.push(getBindCardUrl(loanDetail.type, loanDetail.loanId)));
    } else {
      dispatch(routerRedux.push(`/${TYPE_URL_MAPPING[loanDetail.type]}/${btoa(loanDetail.loanId)}`));
    }
  }

  render() {
    return (<Modal
      visible={this.state.visible}
      closable={false}
      maskClosable={false}
      platform="ios"
      transparent
    >
      <section className={styles.normal}>
        <img
          src={ImgClose}
          srcSet={`${ImgClose2X} 2x,${ImgClose3X} 3x`}
          alt="close"
          className={styles.close}
          onClick={() => { this.setState({ visible: false }); }}
        />
        <img
          src={ImgPage}
          srcSet={`${ImgPage2X} 2x,${ImgPage3X} 3x`}
          alt="page"
          className={styles.page}
        />
        <h3>分期合同已生成</h3>
        <span>请尽快完善您的分期信息!</span>
        <button onClick={this.onToCompleteHandler}>立即完善</button>
      </section>
    </Modal>);
  }
}
