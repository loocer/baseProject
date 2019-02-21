import React from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import Icon from '../Icon';
import ImagePicker from './ImagePicker';
import IconPlusSVG from '../../../assets/fonts/plus-circle.svg';
import styles from './StretchImagePicker.less';

@connect(state => ({ token: state.global.qn.token }))
export default class StretchImagePicker extends ImagePicker {
  getChildren() {
    const children = [];
    children.push(<Flex justify="center" wrap="wrap" direction="column" key="btn">
      <Flex.Item><Icon type={IconPlusSVG} size="lg" /></Flex.Item>
    </Flex>);
    children.push(<span key="title" className="title">{this.props.title}</span>);
    return children;
  }

  render() {
    const className = styles['image-picker-stretch'];
    const children = this.getChildren();
    return this.renderPicker(className, children, this.props.style);
  }
}
