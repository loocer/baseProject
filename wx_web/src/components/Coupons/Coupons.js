import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { List, Button, Flex, Card, Modal, Toast } from 'antd-mobile';
import Icon from '../common/Icon';
import InputItem from '../common/InputItem';
import Picker from '../common/Picker';
import provinces from '../../utils/activity-city';
import { QINIU_BASE_PATH, SHARE_ICON_PATH } from '../../constants';
import { DIALING_CODE, PHONE } from '../../utils/pattern';
import { RAF } from '../../utils/bomutil';
import CouponImgPic2 from '../../assets/couple/coupon_head_02.png';
import CouponImgPic3 from '../../assets/couple/couple_img_04.png';
import CouponImgPic4 from '../../assets/couple/couple_img_05.png';
import CoupleSuccess from '../../assets/couple/couple_success.png';
import ImgMa from '../../assets/couple/ybej_ma.png';
import IconPhone from '../../assets/fonts/phone-circle.svg';
import IconLocation from '../../assets/fonts/location.svg';
import IconTelphone from '../../assets/fonts/telphone.svg';
import Close from '../../assets/couple/close.png';
import DEFALULT_COMPANT_PATH from '../../assets/logo.png';
import { share } from '../../utils/wx-util';
import styles from './Coupons.less';

const { Item } = List;
const REG_PHONE = /^1\d{10}$/;

@connect(state => ({
  list: state.coupons.store || [],
  couponSate: state.coupons.couponSate || false,
  isCoupon: state.coupons.isCoupon || [],
  signature: state.coupons.signature,
  checkStatus: state.coupons.checkStatus || '',
}))
@createForm()
export default class Coupons extends Component {
  static childContextTypes = {
    form: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { isCoupon, from } = props;
    this.state = {
      isCoupon,
      from,
      visible: false,
      visibleOK: false,
      status: false,
    };
  }

