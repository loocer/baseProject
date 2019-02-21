import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import { List, Toast } from 'antd-mobile';
import { getImageCameraType } from '../../utils/image-util';
import Picker from '../common/Picker';
import Loading from '../common/Loading';
import { BANKS } from '../../picker-data';
import InputItem from '../common/InputItem';
import { deducePlatform } from '../../utils/platform';
import { close } from '../../utils/pageutil';
import Alert from '../common/Alert';
import BaseImageUpload from '../common/BaseImageUploade';
import ImagePicker from '../common/ImagePicker/NanoCameraImagePicker';
import { ZH_CN, PHONE, ID_CARD } from '../../utils/pattern';
import Button from '../common/Button';
import styles from './BindCard.less';

@connect(state => ({
  loading: state.loading.models.account || state.loading.models.ocr || state.loading.models.bank,
  userInfo: state.global.user || {},
  cardInfo: state.bank.detail || {},
  bankInfo: state.ocr.bankCard || {},
}))
@createForm()
export default class BindCard extends BaseImageUpload {
  static childContextTypes = {
    form: PropTypes.object.isRequired,
  };

  keys = ['bankcardFrontPath'];

  getChildContext() {
    return { form: this.props.form };
  }

  constructor(props) {
    super(props);
    const { userInfo } = props;
    this.state = {
      userInfo: this.getUserInfo(userInfo),
      error: {},
      cognized: true,
      editable: false,
    };
  }

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch({ type: 'global/getQiNiuToken' });
    dispatch({ type: 'global/getUserInfo' }).then(() => {
      const { certificationPasswd } = this.props.userInfo;
      if (!certificationPasswd) {
        dispatch({ type: 'face/getLiveCheckResult' }).then(({ manuallyCertification }) => {
          if (!manuallyCertification) {
            Alert({
              title: '您尚未实名认证，无法绑定银行卡',
              okText: '实名认证',
              cancelText: '取消',
              onOkHandler: () => {
                dispatch(routerRedux.push({ pathname: '/rna/id', search: '?redirect=/account/bank/addcard' }));
              },
              onCancelHandler: () => {
                if (deducePlatform()) close();
                else dispatch(routerRedux.go(-1));
              },
            });
          }
        });
      }
    });

