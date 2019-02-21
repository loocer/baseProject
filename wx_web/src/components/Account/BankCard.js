import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast, Modal } from 'antd-mobile';
import Icon from '../common/Icon';
import Loading from '../common/Loading';
import { BANK_TYPE_MAPPING } from '../../constants';
import { formatCardNum } from '../../utils/stringutil';
import ImgDeleteSVG from '../../assets/fonts/delete-circle.svg';
import IconEmptyCard from '../../assets/fonts/empty-card.svg';
import IconAdd from '../../assets/fonts/add.svg';
import styles from './BankCard.less';

const STATES = [
  '使用中',
  '状态异常',
];

@connect(state => ({
  card: state.account.card || {},
  loading: state.loading.models.account,
}))
export default class BankCard extends Component {
  componentWillMount() {
    this.props.dispatch({ type: 'account/getBankCard' });
  }

  onClickRemoveHander = (cardId) => {
    Modal.alert('是否确定删除该银行卡?', '', [
      {
        text: '确定',
        onPress: () => {
          this.props.dispatch({ type: 'account/removeCard', payload: cardId }).then(() => {
            Toast.success('删除成功', 2, () => {
              this.props.dispatch({ type: 'account/getBankCard' });
            });
          });
        },
      },
      { text: '取消', style: { background: '#1B88EE', color: '#FFF' } },
    ]);
  }

  toBindCardPage = () => {
    this.props.dispatch(routerRedux.push('/account/bank/addcard'));
  }

  toSignPage = (id) => {
    this.props.dispatch(routerRedux.push(`/account/bank/card/${btoa(id)}/verify`));
  }

  renderEmptyPage = () => {
    return (<main className={styles.empty}>
      <Icon type={IconEmptyCard} />
      <p>您还没有绑定的银行卡</p>
      <p>需要绑定银行卡才可以进行分期哦～</p>
      <a onClick={this.toBindCardPage}><Icon type={IconAdd} className={styles.plus} />添加银行卡</a>
    </main>);
  }

  renderCard = (card) => {
    const bankLogo = card.bankCode ? `/icon/bank_${card.bankCode}.svg` : '/icon/bank.svg';

    return (<section className={styles.card} key={card.id}>
      <img src={bankLogo} alt="" />
      <div className={styles.info}>
        <h3>{card.bankCode ? BANK_TYPE_MAPPING[card.bankCode] : ''}</h3>
        <h5>储蓄卡</h5>
        <div className={styles.number}>{formatCardNum(card.cardNo)}</div>
      </div>
      {
        ~STATES.indexOf(card.stateCN) ? <span>{card.stateCN}</span> :
        <Icon
          className={styles.remove}
          type={ImgDeleteSVG}
          onClick={this.onClickRemoveHander.bind(this, card.id)}
        />
      }
      {
        card.hadsign ? null : <a
          className={styles.unsigned}
          onClick={this.toSignPage.bind(this, card.id)}
        >未认证</a>
      }
    </section>);
  }

  renderdefalut = () => {
    return (<div className={styles.wrap}>
      {this.props.card.map(item => this.renderCard(item))}
      <a onClick={this.toBindCardPage}><Icon type={IconAdd} className={styles.addIcon} />添加银行卡</a>
    </div>);
  }

  render() {
    const { query } = this.props;

    return (<Loading loading={this.props.loading}>
      {
        this.props.card && this.props.card.length && !query.edit ?
          this.renderdefalut() : this.renderEmptyPage()
      }
    </Loading>);
  }
}
