import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { Modal } from 'antd-mobile';
import ImagePicker from '../common/ImagePicker/FlexImagePicker';
import Header from './Header';
import BaseImagePage from '../common/BaseImageUploade';
import SuccessPage from '../common/Success';
import Button from '../common/Button';
import styles from './ImagePage.less';

@connect(state => ({
  loan: state.decoration.loan,
  loading: state.loading.models.decoration,
  exception: state.global.exception,
}))
@createForm()
export default class DecorationStep4 extends BaseImagePage {
  constructor(props) {
    super(props);
    this.state = { pathes: {} };
    let i = 0;
    while (i < 100) this.keys.push(`addcreditCertificates${i++}`);
  }

  componentWillMount() {
    this.LOAN_ID = btoa(this.props.id);
    this.props.dispatch({ type: 'decoration/getLoan', payload: this.props.id });
  }

  onOkHandler = (e) => {
    e.preventDefault();
    const { id, dispatch } = this.props;

    this.saving = true;
    document.body.scrollTop = 0;
    dispatch({ type: 'decoration/submit', payload: { image: { addcreditCertificates: Object.values(this.pathes) }, id } }).then(() => {
      this.setState({ success: true });
    });
  }

  onUploadedHandler = (type, path) => {
    this.onImageUploadedHandler(type, path);
    this.setState({ rerender: true });
  }

  keys = []

  renderPickers = () => {
    const pathes = this.pathes || {};
    const keys = this.keys.filter((key, i) => i <= Object.keys(pathes).length).reverse();

    return keys.map((key) => {
      const props = {};
      if (this.state[key]) props.src = this.state[key];

      return (<ImagePicker
        title={pathes[key] ? '个人增信' : '添加个人增信'}
        key={key}
        onChange={this.onUploadedHandler.bind(this, key)}
        {...props}
      />);
    });
  }

  render() {
    return (<div className={`${styles.container} ${styles['container-flex']}`}>
      <div className={styles.scroll}>
        <Header current={3} />
        <main className={styles.content} style={{ minHeight: 'calc(100VH - 2.6rem)' }}>
          <h4>个人增信证明</h4>
          {this.renderPickers()}
          <div className="clearfix" />
        </main>
      </div>
      <div className={styles['btn-container-image']}>
        <Button type="primary" onClick={this.onOkHandler}>提交</Button>
      </div>
      <Modal
        transparent
        maskClosable={false}
        visible={this.state.success}
        platform="android"
      >{this.state.success && <SuccessPage />}</Modal>
    </div>);
  }
}
