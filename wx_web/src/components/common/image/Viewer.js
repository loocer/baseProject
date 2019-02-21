import React, { PureComponent } from 'react';
import { Modal } from 'antd-mobile';
import AlloyFinger from './AlloyFinger';
import styles from './Viewer.less';

export default class Viewer extends PureComponent {
  state = { zoom: 1 };

  onPinchHandler = (event) => {
    const zoom = event.zoom || event.scale;
    this.setState({ zoom });
  }

  render() {
    const width = this.state.zoom * document.body.clientWidth;

    return (<Modal
      visible={this.props.visible}
      maskClosable
      onClose={this.props.onClose}
      className={styles.viewer}
    >
      <AlloyFinger
        onPinch={this.onPinchHandler}
        onClick={(e) => { e.stopPropagation(); }}
      >
        <section className={styles.wrap} onClick={this.props.onClose}>
          <img style={{ width }} src={this.props.src} alt="" />
        </section>
      </AlloyFinger>
    </Modal>);
  }
}
