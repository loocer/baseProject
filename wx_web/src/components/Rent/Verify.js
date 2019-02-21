import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Button, List, Checkbox, Modal, Toast, Progress } from 'antd-mobile';
import SuccessPage from '../common/Success';
import Icon from '../common/Icon';
import { deducePlatform, startAutoReview } from '../../utils/platform';
import { getImageCameraType } from '../../utils/image-util';
import { BANK_TYPE_MAPPING } from '../../constants';
import BaseImagePage from '../common/BaseImageUploade';
import ImagePicker from '../common/ImagePicker/CameraImagePicker';
import Loading from '../common/Loading';
import IconPerson from '../../assets/fonts/person.svg';
import ImgCamera from '../../assets/camera@xhdpi.png';
import ImgCamera2X from '../../assets/camera@2x.png';
import ImgCamera3X from '../../assets/camera@3x.png';
import styles from './Verify.less';

@connect(state => ({
  detail: state.loan.detail || {},
  hasCard: state.bank.hasCard,
  card: state.bank.detail || {},
  contract: state.rent.contract || {},
  loan: state.rent.loan || {},
  user: state.global.user,
  repayment: state.loan.repayment || {},
  loading: state.loading.models.loan || state.loading.models.bank || state.loading.rent,
}))
export default class Verify extends BaseImagePage {
  state = { disabled: true };

  keys = ['card'];

  componentWillReceiveProps({ card, id }) {
    this.loanId = id;

    if (card[this.cardId] && card[this.cardId].bankCardFrontImg) {
      this.onLoadImagesHandler({ card: card[this.cardId].bankCardFrontImg });
    }
  }

  componentWillMount() {
    const { dispatch, cardId, id } = this.props;

    dispatch({ type: 'bank/hasCard' });
    dispatch({ type: 'global/getUserInfo' });
    dispatch({ type: 'rent/getContract', payload: id });
    dispatch({ type: 'rent/getLoan', payload: id }).then(() => {
      if (!cardId) {
        const { loan } = this.props;
        const data = loan[id] || {};

        if (data.info && data.info.bankCardId) {
          this.cardId = data.info.bankCardId;
          dispatch({ type: 'bank/getCard', payload: this.cardId });
        }
      }
    });
    dispatch({ type: 'loan/getRepayment', payload: id });
    if (cardId) {
      this.cardId = cardId;
      dispatch({ type: 'bank/getCard', payload: cardId });
    }
  }

  onAgreeChangedHandler = () => {
    this.setState({ disabled: !this.state.disabled });
  }

  onChangeHandler = (src, source) => {
    if (source === 'native') {
      this.banCardFrontImgType = getImageCameraType(src);
    }
    this.onImageUploadedHandler(this.keys[0], src);
    if (!this.props.hasCard) this.toBankCardPage(src);
  }

  onOkHandler = () => {
    if (!this.pathes[this.keys[0]]) {
      Toast.fail('请上传银行卡照片');
    } else {
      const { dispatch, id, loan } = this.props;
      const { banCardFrontImgType } = this;
      const payload = {
        id,
        bankInfo: {
          bankCardFrontImg: this.pathes[this.keys[0]],
          bankCardIdOfBindOrder: this.cardId,
        },
      };

      if (!sessionStorage.getItem('$$OCR-SAVED') && !Object.keys(loan[id].fieldsMap).length) {
        const image = {
          idCardFront: this.props.user.idCardFrontImg,
          idCardReverse: this.props.user.idCardBackImg,
        };
        const imageTypeVo = {
          banCardFrontImgType,
        };
        dispatch({ type: 'rent/saveImage', payload: { image, imageTypeVo, id } }).then(() => {
          dispatch({ type: 'rent/saveBankInfo', payload }).then(this.autoReview);
        });
      } else {
        sessionStorage.removeItem('$$OCR-SAVED');
        dispatch({ type: 'rent/saveBankInfo', payload }).then(this.autoReview);
      }
    }
  }

  autoReview = () => {
    const { dispatch, id } = this.props;

    dispatch({ type: 'loan/getLoan', payload: id }).then(() => {
      const { detail } = this.props;
      const data = (detail && detail[id]) || {};
      const payload = { info: {}, id };

      if (data.needSelfHelpAudit && deducePlatform()) {
        startAutoReview(id, data.canSkip, (path, topicId, times, tag = '0') => {
          dispatch({ type: 'trace/trace', payload: { loanId: id, pathname: '/rent/:id/step/1', search: `?path=${path}&topicId=${topicId}&tag=${tag}&times=${times}` } });

          if (topicId && path) {
            payload.selfHelpAuditVo = {
              vedioPath: path,
              selfHelpAuditQuestionConfigId: topicId,
              times: (times || '').split(',').filter(item => !!item),
              tag,
            };
          }

          dispatch({ type: 'rent/submit', payload }).then(() => {
            this.setState({ success: true });
          });
        });
      } else {
        dispatch({ type: 'rent/submit', payload }).then(() => { this.setState({ success: true }); });
      }
    });
  }

