import React from 'react';
import { routerRedux } from 'dva/router';
import { List, Toast } from 'antd-mobile';
import alert from '../common/Toast';
import BaseFormContext from '../common/BaseFormContext';
import InputItem from '../common/InputItem';
import Loading from '../common/Loading';
import Button from '../common/Button';
import IconSuccess from '../../assets/fonts/ico_success.svg';
import { close } from '../../utils/pageutil';
import styles from './BaseAuth.less';

export default class BaseAuth extends BaseFormContext {
  state = {};

  componentWillMount() {
    const { dispatch, id, card } = this.props;

    if (card) dispatch({ type: 'loan/changeCard', payload: { card, id } }).then(this.getBankCardHandler, this.getBankCardHandler);
    else this.getBankCardHandler();
  }

  getBankCardHandler = () => {
    const { dispatch, id } = this.props;
    dispatch({ type: 'channel/getBankCard', payload: id });
  }

  success = () => {
    alert(<div style={{ margin: '0 .4rem' }}>鉴权成功</div>, IconSuccess, 5000, close);
  }

  onOkHandler = () => {
    const { form, dispatch, id } = this.props;

    form.validateFields((err, value) => {
      if (!err) {
        dispatch({ type: `channel/${this.props.channel.auth}`, payload: { id, authCode: value.authCode } }).then(this.success);
      } else {
        Toast.fail('请输入验证码', 2, null, false);
      }
    });
  }

  onSendCodeHandler = () => {
    const { dispatch, id } = this.props;

    dispatch({ type: `channel/${this.props.channel.captcha}`, payload: id }).then(() => {
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
      search: `?redirect=/channel/${btoa(id)}/${this.props.channel.type}&id=${bankCard[id] && bankCard[id].id}`,
    }));
  }

  render() {
    const { form: { getFieldProps } } = this.props;
    const sending = !!this.state.times;

    return (<Loading loading={this.props.loading}>
      <div className={styles.wrap}>
        <h3>确认分期</h3>
        <span>手机验证码</span>
        <List>
          <InputItem
            {
              ...getFieldProps('authCode', { rules: [{ required: true, message: '请输入手机验证码' }] })
            }
            placeholder="请输入手机验证码"
            maxLength={8}
            extra={<a onClick={sending ? null : this.onSendCodeHandler}>接收验证码{sending ? `${this.state.times}s` : ''}</a>}
          />
        </List>
        <h4>温馨提示：</h4>
        <p>1.您将收到以【{this.props.channel.label}】为签名的确认短信，请及时完成验证；</p>
        <p>2.接收验证码失败：请查看是否被手机软件拦截；</p>
        {this.props.channel.canChangeCard ?
          <p>3.若银行卡丢失、不在使用中，<a onClick={this.toPickCardPage}>点击可更换银行卡</a></p> : null}
        <footer>
          <Button type="primary" onClick={this.onOkHandler}>提交</Button>
        </footer>
      </div>
    </Loading>);
  }
}
