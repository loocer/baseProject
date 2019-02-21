import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast, Button } from 'antd-mobile';
import Radio from '../common/Radio';
import { BANK_TYPE_MAPPING } from '../../constants';
import { formatCardNum } from '../../utils/stringutil';
import Loading from '../common/Loading';
import ImgAdd from '../../assets/add@xhdpi.png';
import ImgAdd2X from '../../assets/add@2x.png';
import ImgAdd3X from '../../assets/add@3x.png';
import styles from './PickCard.less';

@connect(state => ({
  cards: state.bank.cards || [],
  loading: state.loading.models.bank,
}))
export default class PickCard extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: 'bank/getCards' });
  }

  onOkHandler = () => {
    if (!this.card) {
      Toast.fail('请选择银行卡');
    } else {
      const { dispatch, redirect } = this.props;
      if (redirect) {
        dispatch(routerRedux.push({
          pathname: redirect,
          search: `?id=${this.card}`,
        }));
      } else {
        dispatch(routerRedux.go(-1));
      }
    }
  }

  toBindCardPage = () => {
    this.props.dispatch(routerRedux.push('/account/bank/addcard'));
  }

  toSignPage = (id) => {
    this.props.dispatch(routerRedux.push(`/account/bank/card/${btoa(id)}/verify`));
  }

  renderCard = (card) => {
    const bankLogo = card.bankCode ? `/icon/bank_${card.bankCode}.svg` : '/icon/bank.svg';
    const { id } = this.props;

    return (<section className={styles.card} key={card.id}>
      <img src={bankLogo} alt="" />
      <div className={styles.info}>
        <h3>{card.bankCode ? BANK_TYPE_MAPPING[card.bankCode] : ''}</h3>
        <h5>储蓄卡</h5>
        <div className={styles.number}>{formatCardNum(card.cardNo)}</div>
      </div>
      {
        card.hadsign ? <Radio
          name="card"
          className={styles.radio}
          onChange={() => { this.card = card.id; }}
          onCancel={() => { this.card = null; }}
          checked={card.id === id}
        /> : <a className={styles.unsigned} onClick={this.toSignPage.bind(this, card.id)}>未认证</a>
      }
    </section>);
  }

  render() {
    return (<Loading loading={this.props.loading}>
      <div className={styles.wrap}>
        <main>
          {this.props.cards.map(this.renderCard)}
          <section className={styles.add} onClick={this.toBindCardPage}>
            <img src={ImgAdd} srcSet={`${ImgAdd} 1x, ${ImgAdd2X} 2x, ${ImgAdd3X} 3x`} alt="" />
            添加银行卡
          </section>
        </main>
        <footer>
          <Button type="primary" onClick={this.onOkHandler}>下一步</Button>
        </footer>
      </div>
    </Loading>);
  }
}