  toBankCardPage = (src) => {
    const { dispatch, id, hasCard } = this.props;
    const route = `/rent/${btoa(id)}/step/1`;

    if (hasCard) {
      dispatch(routerRedux.push({
        pathname: '/bank/card/pick',
        search: `?redirect=${route}&id=${this.cardId}`,
      }));
    } else {
      dispatch(routerRedux.push({
        pathname: '/account/bank/addcard',
        search: `?redirect=/bank/card/pick&redirect=${route}&src=${src}`,
      }));
    }
  }

  toOCRPage = () => {
    const { dispatch, id } = this.props;
    dispatch(routerRedux.push(`/rent/${btoa(id)}/ocr`));
  }

  toPreviewPage = () => {
    const { dispatch, id } = this.props;
    dispatch(routerRedux.push(`/rent/${btoa(id)}/payment`));
  }

  toInfoPage = () => {
    const { dispatch, id } = this.props;
    dispatch(routerRedux.push(`/rent/${btoa(id)}/info`));
  }

  renderCard = () => {
    const { contract, id } = this.props;
    const data = contract[id] || {};

    return (<section className={styles['card-wrap']}>
      <section className={styles.card}>
        <section>
          <h3>房租e分期申请</h3>
          <div><label onClick={this.toOCRPage}>申请人：{data.name}
            <span><Icon type={IconPerson} />证件照片</span></label></div>
          <div>
            <label>申请金额：{data.loanAmount}元</label>
            <label>分期期数：{data.loanPeriod}期</label>
          </div>
          <div>
            <label>租房机构：{data.enterpriseName}</label>
            <label>服务费用：{data.fees}元</label>
          </div>
        </section>
        <section onClick={this.toInfoPage}>
          <List><List.Item arrow="horizontal">租房详情</List.Item></List>
        </section>
      </section>
    </section>);
  }

  renderPreview = () => {
    const {
      card, repayment, id, loan,
    } = this.props;
    const data = card[this.cardId];
    const l = loan[id] || {};
    const r = repayment[id] || [];
    const error = l.fieldsMap && Object.values(l.fieldsMap).filter(item => item.category === 'bankCard').length;

    return (<List className={styles.preview}>
      <List.Item
        extra={`每月${r[0] && (new Date(r[0].expectedDate)).getDate()}号还款${r[0] && r[0].expectedAmount}元`}
        arrow="horizontal"
        onClick={this.toPreviewPage}
      >还款预览</List.Item>
      <List.Item arrow="horizontal" onClick={this.toBankCardPage}>
        <section>
          <h3>还款银行卡</h3>
          {
            data && data.cardNo ? <div>
              {BANK_TYPE_MAPPING[data.bankCode]}(****{
                data.cardNo.substr(data.cardNo.length - 4)
              })
            </div> : <div>您还没有绑定银行卡,<a>立即添加</a></div>
          }
        </section>
      </List.Item>
      <section className={`${styles.picker} ${error && styles.error}`}>
        {
          data || !this.props.hasCard ? <ImagePicker
            camera="bank"
            className={styles.camera}
            src={this.state[this.keys[0]]}
            onChange={this.onChangeHandler}
            onProgress={(percent) => { this.setState({ percent }); }}
            title="银行卡照片"
          /> : <img
            src={ImgCamera}
            srcSet={`${ImgCamera2X} 2x,${ImgCamera3X} 3x`}
            alt="camera"
            className="camera"
            onClick={this.toBankCardPage}
          />
        }
        <div className={styles.label}>银行卡照片</div>
      </section>
    </List>);
  }

  render() {
    return (<Loading loading={this.props.loading}>
      <div className={styles.wrap}>
        {!this.state.percent || this.state.percent === 100 ? null : <Progress position="fixed" percent={this.state.percent} />}
        {this.renderCard()}
        {this.renderPreview()}
        <List className={styles.protocol}>
          <List.Item arrow="horizontal">
            <Checkbox.AgreeItem onChange={this.onAgreeChangedHandler}>
              同意征信授权和服务协议
              <Link to={`/protocol/${btoa(this.props.id)}`} className={styles.fr}>协议内容</Link>
            </Checkbox.AgreeItem>
          </List.Item>
        </List>
        <footer><Button type="primary" onClick={this.onOkHandler} disabled={this.state.disabled}>下一步</Button></footer>
        <Modal
          transparent
          maskClosable={false}
          visible={this.state.success}
          platform="android"
        >{this.state.success && <SuccessPage />}</Modal>
      </div>
    </Loading>);
  }
}
