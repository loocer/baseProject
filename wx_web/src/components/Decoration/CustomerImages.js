import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Toast } from 'antd-mobile';
import BaseImages from '../common/BaseImageUploade';
import ImagePicker from '../common/ImagePicker/StretchImagePicker';
import { close } from '../../utils/pageutil';
import Button from '../common/Button';
import styles from '../common/button.less';

@connect(state => ({
  loan: state.decoration.loan,
  loading: state.loading.models.decoration,
  exception: state.global.exception,
}))
export default class CustomerImages extends BaseImages {
  state = {};

  componentWillMount() {
    const { id, times } = this.props;
    this.LOAN_ID = btoa(id);
    this.keys = times && `${times}`.charAt(0) === '2' ? ['16_1', '16_2', '16_3', '16_4', '16_5'] : ['15_1', '15_2', '15_3', '15_4', '15_5'];
    // this.props.dispatch({ type: 'decoration/getLoan', payload: this.props.id });
    this.onLoadImagesHandler({});
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    const { loading, exception } = nextProps;

    if (this.saving && !loading) {
      this.saving = false;
      if (!exception) {
        Toast.success('保存成功', 2, close);
      }
    }
  }

  onOkHandler = (e) => {
    const { dispatch, times } = this.props;
    let flag = true;

    e.preventDefault();

    this.keys.forEach((key) => {
      if (!this.pathes || !this.pathes[key]) {
        flag = false;
      }
    });

    if (flag) {
      this.saving = true;
      const param = { image: this.pathes, id: this.props.id };
      if (times) {
        param.times = times && `${times}`.charAt(0);
      }
      dispatch({ type: 'decoration/saveCustomerImages', payload: param });
    } else {
      Toast.fail('请上传相关下户图片', 2, null, false);
    }
  }

  render() {
    return (<div>
      <ImagePicker
        title="小区入口照片"
        onChange={this.onImageUploadedHandler.bind(this, this.keys[0])}
        src={this.state[this.keys[0]]}
      />
      <ImagePicker
        title="楼号照片"
        onChange={this.onImageUploadedHandler.bind(this, this.keys[1])}
        src={this.state[this.keys[1]]}
      />
      <ImagePicker
        title="单元门号照片"
        onChange={this.onImageUploadedHandler.bind(this, this.keys[2])}
        src={this.state[this.keys[2]]}
      />
      <ImagePicker
        title="入户门号照片"
        onChange={this.onImageUploadedHandler.bind(this, this.keys[3])}
        src={this.state[this.keys[3]]}
      />
      <ImagePicker
        title="与申请人及签约人合照"
        onChange={this.onImageUploadedHandler.bind(this, this.keys[4])}
        src={this.state[this.keys[4]]}
      />
      <div className="clearfix" />
      <WhiteSpace size="xl" />
      <div className={styles['btn-container']}>
        <Button type="primary" onClick={this.onOkHandler}>提交</Button>
      </div>
      <WhiteSpace size="xl" />
    </div>);
  }
}