    if (id) {
      this.props.dispatch({ type: 'bank/getCard', payload: id }).then(() => {
        this.pathes = {
          [this.keys[0]]: this.props.cardInfo[id].bankCardFrontImg,
        };
        this.props.form.setFieldsValue({
          accountNo: this.props.cardInfo[id].cardNo,
          bankCode: [this.props.cardInfo[id].bankCode],
        });
      });
    }
  }

  componentDidMount() {
    if (this.props.src) this.onChangeHandler(this.keys[0], this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo } = nextProps;

    this.setState({ userInfo: this.getUserInfo(userInfo) });

    this.initError(nextProps, 'bankCard');
  }

  getUserInfo = (userInfo) => {
    const info = {};
    const { query } = this.props;

    info.realName = query.realNamee || userInfo.realName || '';
    info.idCardNo = query.idCard || userInfo.idCard || '';
    info.phoneNo = query.phone || userInfo.loginName || '';

    return info;
  }

  onOkHandler = (e) => {
    e.preventDefault();

    const { form: { validateFields }, dispatch, redirect } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { captcha } = values;
        const { resultId } = this;
        if (!resultId) {
          Toast.fail('没有获取到验证码');
          return;
        }
        dispatch({ type: 'account/bindCard', payload: { captcha, resultId } }).then(() => {
          if (redirect) {
            if (Array.isArray(redirect)) {
              dispatch(routerRedux.push({
                pathname: redirect[0],
                search: `?redirect=${redirect[1]}`,
              }));
            } else {
              dispatch(routerRedux.push(redirect));
            }
          } else {
            dispatch(routerRedux.go(-1));
          }
        });
      } else {
        Toast.fail('请正确输入信息', 2, null, false);
        this.setState({ error: err });
      }
    });
  }

  onChangeHandler = (key, path, source) => {
    this.onImageUploadedHandler(key, path);
    this.props.dispatch({ type: 'ocr/cognizeBankCard', payload: path }).then(() => {
      if (source === 'native') {
        this.banCardFrontImgType = getImageCameraType(path);
      }
      const { bankCardNumber, bankCode, bankCardType } = this.props.bankInfo;
      if (bankCardType === '信用卡') {
        Toast.fail('不支持使用信用卡!');
        this.pathes = {};
      } else if (bankCardNumber) {
        if (!bankCode) {
          Toast.fail('暂不支持您选择的银行卡!');
          this.pathes = {};
        } else {
          const values = { accountNo: bankCardNumber.replace(/\s+/ig, '') };
          if (bankCode !== 'unrecognized') values.bankCode = bankCode;
          this.props.form.setFieldsValue(values);
          this.setState({ editable: true });
        }
      } else {
        this.setState({ cognized: false, editable: true });
      }
    });
  }

  onSendCaptchaHandler = (e) => {
    const { form: { validateFields } } = this.props;
    const { banCardFrontImgType } = this;
    e.preventDefault();
    if (this.state.seconds) return;
    validateFields(({ captcha, ...error }, values) => {
      if (Object.keys(error).length) {
        Toast.fail('请完善信息');
        this.setState({ error });
      } else {
        values.accountNo = values.accountNo.replace(/\s/ig, '');
        [values.bankCode] = Array.isArray(values.bankCode) ? values.bankCode : values.bankCode;
        values.bankCardFrontImg = this.pathes[this.keys[0]];
        if (banCardFrontImgType) values.banCardFrontImgType = banCardFrontImgType;
        this.setState({ error: undefined });
        this.props.dispatch({ type: 'account/sendBindCardCode', payload: values }).then(({ resultId }) => {
          this.resultId = resultId;
        });
        this.loop(60);
      }
    });
  }

  loop = (seconds) => {
    this.setState({ seconds });
    if (seconds) {
      setTimeout(this.loop.bind(this, seconds - 1), 1000);
    }
  }

  render() {
    const {
      form: { getFieldProps }, cardInfo, id, readonly,
    } = this.props;
    const { error } = this.state;
    const card = cardInfo[id] || {};
    const getFieldDecorator = (field, options) => {
      return { id: field, error, ...getFieldProps(field, options) };
    };
    let captchaNode = <a className={styles.captcha} onClick={this.onSendCaptchaHandler}>接收验证码</a>;
    if (this.state.seconds) {
      captchaNode = <a style={{ color: '#ccc' }}>({this.state.seconds})秒</a>;
    }

    return (<Loading loading={this.props.loading} mask={false} >
      <main className={styles['bind-card']}>
        <content>
          <List className={styles.disabled}>
            <InputItem
              {
                ...getFieldDecorator('realName', {
                  initialValue: card.accountName || this.state.userInfo.realName,
                  rules: [
                    { required: true, message: '请输入用户姓名' },
                    { pattern: ZH_CN, message: '用户姓名必须为中文名' },
                  ],
                })
              }
              clear
              placeholder="请输入用户的姓名"
              editable={false}
            >持卡人</InputItem>
            <InputItem
              {
                ...getFieldDecorator('idCardNo', {
                  initialValue: this.state.userInfo.idCardNo,
                  rules: [
                    { required: true, message: '请输入用户身份证号' },
                    { pattern: ID_CARD, message: '请输入正确的身份证号' },
                  ],
                })
              }
              clear
              placeholder="请输入用户的身份证号"
              maxLength={18}
              editable={false}
            >身份证号</InputItem>
          </List>
          <List>
            <InputItem
              {
                ...getFieldDecorator('accountNo', {
                  initialValue: card.cardNo,
                  rules: [{ required: true, message: '请输入银行卡号' }],
                })
              }
              clear
              placeholder={this.state.cognized ? '请拍摄您的银行卡正面' : '请输入您的银行卡号'}
              extra={readonly ? null : <div>
                <ImagePicker
                  title="银行卡正面"
                  camera="bank"
                  onChange={this.onChangeHandler.bind(this, this.keys[0])}
                  src={this.state[this.keys[0]]}
                  style={this.getPickerStyle(this.keys[0], '5_1')}
                />
                {this.getPickerError(this.keys[0], '5_1', { marginTop: 0 })}
              </div>}
              className={styles.bankPhoto}
              disabled={readonly}
              editable={this.state.editable}
            >银行卡号</InputItem>
            <Picker
              {
                ...getFieldDecorator('bankCode', {
                  initialValue: [card.bankCode],
                  rules: [{ required: true, message: '请选择开户行' }],
                })
              }
              data={BANKS}
              extra={<span style={{ color: '#B7C0C9' }}>请选择开户行</span>}
              cols={1}
              disabled={readonly || !this.state.editable}
              className={readonly ? styles.disabled : ''}
            >开户行</Picker>
            <InputItem
              {
                ...getFieldDecorator('phoneNo', {
                  initialValue: card.mobile || this.state.userInfo.phoneNo,
                  rules: [
                    { required: true, message: '请输入银行预留手机号' },
                    { pattern: PHONE, message: '请正确输入手机号', transform(value) { return value ? value.replace(/\s/ig, '') : value; } },
                  ],
                })
              }
              clear
              placeholder="请输入银行预留手机号"
              labelNumber={7}
            >银行预留手机号
            </InputItem>
            <InputItem
              {
                ...getFieldDecorator('captcha', {
                  rules: [
                    { required: true, message: '请输入验证码' },
                  ],
                })
              }
              clear
              placeholder="请输入验证码"
              labelNumber={7}
              extra={captchaNode}
            >短信验证码</InputItem>
          </List>
          <div className={styles.tips}>
            <h5>温馨提示：</h5>
            <section>【银行卡预留手机号】≠【接收短信手机号】，可联系银行客服人员查询或更换。</section>
          </div>
        </content>
        <footer className={styles['btn-container']}>
          <Button type="primary" onClick={this.onOkHandler}>{this.props.id ? '立即验证' : '立即添加'}</Button>
        </footer>
      </main>
    </Loading>);
  }
}
