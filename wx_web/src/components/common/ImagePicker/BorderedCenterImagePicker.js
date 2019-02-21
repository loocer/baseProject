import React from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import Icon from '../Icon';
import ImagePicker from './ImagePicker';
import IconPlusSVG from '../../../assets/fonts/plus-strong.svg';
import styles from './BorderedCenterImagePicker.less';

@connect(state => ({ token: state.global.qn.token }))
export default class BorderedCenterImagePicker extends ImagePicker {
  getChildren() {
    return (<Flex justify="center" wrap="wrap" direction="column" key="btn">
      <Flex.Item><Icon type={IconPlusSVG} size="xs" /></Flex.Item>
      <Flex.Item><span key="title" className="title">{this.props.title}</span></Flex.Item>
    </Flex>);
  }

  render() {
    const className = styles['image-picker-stretch'];
    const children = this.getChildren();
    return this.renderPicker(className, children, this.props.style);
  }
}
