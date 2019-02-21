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
  cards: state.payment.bankCards || [],
  loading: state.loading.models.payment,
  user: state.global.user || {},
}))
export default class PickCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: props.loading };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'payment/getBankCards' });
    this.props.dispatch({ type: 'global/getUserInfo' });
  }

  componentWillReceiveProps(nextprops) {
    this.setState({ loading: nextprops.loading });
  }

  onOkHandler = () => {
    if (!this.card) {
      Toast.fail('请选择银行卡');
    } else {
      this.setState({ loading: true });
      const { dispatch } = this.props;
      if (!this.card.mobile) {
        dispatch({ type: 'payment/preBindCard', payload: { data: this.card } });
        dispatch(routerRedux.push({ pathname: `/payment/${this.props.id}/bindcard` }));
      } else {
        dispatch({ type: 'payment/updateCard', payload: { data: this.card } });
        this.setState({ loading: false });
        this.props.dispatch(routerRedux.go(-1));
      }
    }
  }

  toBindCardPage = () => {
    this.props.dispatch({ type: 'payment/preBindCard', payload: { data: {} } });
    this.props.dispatch(routerRedux.push({ pathname: `/payment/${this.props.id}/bindcard` }));
  }

  toSignPage = (id) => {
    this.props.dispatch(routerRedux.push(`/account/bank/card/${btoa(id)}/verify`));
  }

  renderCard = (card) => {
    const { realName, idCard } = this.props.user;
    const bankCode =
      Object.keys(BANK_TYPE_MAPPING).filter(key => BANK_TYPE_MAPPING[key] === card.bankName)[0];
    const bankLogo = card.bankName ? `/icon/bank_${bankCode}.svg` : '/icon/bank.svg';

    return (<section className={styles.card} key={card.cardNum}>
      <img src={bankLogo} alt="" />
      <div className={styles.info}>
        <h3>{card.bankName}</h3>
        <h5>储蓄卡</h5>
        <div className={styles.number}>{formatCardNum(card.cardNum)}</div>
      </div>
      {
        card.hadsign ? <Radio
          name="card"
          className={styles.radio}
          onChange={() => {
            this.card = {
              bankCode,
              cardNumber: card.cardNum,
              mobile: card.mobile,
              accountName: realName,
              idCard,
            };
            }}
          onCancel={() => { this.card = null; }}
        /> : <a className={styles.unsigned} onClick={this.toSignPage.bind(this, card.id)}>未认证</a>
      }
    </section>);
  }

  render() {
    return (<Loading loading={this.state.loading}>
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
