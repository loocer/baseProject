import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import ImagePicker from './ImagePicker';
import IconPlusSVG from '../../../assets/fonts/plus.svg';
import styles from './FlexImagePicker.less';

@connect(state => ({ token: state.global.qn.token }))
export default class FlexImagePicker extends ImagePicker {
  static propTypes = {
    fill: PropTypes.bool,
    size: PropTypes.number,
  }

  getStyle = () => {
    const { fill, size } = this.props;
    const style = {};

    if (fill) {
      style.width = style.height = `calc(100VW / ${size} - ${0.15 + (0.15 / size)}rem)`; // eslint-disable-line
    }

    return Object.assign(style, this.props.style);
  }

  getChildren() {
    const children = [];
    children.push(<span key="btn" className="btn-plus"><Icon type={IconPlusSVG} size="md" /></span>);
    children.push(<span key="title" className="title">{this.props.title}</span>);
    return children;
  }

  render() {
    const className = styles['image-picker-flex'];
    const children = this.getChildren();
    const style = this.getStyle();
    return super.renderPicker(className, children, style);
  }
}
