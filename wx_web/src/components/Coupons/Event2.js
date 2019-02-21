import React, { Component } from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import ImgLogo from '../../assets/couple/event2/logo.png';
import ImgLogo2X from '../../assets/couple/event2/logo@2x.png';
import ImgLogo3X from '../../assets/couple/event2/logo@3x.png';
import ImgSx from '../../assets/couple/event2/sx.png';
import Event2Modal from './Event2Modal';
import { PHONE } from '../../utils/pattern';
import { share } from '../../utils/wx-util';
import styles from './Event2.less';

@connect(state => state.coupons)
@createForm()
export default class Event2 extends Component {
  constructor(props) {
    super(props);
    const width = document.documentElement.clientWidth;
    const height = (width * 947) / 376;
    const marginTop = (height * 540) / 947;
    this.state = { height, marginTop };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'coupons/getSignature' });
    this.props.dispatch({ type: 'analysis/count', payload: { actionName: '授信领券', url: '/huodong/sx' } });
  }

  componentWillReceiveProps(nextProps) {
    const { award, signature } = nextProps;

    if (this.awarding && award) {
      this.awarding = false;
      this.setState({
        visible: true,
        limit: award.creditLimit_show,
        limitShow: !!award.coupon_show,
        phoneNo: award.creditAwarding.phoneNo,
      });
    }

    if (!this.shared && signature) {
      share(signature, {
        title: '装修钱不够？元宝给你凑！',
        desc: '测测你能拿多少装修额度？',
        link: `${/[^?#]+/.exec(window.location.href)[0]}?route=/huodong/sx`,
        imgUrl: `${/[^?#]+/.exec(window.location.href)[0]}${ImgSx.charAt(0) === '/' ? ImgSx.slice(1) : ImgSx}`,
        cancel: () => {
          Toast.fail('分享失败');
        },
      }, '授信领券');
      this.shared = true;
    }
  }

  onOkHandler = () => {
    const { form, dispatch } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        values.expectedPeriod = 24;
        dispatch({ type: 'coupons/award', payload: values });
        this.awarding = true;
      } else {
        Toast.fail('请填写相关数据', 2, null, false);
      }
    });
  }

  onSendCaptureHandler = () => {
    if (this.state.number) return;
    const { form, dispatch } = this.props;
    form.validateFields(['phoneNo'], (err, values) => {
      if (err && err.phoneNo) {
        Toast.fail(err.phoneNo.errors[0].message, 2, null, false);
      } else {
        dispatch({ type: 'global/sendCaptcha', payload: values.phoneNo });
        this.setState({ number: 60 });
        setTimeout(this.decreaseNumber, 1000);
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (<main className={styles.event} style={{ height: `${this.state.height}px` }}>
      <div style={{ top: `${this.state.marginTop}px` }} className={styles.content}>
        <section className={styles.box}>
          <div className={styles.inner}>
            <List>
              <InputItem
                {...getFieldProps('decorationArea', {
                  rules: [{ required: true, message: '请输入待装修房屋面积' }],
                })}
                placeholder="请输入您的房屋面积"
                type="number"
              />
              <InputItem
                {...getFieldProps('monthlyIncome', {
                  rules: [{ required: true, message: '请输入税后月收入' }],
                })}
                placeholder="请输入您的月薪"
                type="number"
              />
              <InputItem
                {...getFieldProps('phoneNo', {
                  rules: [{ required: true, message: '请输入手机号' },
                    { pattern: PHONE, message: '请正确输入手机号' }],
                })}
                placeholder="请输入您的手机号"
                maxLength={11}
                type="number"
              />
              <InputItem
                {...getFieldProps('smsCode', {
                  rules: [{ required: true, message: '请输入手机验证码' },
                    { pattern: /^\d{4}$/, message: '请正确输入验证码' }],
                })}
                placeholder="请输入验证码"
                extra={<a
                  style={{ color: `${this.state.number ? '#CCC' : '#1B98F4'}` }}
                  onClick={this.onSendCaptureHandler}
                >
                  {this.state.number ? `(${this.state.number})` : ''}获取验证码</a>}
                maxLength={4}
                type="number"
              />
            </List>
            <Button onClick={this.onOkHandler}>开始测试</Button>
          </div>
        </section>
      </div>
      <footer>
        <div style={{ textAlign: 'center', marginBottom: '.15rem' }}>
          <img src={ImgLogo} srcSet={`${ImgLogo2X} 2x, ${ImgLogo3X} 3x`} alt="" />
        </div>
        本活动最终解释权归元宝亿家互联网信息服务(北京)有限公司所有
      </footer>
      <Event2Modal
        visible={this.state.visible}
        limit={this.state.limit}
        phoneNo={this.state.phoneNo}
        limitShow={this.state.limitShow}
        onClose={() => { this.setState({ visible: false }); }}
      />
    </main>);
  }
}
