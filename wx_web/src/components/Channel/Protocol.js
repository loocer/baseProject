import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { stringify } from 'query-string';
import { List, Checkbox, WhiteSpace, Button } from 'antd-mobile';
import Loading from '../common/Loading';
import { BANK_TYPE_MAPPING } from '../../constants';
import styles from '../common/List.less';

@connect(state => ({
  card: state.channel.bankCard || {},
  userInfo: state.global.user || {},
  loading: state.loading.models.channel || state.loading.models.global,
}))
export default class Protocol extends PureComponent {
  state = {};

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch({ type: 'channel/getBankCard', payload: id });
    dispatch({ type: 'global/getUserInfo' });
    dispatch({ type: 'channel/getZLProtocolParams', payload: id }).then((str) => {
      const json = JSON.parse(JSON.parse(str).body);
      this.setState({ params: json.data });
    });
  }

  onAgreeChangedHandler = (type) => {
    sessionStorage.setItem(`$$DECORATION-PROTOCOL-2-${type}`, true);
  }

  toNextPage = () => {
    const { dispatch, id, type } = this.props;
    dispatch(routerRedux.push(`/channel/${btoa(id)}/${type}`));
  }

  render() {
    const newState = {};
    let i = 0;
    while (i++ < 2) {
      if (sessionStorage.getItem(`$$DECORATION-PROTOCOL-2-${i}`)) newState[`p${i}`] = true;
    }
    const { card, userInfo, id } = this.props;
    const cardData = card[id] || {};
    const now = new Date();
    const month = now.getMonth() + 1;
    const params = {
      bankName: BANK_TYPE_MAPPING[cardData.bankCode],
      bankAccount: cardData.cardNo && cardData.cardNo.replace(/^(.{4})(.*)(.{4})$/, (...args) => `${args[1]}${''.padStart(args[2].length, '*')}${args[3]}`),
      bankUserName: cardData.accountName && cardData.accountName.replace(/^(.{1})(.*)$/, '*$2'),
      userId: userInfo.idCard && userInfo.idCard.replace(/^(.{4})(.*)(.{4})$/, (...args) => `${args[1]}${''.padStart(args[2].length, '*')}${args[3]}`),
      userName: userInfo.realName && userInfo.realName.replace(/^(.{1})(.*)$/, '*$2'),
      year: now.getFullYear(),
      month: `${month}`.padStart(2, '0'),
      day: `${now.getDate()}`.padStart(2, '0'),
    };

    return (<Loading loading={this.props.loading}>
      <div className={styles['step-info']} style={{ paddingBottom: 0 }}>
        <List renderHeader={() => '用户服务协议'}>
          <Checkbox.AgreeItem disabled checked={newState.p1}>
            支付扣款协议
            <a
              href={`https://m-zl.mucfc.com/static/agreement/index.html?list=ZXH_PAY_WITHHOLD_UNITE&${stringify(params)}`}
              className={styles.fr}
              onClick={this.onAgreeChangedHandler.bind(this, 1)}
            >
              协议内容
            </a>
          </Checkbox.AgreeItem>
          <Checkbox.AgreeItem disabled checked={newState.p2}>
            个人额度借款支用单
            <a
              href={`https://m-zl.mucfc.com/static/agreement/index.html?${this.state.params}`}
              className={styles.fr}
              onClick={this.onAgreeChangedHandler.bind(this, 2)}
            >
              协议内容
            </a>
          </Checkbox.AgreeItem>
        </List>
        <WhiteSpace size="xl" />
        <div className={styles['btn-container']}>
          <Button type="primary" disabled={Object.values(newState).length !== 2} onClick={this.toNextPage}>确定</Button>
        </div>
      </div>
    </Loading>);
  }
}
