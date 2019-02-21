import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, Button, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Loading from '../common/Loading';
import styles from './ResetPassword.less';

const REG_PHONE = /^1\d{10}$/;

@connect(state => ({
  loading: state.loading.models.global && !state.global.exception,
  token: state.global.token || '',
}))
@createForm()
export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    const { loading } = props;
    this.state = { loading };
  }

  componentWillReceiveProps(nextProps) {
    const { loading, token } = nextProps;
    this.setState({ loading });
    if (this.resetPwd) {
      if (token && loading) {
        Toast.info('重置密码成功', 2, () => {
          this.props.dispatch(routerRedux.go(-1));
        });
        this.resetPwd = false;
      }
    }
  }

  onSendCaptchaHandler = () => {
    if (this.state.seconds) return;
    const phone = this.props.form.getFieldValue('cellphone');
    if (!REG_PHONE.test(phone)) {
      Toast.info('请正确输入手机号码', 1, null, false);
      return;
    }
    this.props.dispatch({ type: 'global/sendCaptcha', payload: phone });
    const intervalId = setInterval(() => {
      if (this.state.seconds === 0) {
        clearInterval(intervalId);
        this.setState({ seconds: undefined });
      } else {
        this.setState({ seconds: this.state.seconds ? this.state.seconds - 1 : 60 });
      }
    }, 1000);
  }

  onResetPwdHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const cellphoneName = 'cellphone';
      const codeName = 'code';
      const newPasswordName = 'newPassword';
      const newPasswordName1 = 'newPassword1';
      if (err && (err[cellphoneName] || err[codeName] ||
       err[newPasswordName] || err[newPasswordName1])) {
        const newState = {};
        newState[cellphoneName] = !!err[cellphoneName];
        newState[codeName] = !!err[codeName];
        newState[newPasswordName] = !!err[newPasswordName];
        this.setState(newState);
      } else {
        const param = {};
        param.cellphone = values[cellphoneName];
        param.code = values[codeName];
        param.newPassword = values[newPasswordName];
        this.resetPwd = true;
        this.props.dispatch({ type: 'global/resetPassword', payload: param });
      }
    });
  }

  checkConfirm = () => {
    const newPassword = this.props.form.getFieldValue('newPassword');
    const newPassword1 = this.props.form.getFieldValue('newPassword1');
    if (newPassword !== newPassword1) {
      Toast.info('两次密码输入不一致!');
      return null;
    }
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (<Loading loading={this.state.loading}>
      <div className={styles['step-info']}>
        <List>
          <InputItem
            {...getFieldProps('cellphone', {
              rules: [
                { required: true, message: '请输入手机号' },
              ],
            })}
            placeholder="输入手机号"
            error={this.state.cellphone}
            type="number"
            maxLength={11}
          >手机号
          </InputItem>
          <InputItem
            {...getFieldProps('code', {
              rules: [
                { required: true },
              ],
            })}
            placeholder="输入验证码"
            maxLength={6}
            error={this.state.code}
            type="number"
            className={styles['extra-code']}
            extra={<a className="check-code" onClick={this.onSendCaptchaHandler}>
              {
                typeof this.state.seconds === 'number' ?
                  this.state.seconds
                    :
                  '获取验证码'
              }
            </a>}
          >验证码
          </InputItem>
          <InputItem
            {...getFieldProps('newPassword', {
              rules: [
                { required: true },
              ],
            })}
            placeholder="请输入新密码"
            error={this.state.newPassword}
            type="password"
          >新密码
          </InputItem>
          <InputItem
            {...getFieldProps('newPassword1', {
              rules: [
                { required: true },
              ],
            })}
            placeholder="确认新密码"
            error={this.state.newPassword1}
            onBlur={this.checkConfirm}
            type="password"
          >确认新密码
          </InputItem>
        </List>
        <Button type="primary" onClick={this.onResetPwdHandler}>重置密码</Button>
      </div>
    </Loading>);
  }
}