  getChildContext() {
    return { form: this.props.form };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'coupons/getCouponsState' });
    this.props.dispatch({ type: 'analysis/count', payload: { actionName: 'DIF', url: '/huodong/jzmx' } });
  }

  componentDidMount() {
    RAF(() => {
      this.sharing = true;
      this.props.dispatch({ type: 'coupons/getSignature' });
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      list, couponSate, isCoupon, checkStatus, signature,
    } = nextProps;
    this.setState({ list, isCoupon });
    if (this.param && couponSate) {
      this.setState({ visibleOK: true, status: true });
      this.param = false;
    }
    if (this.sharing && signature) {
      share(signature, {
        title: '家装分期12期免息券大派送',
        desc: '元宝e家携手择居畅享家装分期e生活',
        link: `${/[^?#]+/.exec(window.location.href)[0]}?route=/huodong/jzmx`,
        imgUrl: `${QINIU_BASE_PATH}${SHARE_ICON_PATH}`,
        cancel: () => {
          Toast.fail('分享失败');
        },
      }, 'DIF');
      this.sharing = null;
    }
    if (this.checkParam && checkStatus) {
      let phone = this.props.form.getFieldValue('phoneNo');
      if (phone) {
        phone = phone.replace(/\s/ig, '');
      }
      this.props.dispatch({ type: 'global/sendCaptcha', payload: phone });
      this.checkParam = false;
    }
  }

  onCountContactHandler = (data) => {
    const payload = {
      actionName: '家装免息劵',
      commercialName: data.title,
      commercialPhone: data.companyTel,
    };
    this.props.dispatch({ type: 'analysis/dailingContact', payload });
  }

  onSearchStore = (value) => {
    const city = value.join(',');
    this.props.dispatch({ type: 'coupons/getStoreList', payload: city });
  }

  onGetCouponHandler = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ visible: false });
        const { smsCode } = values;
        let { phoneNo } = values;
        phoneNo = phoneNo.replace(/\s/ig, '');
        this.param = true;
        this.props.dispatch({ type: 'coupons/getCoupon', payload: { phoneNo, smsCode, actionName: '家装免息劵' } });
      } else {
        Toast.fail('请正确输入信息', 2, null, false);
        this.setState({ error: err });
      }
    });
  }

  onSendCaptchaHandler = () => {
    if (this.state.seconds) return;
    let phone = this.props.form.getFieldValue('phoneNo');
    if (phone) {
      phone = phone.replace(/\s/ig, '');
    } else {
      Toast.info('请输入手机号码,不能为空', 1, null, false);
      return;
    }
    if (!REG_PHONE.test(phone)) {
      Toast.info('请正确输入手机号码', 1, null, false);
      return;
    }
    this.checkParam = true;
    this.props.dispatch({ type: 'coupons/checkCoupon', payload: { phoneNo: phone, actionName: '家装免息劵' } });
    const intervalId = setInterval(() => {
      if (this.state.seconds === 0) {
        clearInterval(intervalId);
        this.setState({ seconds: undefined });
      } else {
        this.setState({ seconds: this.state.seconds ? this.state.seconds - 1 : 60 });
      }
    }, 1000);
  }

  onHideModalHandler = (e) => {
    e.preventDefault();
    this.setState({ visible: false });
  }

  onShowModalHandler = (e) => {
    e.preventDefault();
    this.setState({ visible: true });
  }

  onOkHideModalHandler = (e) => {
    e.preventDefault();
    this.setState({ visibleOK: false });
  }

  getCouponButtonHander = () => {
    if (!this.state.from) {
      if (this.state.status || (this.state.isCoupon && this.state.isCoupon.length)) {
        return (<Button className={styles.btnGrey} >已领取</Button>);
      } else {
        return (<Button className={styles.btn} onClick={this.onShowModalHandler}>马上领取</Button>);
      }
    } else if (this.state.from === 'xx') {
      return null;
    } else {
      return (<Button className={styles.btn} onClick={this.onShowModalHandler}>马上领取</Button>);
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { error } = this.state;
    const getFieldDecorator = (field, options) => {
      return Object.assign({ id: field, error }, getFieldProps(field, options));
    };
    const backGroundStyle = {};
    if (this.state.from === 'xx') {
      backGroundStyle.background = `url(${CouponImgPic4}) repeat-y`;
      backGroundStyle.backgroundSize = 'cover';
    }

    return (
      <div className={styles['coupon-conts']}>
        <div className={styles['couple-pic']}>
          <div className={styles.pic}>
            <img src={CouponImgPic2} alt="元宝e家" />
          </div>
          <div className={styles.pic}>
            <img src={CouponImgPic3} alt="元宝e家" />
          </div>
          {
            this.state.from === 'xx' ? '' : (<div className={styles['activity-notice']}>
              <div className={styles.text}>
                <h5>活动须知</h5>
                <p>1. 此券仅限本人使用，且仅限使用一次。</p>
                <p>2. 此券仅限家装分期12期产品使用。</p>
                <p>3. 持电子券到元宝e家家装合作商门店即可使用。</p>
                <p>4. 本券有效期：2017年8月8日至2017年11月8日。</p>
                <p>5. 扫描页面二维码关注元宝e家公众号，可查看已领优惠券。</p>
                {this.getCouponButtonHander()}
              </div>
            </div>)
          }
          <div className={styles.store} style={backGroundStyle}>
            <div className={styles['store-info']}>
              <h3>查找附近商家</h3>
              <Picker
                {
                  ...getFieldDecorator('city', {
                    onChange: this.onSearchStore,
                  })
                }
                data={provinces}
                placeholder="请选择所在地区"
              />
              <div className={styles.info}>
                {
                  this.state.list ?
                    this.state.list.map(key => (<Card>
                      <Card.Header
                        title={<div style={{ width: '100%', position: 'relative' }}>
                          <h3>{key.title}</h3>
                          <Flex justify="between" className={styles['flex-container']}>
                            <div className={styles.contact}>
                              <p><Icon type={IconLocation} size="xs" />{key.companyAdr}</p>
                              <a href={`tel:${key.companyTel}`} onClick={this.onCountContactHandler.bind(this, key)}>
                                <Icon type={IconTelphone} size="xs" />{key.companyTel}
                              </a>
                            </div>
                            <a href={`tel:${key.companyTel}`} onClick={this.onCountContactHandler.bind(this, key)}>
                              <Icon type={IconPhone} className={styles['icon-phone']} />
                            </a>
                          </Flex>
                        </div>}
                        thumb={key.path ? `${QINIU_BASE_PATH}${key.path}` : DEFALULT_COMPANT_PATH}
                      />
                    </Card>)) : ''
                }
              </div>
            </div>
            <div className={styles['ybej-ma']}>
              <img src={ImgMa} alt="元宝e家" />
              <p>扫码关注公众号参加活动</p>
            </div>
            <div className={styles['footer-div']}>*本活动最终解释权归元宝亿家互联网信息服务（北京）有限公司所有</div>
          </div>
        </div>
        <Modal
          visible={this.state.visible}
          onClose={this.onHideModalHandler}
          className={styles['coupon-modal']}
        >
          <div className={styles['send-info']}>
            <form>
              <List>
                <Item>
                  <InputItem
                    {...getFieldDecorator('phoneNo', {
                      rules: [
                        { required: true, message: '请输入手机号' },
                        { pattern: PHONE, message: '请正确输入手机号', transform(value) { return value ? value.replace(/\s/ig, '') : value; } },
                      ],
                    })}
                    placeholder="请输入您的手机号"
                    type="phone"
                    clear
                  />
                </Item>
                <Item className={styles.flex}>
                  <Flex>
                    <Flex.Item>
                      <InputItem
                        {...getFieldDecorator('smsCode', {
                          rules: [
                            { required: true, message: '请输入验证码' },
                            { pattern: DIALING_CODE, message: '请正确输入验证码' },
                          ],
                        })}
                        placeholder="请输入获取验证码"
                      />
                    </Flex.Item>
                    <Flex.Item>
                      <Button className={styles.btn} onClick={this.onSendCaptchaHandler}>
                        {
                          typeof this.state.seconds === 'number' ?
                            <span>({this.state.seconds})</span>
                              :
                            '获取验证码'
                        }
                      </Button>
                    </Flex.Item>
                  </Flex>
                </Item>
              </List>
            </form>
          </div>
          <Button className={styles.btnPrimary} onClick={this.onGetCouponHandler}>确定</Button>
          <div className={styles.pic} onClick={this.onHideModalHandler}>
            <img src={Close} alt="关闭" style={{ marginTop: '60px' }} />
          </div>
        </Modal>
        <Modal
          visible={this.state.visibleOK}
          onClose={this.onHideModalHandler}
          className={styles['coupon-modal']}
        >
          <div className={styles['getCoupon-ok']}>
            <img src={CoupleSuccess} alt="" style={{ width: '75%' }} />
            <div className={styles.pic} onClick={this.onOkHideModalHandler}>
              <img src={Close} alt="关闭" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
