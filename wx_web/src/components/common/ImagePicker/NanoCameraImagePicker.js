import React from 'react';
import { connect } from 'dva';
import ImagePicker from './ImagePicker';
import Icon from '../Icon';
import Carerem from '../../../assets/fonts/carerem.svg';

@connect(state => ({ token: state.global.qn.token }))
export default class CarmeraImagePicker extends ImagePicker {
  hide = true;

  getChildren = () => {
    return <Icon type={Carerem} />;
  }

  render() {
    const children = this.getChildren();
    return this.renderPicker('', children, this.props.style);
  }
}
