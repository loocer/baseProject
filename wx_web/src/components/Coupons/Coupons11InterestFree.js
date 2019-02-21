import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button, Icon, Flex, Card, Modal, Toast } from 'antd-mobile';
import Picker from '../common/Picker';
import provinces from '../../utils/activity-city';
import { QINIU_BASE_PATH, PAGE_PREFIX } from '../../constants';
import { RAF } from '../../utils/bomutil';
import { getBasePath } from '../../utils/query-util';
import CouponImgPic3 from '../../assets/couple/coupon_head_03.png';
import CoupleSuccess from '../../assets/couple/couple_success2.png';
import ImgMa from '../../assets/couple/ybej_ma.png';
import SearchTitle from '../../assets/couple/search_title.png';
import IconLocation from '../../assets/fonts/location.svg';
import IconTelphone from '../../assets/fonts/telphone.svg';
import Tel from '../../assets/couple/tel.png';
import Double from '../../assets/couple/double.png';
import Close from '../../assets/couple/close.png';
import DEFALULT_COMPANT_PATH from '../../assets/logo.png';
import { share } from '../../utils/wx-util';
import styles from './Coupons.less';

const REG_PHONE = /^1\d{10}$/;

@connect(state => ({
  list: state.coupons.store || [],
  couponSate: state.coupons.couponSate || false,
  signature: state.coupons.signature,
  checkStatus: state.coupons.checkStatus || '',
  status: state.coupons.status || '',
  couponList: state.coupons.couponList || [],
}))
@createForm()
export default class Coupons extends Component {
  static childContextTypes = {
    form: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const {
      from, couponList,
    } = props;
    this.state = {
      from,
      couponList,
      visibleOK: false,
      status: false,
      phoneNo: '',
      smsCode: '',
    };
  }

  getChildContext() {
    return { form: this.props.form };
  }

  componentWillMount() {
    if (window.location.href.indexOf('?') >= 0) {
      window.location.href = /([^?]*)/.exec(window.location.href)[1]; // eslint-disable-line
    }
    this.props.dispatch({ type: 'coupons/getCouponsList' });
    this.props.dispatch({ type: 'analysis/count', payload: { actionName: 'DOUBLE11', url: '/huodong/11/jzmx' } });
    const city = '北京市,北京市,all';
    this.props.dispatch({ type: 'coupons/getStoreList', payload: city });
  }

  componentDidMount() {
    RAF(() => {
      this.sharing = true;
      this.props.dispatch({ type: 'coupons/getSignature' });
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      list, couponSate, checkStatus, signature, status, couponList,
    } = nextProps;
    this.setState({
      list, status, couponList,
    });
    if (this.param && couponSate) {
      this.setState({ visibleOK: true, status: true });
      this.param = false;
    }
    if (this.sharing && signature) {
      share(signature, {
        title: '热血双十一  装修分期还免息',
        desc: '抢疯了！元宝e家携百余品牌家装商开启免息分期家装',
        link: `${getBasePath()}${PAGE_PREFIX}/huodong/11/jzmx`,
        imgUrl: `${getBasePath()}${Double}`,
        cancel: () => {
          Toast.fail('分享失败');
        },
      }, 'DOUBLE11');
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
      actionName: 'DOUBLE11',
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
    const {
      phoneNo, smsCode,
    } = this.state;
    this.props.dispatch({ type: 'coupons/getCoupon', payload: { phoneNo, smsCode, actionName: 'DOUBLE11' } }).then(() => {
      if (this.props.status && this.props.status === true) {
        this.setState({
          visibleOK: true,
        });
      }
    });
  }

  onSendCaptchaHandler = () => {
    if (this.state.seconds) return;
    let phone = this.state.phoneNo;
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
    this.props.dispatch({ type: 'coupons/checkCoupon', payload: { phoneNo: phone } });
    const intervalId = setInterval(() => {
      if (this.state.seconds === 0) {
        clearInterval(intervalId);
        this.setState({ seconds: undefined });
      } else {
        this.setState({ seconds: this.state.seconds ? this.state.seconds - 1 : 60 });
      }
    }, 1000);
  }

  onOkHideModalHandler = (e) => {
    e.preventDefault();
    this.setState({ visibleOK: false });
  }


  getCouponButtonHander = () => {
    if (!this.state.from) {
      if (this.state.status || (this.state.couponList && this.state.couponList.length)) {
        return (<div className={styles.text}>
          <Button className={styles.btnGrey} >已领取</Button>
        </div>
        );
      } else {
        return this.renderDom();
      }
    } else if (this.state.from === 'xx') {
      return null;
    } else {
      return this.renderDom();
    }
  }

  handleChangeph(e) {
    this.setState({
      phoneNo: e.target.value,
    });
  }

  handleChangesmc(e) {
    this.setState({
      smsCode: e.target.value,
    });
  }

  renderDom() {
    return (<div className={styles.text}>
      <form className={styles.formtext}>
        <p>
          <input type="text" className={styles.phonetext} placeholder="请输入您的手机号" onChange={this.handleChangeph.bind(this)} />
        </p>
        <p>
          <input type="text" placeholder="请输入验证码" onChange={this.handleChangesmc.bind(this)} />
          <span onClick={this.onSendCaptchaHandler.bind(this)} className={styles.verificationcode}>
            {
              typeof this.state.seconds === 'number' ?
                <span>({this.state.seconds})</span>
                  :
                '获取验证码'
            }
          </span>
        </p>
        <p>
          <input type="button" value="立即领券" className={styles.submittext} onClick={this.onGetCouponHandler.bind(this)} />
        </p>
      </form>
    </div>);
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { error } = this.state;
    const getFieldDecorator = (field, options) => {
      return Object.assign({ id: field, error }, getFieldProps(field, options));
    };
    const backGroundStyle = {};

    return (
      <div className={styles['coupon-conts']}>
        <div className={styles['couple-pic']}>
          <div className={styles.pic}>
            <img src={CouponImgPic3} alt="元宝e家" />
          </div>
          {
            this.state.from === 'xx' ? '' : (<div className={styles['activity-notice']}>
              {this.getCouponButtonHander()}
            </div>)
          }
          <div className={styles.store} style={backGroundStyle}>
            <div className={styles['ybej-ma']}>
              <img src={ImgMa} alt="元宝e家" />
              <p>扫码关注元宝e家公众号</p>
              <p>查看已领优惠券</p>
            </div>
            <div className={styles['store-info']}>
              <img src={SearchTitle} alt="搜索列表" width={420} />
              <Picker
                {
                  ...getFieldDecorator('city', {
                    initialValue: [`${provinces[1].label}`, `${provinces[1].value}`, 'all'],
                    onChange: this.onSearchStore,
                  })
                }
                data={provinces}
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
                              <img src={Tel} className={styles['icon-phone']} alt="电话" />
                            </a>
                          </Flex>
                        </div>}
                        thumb={key.path ? `${QINIU_BASE_PATH}${key.path}` : DEFALULT_COMPANT_PATH}
                      />
                    </Card>)) : ''
                }
              </div>
            </div>
            <div className={styles['footer-div']}>*本活动最终解释权归元宝亿家互联网信息服务（北京）有限公司所有</div>
          </div>
        </div>
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
