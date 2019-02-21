import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, Button, Toast } from 'antd-mobile';
import { BANKS } from '../../picker-data';
import ImagePicker from '../common/ImagePicker/BorderedCenterImagePicker';
import BaseImagePage from '../common/BaseImageUploade';
import Loading from '../common/Loading';
import styles from './ChangeBankCard.less';

@connect(state => ({
  user: state.global.user,
  detail: state.bank.detail,
  loading: state.loading.models.bank || state.loading.models.loan,
  message: state.loan.message,
}))
export default class ChangeBankCard extends BaseImagePage {
  state = {};

  keys = ['card'];

  componentWillReceiveProps({ detail, card }) {
    if (detail && detail[card] && detail[card].bankCardFrontImg) {
      this.onLoadImagesHandler({ card: detail[card].bankCardFrontImg });
    }
  }

  componentWillMount() {
    const { dispatch, card } = this.props;
    dispatch({ type: 'global/getUserInfo' });
    dispatch({ type: 'bank/getCard', payload: card });
  }

  onOkHandler = () => {
    const { dispatch, card, id } = this.props;
    dispatch({ type: 'loan/changeCard', payload: { card, id } }).then(() => {
      Toast.success(this.props.message, 2, () => {
        dispatch(routerRedux.push(`/loan/${btoa(id)}/repayment`));
      });
    });
  }

  toPickCardPage = () => {
    const { dispatch, id } = this.props;
    dispatch(routerRedux.push({
      pathname: '/bank/card/pick',
      search: `?redirect=/loan/${btoa(id)}/bank/card/change&id=${this.props.card}`,
    }));
  }

  render() {
    const { detail, card } = this.props;
    const data = detail[card] || {};
    const cardNo = data.cardNo || '****';
    const arr = BANKS.filter(item => item.value === data.bankCode);

    return (<Loading loading={this.props.loading}>
      <div className={styles['step-info']}>
        <main>
          <List>
            <List.Item extra={<span style={{ color: '#b7c0c9' }}>{this.props.user.realName}</span>}>持卡人</List.Item>
            <List.Item extra={<span style={{ color: '#b7c0c9' }}>{this.props.user.idCard}</span>}>身份证号</List.Item>
          </List>
          <List>
            <List.Item
              extra={arr && arr.length && arr[0].label ? `${arr[0].label}(**** ${cardNo.substr(cardNo.length - 4)})` : ''}
              arrow="horizontal"
              onClick={this.toPickCardPage}
            >银行卡</List.Item>
            <div className={styles.image}>
              <ImagePicker
                title="银行卡正面照片"
                src={this.state[this.keys[0]]}
                onChange={this.onImageUploadedHandler.bind(this, this.keys[0])}
                disabled
              />
            </div>
          </List>
        </main>
        <footer>
          <Button type="primary" onClick={this.onOkHandler}>提交</Button>
        </footer>
      </div>
    </Loading>);
  }
}
