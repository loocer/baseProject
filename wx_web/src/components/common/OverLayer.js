import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './OverLayer.less';

export default class OverLayer extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    picker: PropTypes.object.isRequired,
    footer: PropTypes.element.isRequired,
  }

  state = {
    visible: false,
  }

  onShowHandler = () => {
    this.setState({ visible: true });
  }

  onHideHandler = () => {
    this.setState({ visible: false });
  }

  render() {
    return (<span>
      <span onClick={this.onShowHandler}>{this.props.picker}</span>
      <div style={{ display: this.state.visible ? 'block' : 'none' }} className={styles['over-layer']}>
        <div className={styles.box}>
          <section className={styles.header}>
            <h3>{this.props.title}</h3>
            <h4>{this.props.subTitle}</h4>
            <span className={styles['btn-close']} onClick={this.onHideHandler}>×</span>
          </section>
          <section className={styles.content}>
            {this.props.children}
          </section>
          <section className={styles.footer}>
            {this.props.footer}
          </section>
        </div>
      </div>
    </span>);
  }
}
