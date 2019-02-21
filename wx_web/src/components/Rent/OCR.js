import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast, ActivityIndicator, Modal } from 'antd-mobile';
import { getImageCameraType } from '../../utils/image-util';
import ImagePicker from '../common/ImagePicker/CameraImagePicker';
import BaseImageUpload from '../common/BaseImageUploade';
import IDCardFrontOverLayer from '../common/IDCardFrontOverLayer';
import Button from '../common/Button';
import styles from './OCR.less';

@connect(state => ({
  user: state.global.user,
  loan: state.rent.loan,
  detail: state.loan.detail || {},
  contract: state.rent.contract,
  idCard: state.ocr.idCard,
  loading: state.loading.models.global || state.loading.models.rent || state.loading.models.ocr,
}))
export default class OCR extends BaseImageUpload {
  keys = ['idCardFront', 'idCardReverse', 'idCardHold'];
  state = { error: {} };

  componentWillMount() {
    const { dispatch, id } = this.props;
    this.LOAN_ID = btoa(id);
    dispatch({ type: 'global/getQiNiuToken' });
    dispatch({ type: 'global/getUserInfo' });
    dispatch({ type: 'rent/getContract', payload: id });
    dispatch({ type: 'rent/getLoan', payload: id }).then(() => {
      const { loan } = this.props;
      const { image } = loan[id];

      this.initError(this.props, 'idCard');

      if (!image || !image.idCardFront || !image.idCardReverse) {
        dispatch({ type: 'global/getUserInfo' }).then(() => {
          const { user } = this.props;

          this.onLoadImagesHandler({
            idCardFront: user.idCardFrontImg,
            idCardReverse: user.idCardBackImg,
          });
        });
      }
    });
    dispatch({ type: 'loan/getLoan', payload: id }).then(() => {
      const { detail, hasHold } = this.props;

      if (detail && detail[id] && !hasHold) {
        const { fieldsMap } = detail[id];
        let has = false;

        Object.values(fieldsMap).forEach((reason) => {
          if (reason.category === 'idCard' && reason.property === '1_3') has = true;
        });

        this.setState({ hasHold: has });
      } else if (hasHold) {
        this.setState({ hasHold });
      }
    });
  }
  onChangedHandler = (i, src, source) => {
    if (source === 'native') {
      if (i === 0) this.idCardFrontType = getImageCameraType(src);
      if (i === 1) this.idCardBackType = getImageCameraType(src);
    }
    this.props.dispatch({ type: 'ocr/cognizeIdCard', payload: { [i ? 'idCardReverse' : 'idCardFront']: src } }).then(() => {
      const { contract, id, idCard } = this.props;
      const data = contract[id] || {};
      const oldPath = this.state[this.keys[i]];

      if (i || (data.name === idCard.name && data.idCard === idCard.idCardNo) || !oldPath) {
        this.onImageUploadedHandler(this.keys[i], src);
      } else {
        Modal.alert('您确定上传该照片吗?', '', [
          { text: '取消', onPress: this.onImageUploadedHandler.bind(this, this.keys[i], oldPath.substr(oldPath.indexOf('/upload'))) },
          {
            text: '确定',
            style: { background: '#1B88EE', color: '#FFF' },
            onPress: () => {
              this.onImageUploadedHandler(this.keys[i], src);
            },
          },
        ]);
      }
    });
  }

  onOkHandler = () => {
    const hasNotHold = !this.state.hasHold || !!this.pathes[this.keys[2]];
    const { idCardFrontType, idCardBackType } = this;
    if (!this.pathes || Object.values(this.pathes).length < 2 || !hasNotHold) {
      Toast.fail('请补全图片资料', 2, null, false);
    } else {
      const {
        dispatch, id, redirect, edit,
      } = this.props;

      dispatch({ type: 'rent/saveImage', payload: { image: { ...this.pathes }, imageTypeVo: { idCardFrontType, idCardBackType }, id } }).then(() => {
        sessionStorage.setItem('$$OCR-SAVED', '1');
        this.props.dispatch(routerRedux.push({
          pathname: redirect || `/rent/${btoa(id)}/step/1`,
          search: edit ? '?edit=true&redirected=true' : '?redirected=true',
        }));
      });
    }
  }

  render() {
    const style = {
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
      background: 'rgba(0, 0, 0, .5)',
    };

    return (<div className={styles['step-info']} style={{ paddingTop: '.12rem' }}>
      {
        this.props.loading ? <section style={style}>
          <ActivityIndicator color="white" loading size="large" />
        </section> : null
      }
      <ImagePicker
        camera="idCardFront"
        title="身份证正面"
        onChange={this.onChangedHandler.bind(this, 0)}
        src={this.state[this.keys[0]]}
        overlayer={<IDCardFrontOverLayer />}
        error={this.state.error['1_1']}
      />
      <ImagePicker
        camera="idCardReverse"
        title="身份证反面"
        onChange={this.onChangedHandler.bind(this, 1)}
        src={this.state[this.keys[1]]}
        error={this.state.error['1_2']}
      />
      {
        this.state.hasHold ? <ImagePicker
          title="手持身份证"
          onChange={this.onImageUploadedHandler.bind(this, this.keys[2])}
          src={this.state[this.keys[2]]}
          error={this.state.error['1_3']}
        /> : null
      }
      <div className={styles['btn-container']}>
        <Button type="primary" onClick={this.onOkHandler}>{this.props.edit ? '下一步' : '确定'}</Button>
      </div>
    </div>);
  }
}
