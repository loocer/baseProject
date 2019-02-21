import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, WhiteSpace, Toast } from 'antd-mobile';
import BaseFormContext from '../common/BaseFormContext';
import InputItem from '../common/InputItem';
import Loading from '../common/Loading';
import Button from '../common/Button';
import styles from './Auth.less';

@connect(state => ({
  loading: state.loading.models.channel || state.loading.models.loan,
  bankCard: state.channel.bankCard,
}))
@createForm()
export default class HuaDao extends BaseFormContext {
  state = {};

  point = {};

  componentWillMount() {
    const { dispatch, id, card } = this.props;

    if (card) dispatch({ type: 'loan/changeCard', payload: { card, id } }).then(this.getBankCardHandler, this.getBankCardHandler);
    else this.getBankCardHandler();

    window.navigator.geolocation.getCurrentPosition((position) => {
      this.point = {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      };
    });
  }

  getBankCardHandler = () => {
    const { dispatch, id } = this.props;
    dispatch({ type: 'channel/getBankCard', payload: id });
  }

  onOkHandler = () => {
    const { form, dispatch, id } = this.props;

    form.validateFields((err, value) => {
      if (!err) {
        dispatch({ type: 'channel/authZl', payload: { id, authCode: value.authCode, ...this.point } }).then(() => {
          dispatch(routerRedux.push(`/channel/${btoa(id)}/auth/success`));
        });
      } else {
        Toast.fail('请输入验证码', 2, null, false);
      }
    });
  }

  onSendCodeHandler = () => {
    const { dispatch, id } = this.props;

    dispatch({ type: 'channel/sendZlCode', payload: id }).then(() => {
      this.startLoop(60);
    });
  }

  startLoop = (times) => {
    if (times) {
      this.setState({ times });
      setTimeout(() => this.startLoop(times - 1), 1000);
    } else {
      this.setState({ times: undefined });
    }
  }

  toPickCardPage = () => {
    const { dispatch, id, bankCard } = this.props;

    dispatch(routerRedux.push({
      pathname: '/bank/card/pick',
      search: `?redirect=/channel/${btoa(id)}/zl&id=${bankCard[id] && bankCard[id].id}`,
    }));
  }

  render() {
    const { form: { getFieldProps }, bankCard, id } = this.props;
    const style = {};
    const sending = !!this.state.times;
    const newState = {};
    let i = 0;
    while (i++ < 1) {
      if (sessionStorage.getItem(`$$DECORATION-PROTOCOL-2-${i}`)) newState[`p${i}`] = true;
    }

    if (!sending) { style.color = '#1b98f4'; }

    return (<Loading loading={this.props.loading}>
      <div className={styles['step-info']}>
        <WhiteSpace size="xl" />
        <p>注意：我们会将短信发送到银行卡预留手机号上哦~</p>
        <p>预留手机号：{bankCard[id] && bankCard[id].mobile}</p>
        <List>
          <InputItem
            {
              ...getFieldProps('authCode', { rules: [{ required: true, message: '请输入手机验证码' }] })
            }
            placeholder="请输入手机验证码"
            maxLength={8}
            extra={<a onClick={sending ? null : this.onSendCodeHandler} style={style}>发送验证码{sending ? `(${this.state.times})` : ''}</a>}
          >手机验证码
          </InputItem>
        </List>
        <h4>提示：</h4>
        <p>
          接受验证码失败原因：<br />
          1.银行卡预留手机号已被注销或因其他原因不在使用中，<a onClick={this.toPickCardPage}>点击更换其他银行卡</a><br />
          2.短信被手机安全软件拦截，可查看拦截短信中是否有【宝易互通】发送的短信
        </p>
        <footer>
          <Button type="primary" disabled={Object.values(newState).length !== 1} onClick={this.onOkHandler}>提交</Button>
        </footer>
      </div>
    </Loading>);
  }
}
