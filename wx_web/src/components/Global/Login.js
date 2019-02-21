import React, { Component } from 'react';
import { connect } from 'dva';
import { List, InputItem, Flex, WingBlank, Tabs, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import Icon from '../common/Icon';
import IconOpenEye from '../../assets/fonts/eye-open.svg';
import IconCloseEye from '../../assets/fonts/eye-close.svg';
import Loading from '../common/Loading';
import styles from './Login.less';

const REG_PHONE = /^1\d{10}$/;

@connect(state => ({ loading: state.loading.models.global && !state.global.exception }))
@createForm()
export default class Login extends Component {
  constructor(props) {
    super(props);
    const { loading } = props;
    this.state = { isShowPassword: false, tab: '1', loading };
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    this.setState({ loading });
  }

  onLoginHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      const cellphoneName = 'cellphone';
      const passwordName = `password${this.state.tab}`;
      if (err && (err[cellphoneName] || err[passwordName])) {
        const newState = {};

        newState[cellphoneName] = !!err[cellphoneName];
        newState[passwordName] = !!err[cellphoneName];
        this.setState(newState);
      } else {
        const param = {};
        param.cellphone = value[cellphoneName];
        if (this.state.tab === '1') {
          param.phoneCode = value[passwordName];
        } else {
          param.password = value[passwordName];
        }
        // 微信端登陆传入微信code绑定用户信息
        const matches = /code=([^&]+)/.exec(window.location.search);
        if (matches) {
          param.wxAuthCode = matches[1]; // eslint-disable-line
        }
        this.props.dispatch({ type: 'global/login', payload: param });
      }
    });
  }

  onShowPasswordHandler = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
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
    this.setState({ sended: true });
  }

  onSendVoiceCaptchaHandler = () => {
    const phone = this.props.form.getFieldValue('cellphone');
    if (!REG_PHONE.test(phone)) {
      Toast.info('请正确输入手机号码', 1, null, false);
      return;
    }

    Modal.alert('语音验证码', '我们将会以电话的形式告知您的验证码，您可能会收到025等开头的来电，请放心接听', [
      { text: '不用了' },
      {
        text: '现在接听',
        style: { background: '#1B88EE', color: '#FFF' },
        onPress: () => {
          this.props.dispatch({ type: 'global/sendVoiceCaptcha', payload: phone }).then(() => {
            const message = (<span>
              验证码已发至+ 86 {phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')},请注意接听
              <section style={{ fontSize: '.12rem' }}>120 秒后重试</section>
            </span>);
            Modal.alert('', message);
          });
        },
      },
    ]);
  }

  onTabChangedHandler = (tab) => {
    this.setState({ tab: `${tab.sub}` });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const aStyle = {};
    if (typeof this.state.seconds === 'number') {
      aStyle.color = '#CCC';
    }

    return (
      <Loading loading={this.state.loading}>
        <div className={styles.bg}>
          <Flex justify="center" style={{ height: '100%' }}>
            <Flex.Item>
              <WingBlank size="lg">
                <form action="/" className={styles['login-form']}>
                  <Tabs initalPage="1" tabs={[{ title: '快捷登录', sub: '1' }, { title: '密码登录', sub: '2' }]} onChange={this.onTabChangedHandler}>
                    <div>
                      <List>
                        <InputItem
                          {...getFieldProps('cellphone', {
                            rules: [
                              { required: true },
                            ],
                          })}
                          placeholder="请输入手机号"
                          maxLength={11}
                          error={this.state.cellphone1}
                          type="tel"
                        >
                          手机号码
                        </InputItem>
                        <InputItem
                          {...getFieldProps('password1', {
                            rules: [
                              { required: true },
                            ],
                          })}
                          placeholder="请输入验证码"
                          extra={<a className="check-code" onClick={this.onSendCaptchaHandler}>
                            {
                              typeof this.state.seconds === 'number' ?
                                <span style={aStyle}>({this.state.seconds})</span>
                                  :
                                null
                            }
                            发送验证码</a>}
                          maxLength={4}
                          error={this.state.password1}
                          type="number"
                        >
                          验证码
                        </InputItem>
                        <List.Item>
                          {
                            this.state.sended ? <span>收不到验证码?试试
                              <a onClick={this.onSendVoiceCaptchaHandler}>语音验证码</a>
                            </span> : null
                          }
                        </List.Item>
                      </List>
                    </div>
                    <div>
                      <List>
                        <InputItem
                          {...getFieldProps('cellphone', {
                            rules: [
                              { required: true },
                            ],
                          })}
                          placeholder="请输入手机号"
                          maxLength={11}
                          error={this.state.cellphone2}
                          type="tel"
                        >
                          手机号码
                        </InputItem>
                        <InputItem
                          {...getFieldProps('password2', {
                            rules: [
                              { required: true },
                            ],
                          })}
                          placeholder="请输入密码"
                          type={this.state.isShowPassword ? 'text' : 'password'}
                          extra={<Icon
                            type={this.state.isShowPassword ? IconCloseEye : IconOpenEye}
                            onClick={this.onShowPasswordHandler}
                          />}
                          error={this.state.password2}
                        >
                          密码
                        </InputItem>
                        <List.Item extra={<a href="#/account/password/reset" className="forget-password">忘记密码?</a>}>
                          &nbsp;
                        </List.Item>
                      </List>
                    </div>
                  </Tabs>
                  <Button onClick={this.onLoginHandler} type="primary">登录</Button>
                </form>
              </WingBlank>
            </Flex.Item>
          </Flex>
        </div>
      </Loading>
    );
  }
}
