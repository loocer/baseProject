import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import ImagePicker from '../common/ImagePicker/FlexImagePicker';
import Header from './Header';
import BaseImagePage from '../common/BaseImageUploade';
import Button from '../common/Button';
import styles from './ImagePage.less';

@connect(state => ({
  loan: state.decoration.loan,
  loading: state.loading.models.decoration,
  exception: state.global.exception,
}))
@createForm()
export default class DecorationStep3 extends BaseImagePage {
  state = { info: {} }

  componentWillMount() {
    this.LOAN_ID = btoa(this.props.id);
    this.props.dispatch({ type: 'decoration/getLoan', payload: this.props.id });
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    const {
      loan, id, loading, exception,
    } = nextProps;

    if (loan && loan[id]) {
      this.setState({ info: loan[id].info });
    }

    // 初始化驳回错误信息
    this.initError(nextProps, 'contract');

    if (this.saving && !loading) {
      this.saving = false;
      if (!exception) {
        this.props.dispatch(routerRedux.push({
          pathname: `/decoration/${btoa(id)}/step/4`,
        }));
      }
    }
  }

  onOkHandler = () => {
    const { id, dispatch, loan } = this.props;
    const { info } = loan[id];
    const index = {
      '02': { start: 0, end: 3 },
      '01': { start: 6, end: 12 },
      houseContract: { start: 6, end: 12 },
      propertyOwnership: { start: 0, end: 3 },
    }[info.securities || '01'];
    let flag = true;

    this.keys.forEach((key, i) => {
      if ((i >= index.start && i <= index.end) && (!this.pathes || !this.pathes[key])) {
        flag = false;
      }
    });

    if (flag) {
      this.saving = true;
      dispatch({ type: 'decoration/saveImage', payload: { image: this.pathes, id } });
    } else {
      document.body.scrollTop = 0;
      Toast.fail('请上传相关图片资料', 2, null, false);
    }
  }

  keys = [
    'fangchangzhengRedCover', // 房产证封皮页
    'fangchangzhengFazhengSeaL', // 房产证发证机关盖章页
    'fangchangzhengHouseInfo', // 房产证房屋信息页
    'fangchangzhengTianfaSeal', // 房产证房屋填发单位盖章页
    'fangchanzhengBuchong1', // 房产证补充1
    'fangchanzhengBuchong2', // 房产证补充2
    'purchaseContractInfo', // 购房合同买卖双方信息页
    'purchaseContractAdress', // 购房合同房屋坐落地址页
    'purchaseContractArea', // 购房合同房屋面积页
    'purchaseContractRent', // 购房合同购房金额页
    'purchaseContractType', // 购房合同付款方式页
    'purchaseContractDate', // 购房合同交房日期页
    'purchaseContractStamp', // 购房合同双方签字页
  ]

  render() {
    return (<div className={`${styles.container} ${styles['container-flex']}`}>
      <div className={styles.scroll}>
        <Header current={2} />
        {
          this.state.info.securities === '02' || this.state.info.securities === 'propertyOwnership' ?
            <main className={styles.content} style={{ minHeight: 'calc(100VH - 2.6rem)' }}>
              <h4>房产证</h4>
              <ImagePicker
                fill
                size={3}
                title="红色封皮首页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[0])}
                src={this.state[this.keys[0]]}
                style={this.getPickerStyle(this.keys[0], '7_1')}
              />
              <ImagePicker
                fill
                size={3}
                title="发证机关盖章页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[1])}
                src={this.state[this.keys[1]]}
              />
              <ImagePicker
                fill
                size={3}
                title="房屋信息页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[2])}
                src={this.state[this.keys[2]]}
              />
              <ImagePicker
                fill
                size={3}
                title="房屋填发单位盖章页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[3])}
                src={this.state[this.keys[3]]}
              />
              <ImagePicker
                fill
                size={3}
                title="补充资料"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[4])}
                src={this.state[this.keys[4]]}
              />
              <ImagePicker
                fill
                size={3}
                title="补充资料"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[5])}
                src={this.state[this.keys[5]]}
              />
              <div>{this.getPickerError(this.keys[0], '7_1', { marginTop: 0 })}</div>
              <div className="clearfix" />
            </main>
              :
            <main className={styles.content} style={{ minHeight: 'calc(100VH - 2.6rem)' }}>
              <h4>购房合同</h4>
              <ImagePicker
                fill
                size={3}
                title="双方信息页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[6])}
                src={this.state[this.keys[6]]}
                style={this.getPickerStyle(this.keys[6], '2_1')}
              />
              <ImagePicker
                fill
                size={3}
                title="地址页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[7])}
                src={this.state[this.keys[7]]}
              />
              <ImagePicker
                fill
                size={3}
                title="面积页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[8])}
                src={this.state[this.keys[8]]}
              />
              <ImagePicker
                fill
                size={3}
                title="购房金额页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[9])}
                src={this.state[this.keys[9]]}
              />
              <ImagePicker
                fill
                size={3}
                title="付款方式页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[10])}
                src={this.state[this.keys[10]]}
              />
              <ImagePicker
                fill
                size={3}
                title="交房日期页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[11])}
                src={this.state[this.keys[11]]}
              />
              <ImagePicker
                fill
                size={3}
                title="双方签字页"
                onChange={this.onImageUploadedHandler.bind(this, this.keys[12])}
                src={this.state[this.keys[12]]}
              />
              <div>{this.getPickerError(this.keys[6], '2_1', { marginTop: 0 })}</div>
              <div className="clearfix" />
            </main>
          }
      </div>
      <div className={styles['btn-container-image']}>
        <Button type="primary" onClick={this.onOkHandler}>下一步</Button>
      </div>
    </div>);
  }
}
