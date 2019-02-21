import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Spin } from 'antd';
import styles from './DraggableImage.less';

export default class DraggableImage extends Component {
  static propTypes = {
    title: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired,
    srcSet: PropTypes.array.isRequired,
    current: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    const { srcSet, current } = props;
    this.state = {
      srcSet: srcSet || [],
      current,
      maxWidth: `${document.documentElement.clientWidth * 0.8}px`,
      maxHeight: `${document.documentElement.clientHeight * 0.8}px`,
      loading: true,
    };
    this.angle = 0;
  }

  componentWillUnmount() {
    this.draggable = false;
  }

  onCloseHandler = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  onResetDragDivHandler = (angle) => {
    const style = window.getComputedStyle(this.img);
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10);
    this.dragDiv.style.width = `${width / 2}px`;
    this.dragDiv.style.height = `${height / 2}px`;
    this.dragDiv.style.left = `${(width / 4) + parseInt(style.left, 10)}px`;
    this.dragDiv.style.top = `${(height / 4) + parseInt(style.top, 10)}px`;
    if (angle) {
      this.dragDiv.style.transform = `rotate(${(this.angle + angle) % 360}deg)`;
    }
  }

  onImgLoadedHandler = () => {
    this.onResetDragDivHandler();
    this.setState({ loading: false });
  }

  onChangeImg = (num) => {
    if (this.state.srcSet.length <= 1) return;
    let n = this.state.current + num;
    if (n < 0) {
      n = this.state.srcSet.length - 1;
    } else if (n >= this.state.srcSet.length) {
      n = 0;
    }
    this.setState({ current: n, loading: true });
  }

  onImgRotateHandler = (angle) => {
    this.img.style.transform = `rotate(${(this.angle + angle) % 360}deg)`;
    this.onResetDragDivHandler(angle);
    this.angle = (this.angle + angle) % 360;
  }

  onStartRotateHandler = (e) => {
    e.preventDefault();
    this.imgRotatable = true;
    this.imgStartAngle = this.getImgPointAngle(e.clientX, e.clientY);
  }

  onStopRotateHandler = () => {
    this.imgRotatable = false;
  }

  onRotateHandler = (e) => {
    if (this.imgRotatable) {
      const angle = this.getImgPointAngle(e.clientX, e.clientY);
      this.onImgRotateHandler(angle - this.imgStartAngle);
      this.imgStartAngle = angle;
    }
  }

  onStartDragHandler = (e) => {
    e.preventDefault();
    this.imgDraggable = true;
    this.imgStartX = e.clientX;
    this.imgStartY = e.clientY;
  }

  onStopDragHandler = () => {
    this.imgDraggable = false;
    this.imgRotatable = false;
  }

  onDragHandler = (e) => {
    if (this.imgDraggable) {
      const style = window.getComputedStyle(this.img);
      this.img.style.left = `${parseInt(style.left, 10) + (e.clientX - this.imgStartX)}px`;
      this.img.style.top = `${parseInt(style.top, 10) + (e.clientY - this.imgStartY)}px`;
      this.imgStartX = e.clientX;
      this.imgStartY = e.clientY;
      this.onResetDragDivHandler();
    }
  }

  // 处理鼠标滚轮缩放图片
  onWheelHandler = (e) => {
    const scale = e.deltaY > 0 ? 0.05 : -0.05;
    const width = parseInt(this.img.width || this.img.getBoundingClientRect().width, 10);
    const height = parseInt(this.img.height || this.img.getBoundingClientRect().height, 10);
    this.img.style.width = `${width * (1 - scale)}px`;
    this.img.style.height = `${height * (1 - scale)}px`;
    this.onResetPositionHandler(0, 0, 0, 0);
    this.onResetDragDivHandler();
  }

  // 拖拽处理
  onMouseDownHandler = (e) => {
    this.draggable = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  }

  onMouseUpHandler = () => {
    this.draggable = false;
  }

  onMouseMoveHandler = (e) => {
    if (!this.draggable) return;
    this.onResetPositionHandler(this.startX, e.clientX, this.startY, e.clientY);
    this.startX = e.clientX;
    this.startY = e.clientY;
  }

  onResetPositionHandler = (startX, x, startY, y) => {
    const style = window.getComputedStyle(this.container);
    const width = parseInt(style.width, 10) / 2;
    const height = parseInt(style.height, 10) / 2;
    const offsetX = parseInt(style.left, 10) + (x - startX);
    const offsetY = parseInt(style.top, 10) + (y - startY);
    const clientWidth = document.documentElement.clientWidth;
    // 设置拖拽的位置及拖拽的边缘位置
    this.container.style.left = (offsetX + width) > clientWidth ? `${clientWidth - width}px` : `${offsetX}px`;
    this.container.style.top = (offsetY - height) < 0 ? `${height}px` : `${offsetY}px`;
  }

  /**
   * 获取鼠标点击位置相对图片中心的角度
   */
  getImgPointAngle = (clientX, clientY) => {
    const cStyle = window.getComputedStyle(this.container);
    const style = window.getComputedStyle(this.img);
    const offsetX = (parseInt(style.left, 10) + parseInt(cStyle.left, 10)) -
      (parseInt(cStyle.width, 10) / 2);
    const offsetY = (parseInt(style.top, 10) + parseInt(cStyle.top, 10)) -
      (parseInt(cStyle.height, 10) / 2);
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10);
    const centerX = offsetX + (width / 2);
    const centerY = offsetY + (height / 2);
    const atan = Math.atan2(clientY - centerY, clientX - centerX);
    return (atan * 180) / Math.PI;
  }

  render() {
    const { title } = this.props;
    return (<article
      className={styles['draggable-panel']}
      ref={(node) => { this.container = node; }}
    >
      <header
        className={styles['panel-title']}
        onMouseDown={this.onMouseDownHandler}
        onMouseUp={this.onMouseUpHandler}
        onMouseMove={this.onMouseMoveHandler}
        onMouseLeave={this.onMouseUpHandler}
        onMouseOut={this.onMouseUpHandler}
      >
        {typeof title === 'string' ? <h3>{title}</h3> : title}
        <Icon type="close" onClick={this.onCloseHandler} className={styles.close} />
      </header>
      <section
        className={styles['panel-content']}
        style={{
          maxWidth: this.state.maxWidth,
          maxHeight: this.state.maxHeight,
        }}
      >
        <Spin spinning={this.state.loading}>
          <img
            ref={(node) => { this.img = node; }}
            src={this.state.srcSet[this.state.current]}
            alt="图片详情"
            onMouseDown={this.onStartRotateHandler}
            onMouseUp={this.onStopRotateHandler}
            onMouseLeave={this.onStopRotateHandler}
            onMouseOut={this.onStopRotateHandler}
            onMouseMove={this.onRotateHandler}
            onWheel={this.onWheelHandler}
            onLoad={this.onImgLoadedHandler}
            style={{ width: '400px' }}
          />
          <div
            onMouseDown={this.onStartDragHandler}
            onMouseUp={this.onStopDragHandler}
            onMouseLeave={this.onStopDragHandler}
            onMouseOut={this.onStopDragHandler}
            onMouseMove={this.onDragHandler}
            onWheel={this.onWheelHandler}
            ref={(node) => { this.dragDiv = node; }}
            style={{ position: 'absolute', border: '1px dashed #CCC', cursor: 'move' }}
          />
        </Spin>
        <div className={styles['btn-group']}>
          <Icon type="arrow-left" onClick={this.onChangeImg.bind(this, -1)} />
          <Icon type="reload" className={styles['rotate-left']} onClick={this.onImgRotateHandler.bind(this, -90)} />
          <Icon type="reload" onClick={this.onImgRotateHandler.bind(this, 90)} />
          <Icon type="arrow-right" onClick={this.onChangeImg.bind(this, 1)} />
        </div>
      </section>
    </article>);
  }
}
