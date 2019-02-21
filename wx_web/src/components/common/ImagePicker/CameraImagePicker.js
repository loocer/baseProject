import React from 'react';
import { connect } from 'dva';
import ImagePicker from './ImagePicker';
import ImgCamera from '../../../assets/camera@xhdpi.png';
import ImgCamera2X from '../../../assets/camera@2x.png';
import ImgCamera3X from '../../../assets/camera@3x.png';
import styles from './CameraImagePicker.less';

@connect(state => ({ token: state.global.qn.token }))
export default class CameraImagePicker extends ImagePicker {
  getChildren() {
    return (<section className={styles.wrapper} key="camera">
      <img
        src={ImgCamera}
        srcSet={`${ImgCamera2X} 2x,${ImgCamera3X} 3x`}
        alt="camera"
        className="camera"
      />
      <span key="title" className="title">{this.props.title}</span>
    </section>);
  }

  render() {
    const cls = `${styles['image-picker-camera']} ${this.props.className || ''}`;
    const className = this.props.error ? `${styles.error} ${cls}` : cls;
    const children = this.getChildren();
    return this.renderPicker(className, children, this.props.style);
  }
}
