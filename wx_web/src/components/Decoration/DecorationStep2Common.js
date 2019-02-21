import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { getImageCameraType } from '../../utils/image-util';
import ImagePicker from '../common/ImagePicker/FlexImagePicker';
import IDCardFrontOverLayer from '../common/IDCardFrontOverLayer';
import IDCardHandledOverLayer from '../common/IDCardHandledOverLayer';
import BaseImagePage from '../common/BaseImageUploade';
import { MARRIED } from '../../picker-data';
import Header from './Header';
import Button from '../common/Button';
import styles from './ImagePage.less';

@connect(state => ({
  loan: state.decoration.loan,
  contract: state.decoration.contract,
  loading: state.loading.models.decoration,
  exception: state.global.exception,
  guarantorCount: state.decoration.guarantorCount,
}))
@createForm()
export default class DecorationStep2 extends BaseImagePage {
  state = { info: {} }

  componentWillMount() {
    this.LOAN_ID = btoa(this.props.id);
    this.props.dispatch({ type: 'decoration/getLoan', payload: this.props.id });
    this.props.dispatch({ type: 'decoration/getContract', payload: this.props.id });
    this.props.dispatch({ type: 'decoration/getLoanAmount', payload: this.props.id });
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    const {
      loan, id, contract, guarantorCount,
    } = nextProps;

    this.setState({
      contract: contract && contract[id],
      info: (loan && loan[id] && loan[id].info) || {},
      guarantorCount: guarantorCount && guarantorCount[id],
    });

    // 初始化驳回错误信息
    this.initError(nextProps, ['idCard', 'bankCard']);
  }
  getNativeCameraType = (type, src, source) => {
    if (source === 'native') {
      if (type === 'commonIdenTityFront') this.idCardFrontType = getImageCameraType(src);
      if (type === 'commonIdenTityReverse') this.idCardBackType = getImageCameraType(src);
      if (type === 'commonBankFront') this.banCardFrontImgType = getImageCameraType(src);
    }
    this.onImageUploadedHandler(type, src);
  }

  onOkHandler = () => {
    const amount = this.state.contract ? this.state.contract.loanAmount : 0;
    let flag = true;
    this.keys.forEach((key, i) => {
      if (i === 3 && amount <= 200000) return;
      if ((this.state.info.marriage !== MARRIED || this.props.step > 1) && i >= 4) return;
      if (!this.pathes || !this.pathes[key]) {
        flag = false;
      }
    });

    if (!flag) {
      Toast.fail('请补全图片资料', 2, null, false);
      return;
    }

    this.doSaveImage();
  }

  doSaveImage = () => {
    const { id, dispatch } = this.props;
    const infoStep = { 1: '', 2: 'Two', 3: 'Three' }[this.props.step];
    const param = Object.assign({}, this.pathes);
    const { idCardFrontType, idCardBackType, banCardFrontImgType } = this;
    this.keys.slice(0, 4).forEach((key) => {
      if (this.pathes[key]) {
        const path = this.pathes[key];
        delete param[key];
        param[key.replace(/([a-z]+)/, `$1${infoStep}`)] = path;
      }
    });
    dispatch({ type: 'decoration/saveImage', payload: { image: param, imageTypeVo: { idCardFrontType, idCardBackType, banCardFrontImgType }, id } }).then(() => {
      if (this.state.guarantorCount > this.props.step) {
        dispatch(routerRedux.push({
          pathname: `/decoration/${btoa(id)}/step/2/common/${this.props.step + 1}`,
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: `/decoration/${btoa(id)}/step/3`,
        }));
      }
    });
  }

  getCommonParamName = (name) => {
    const infoStep = { 1: '', 2: 'Two', 3: 'Three' }[this.props.step];
    return name.replace(/([a-z]+)/, `$1${infoStep}`);
  }

  keys = [
    'commonIdenTityFront', // 共借人身份证正面
    'commonIdenTityReverse', // 共借人身份证反面
    'commonIdenTityHold', // 共借人手持身份证
    'commonBankFront', // 共借人银行卡
    'marrage', // 结婚照
    'marriageCover', // 结婚照封皮
  ]

  render() {
    const infoStep = { 1: '', 2: '2_', 3: '3_' }[this.props.step];
    return (<div className={`${styles.container} ${styles['container-flex']}`}>
      <div className={styles.scroll}>
        <Header current={1} />
        <div className={styles.content} style={{ minHeight: 'calc(100VH - 2.6rem)' }}>
          <h4>共借人{{ 1: '', 2: '二', 3: '三' }[this.props.step]}身份证</h4>
          <ImagePicker
            camera="idCardFront"
            title="身份正正面"
            onChange={this.getNativeCameraType.bind(this, this.keys[0])}
            overlayer={<IDCardFrontOverLayer />}
            src={this.state[this.getCommonParamName(this.keys[0])]}
            style={this.getPickerStyle(this.keys[0], `13_${infoStep}1`)}
          />
          {this.getPickerError(this.keys[0], `13_${infoStep}1`)}
          <ImagePicker
            camera="idCardReverse"
            title="身份证反面"
            onChange={this.getNativeCameraType.bind(this, this.keys[1])}
            src={this.state[this.getCommonParamName(this.keys[1])]}
            style={this.getPickerStyle(this.keys[1], `13_${infoStep}2`)}
          />
          {this.getPickerError(this.keys[1], `13_${infoStep}2`)}
          <ImagePicker
            title="手持身份证面"
            onChange={this.onImageUploadedHandler.bind(this, this.keys[2])}
            overlayer={<IDCardHandledOverLayer />}
            src={this.state[this.getCommonParamName(this.keys[2])]}
            style={this.getPickerStyle(this.keys[2], `13_${infoStep}3`)}
          />
          {this.getPickerError(this.keys[2], `13_${infoStep}3`)}
          {this.state.contract && this.state.contract.loanAmount > 200000 ? <h4>共借人{{ 1: '', 2: '二', 3: '三' }[this.props.step]}银行卡</h4> : null}
          {
            this.state.contract && this.state.contract.loanAmount > 200000 ? <ImagePicker
              camera="bank"
              title="银行卡正面"
              onChange={this.getNativeCameraType.bind(this.keys[3])}
              overlayer={<IDCardHandledOverLayer />}
              src={this.state[this.getCommonParamName(this.keys[3])]}
            /> : null
          }
          {this.state.info.marriage === MARRIED && this.props.step === 1 ? <h4>结婚证书</h4> : null}
          {
            this.state.info.marriage === MARRIED && this.props.step === 1 ? <ImagePicker
              title="信息页"
              onChange={this.onImageUploadedHandler.bind(this, this.keys[4])}
              src={this.state[this.keys[4]]}
            /> : null
          }
          {
            this.state.info.marriage === MARRIED && this.props.step === 1 ? <ImagePicker
              title="封皮页"
              onChange={this.onImageUploadedHandler.bind(this, this.keys[5])}
              src={this.state[this.keys[5]]}
            /> : null
          }
        </div>
      </div>
      <div className={styles['btn-container-image']}>
        <Button type="primary" onClick={this.onOkHandler}>下一步</Button>
      </div>
    </div>);
  }
}
