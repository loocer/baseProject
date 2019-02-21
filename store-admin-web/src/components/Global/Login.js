import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd';
import { USERNAME } from '../../utils/pattern';
import Logo from '../../assets/logo.png';
import User from '../../assets/user.png';
import Password from '../../assets/password.png';
import styles from './Login.less';
import { CAPTCHA_URL } from '../../constants';


const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const shuzi = parseInt(Math.random()*100000 + 999999);
console.log(shuzi);
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { random: parseInt(Math.random()*100000 + 999999), };
  }

  onOkHandler = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.code = this.state.random;
        this.props.dispatch({ type: 'global/login', payload: values });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (<div>
      <div className={styles['login-form']}></div>
      <div className={styles['login-bg']}></div>
      <div className={styles['login-con']}>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img src={Logo} alt="" />
          </div>
          <form className={styles.loginform}>
            <FormItem>
              {getFieldDecorator('cellphone', {
                rules: [
                  { required: true, message: '请填写登录名' },
                  { pattern: USERNAME, message: '请输入正确的登录名' },
                ],
              })(<span>
                  <img src={User} alt="" className={styles.userIcon}/>
                  <Input size="large" className={styles['ant-inputse']}  onPressEnter={this.onOkHandler} placeholder="请输入用户账号" />
                </span>)
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请填写密码' },
                ],
              })(<span>
                  <img src={Password} alt="" className={styles.userIcon}/>
                  <Input size="large" type="password" className={styles['ant-inputse']} onPressEnter={this.onOkHandler} placeholder="请输入账号密码" />
                </span>)}
            </FormItem>
            <FormItem
              extra={<span>
                <img height={32} src={`${CAPTCHA_URL}?code=${this.state.random}`} alt="验证码" />
                <a onClick={() => { this.setState({ random: parseInt(Math.random()*100000 + 999999) }); }}>看不清?</a>
              </span>}
            >
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请填写验证码' }],
              })(<Input size="large" style={{ width: 100 }} onPressEnter={this.onOkHandler} placeholder="验证码" />)}
            </FormItem>
            <Row>
              <Button type="primary" size="large" onClick={this.onOkHandler} >
                登录
              </Button>
            </Row>
          </form>
        </div>
      </div>
    </div>);
  }
}

export default connect()(Form.create()(Login));
