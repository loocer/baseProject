import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import EmptyPage from './EmptyPage';
import styles from './Loading.less';

export default class Loading extends PureComponent {
  state = {};

  componentDidMount() {
    this.mounted = true;
  }

  componentWillReceiveProps({ loading }) {
    if (this.state.loading !== loading) {
      this.setState({ loading });

      if (loading) setTimeout(this.onHideHandler, 10000);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onHideHandler = () => {
    if (this.mounted) this.setState({ loading: false });
  }

  render() {
    const {
      style, title = '', children, mask, className,
    } = this.props;

    return (<div style={{ width: '100%', height: '100%', ...style }} className={`${className} ${styles.wrap}`}>
      { this.state.loading ?
        (mask === true ?
          <div className={styles.mask}>
            <ActivityIndicator toast text={title} />
          </div>
          :
          <ActivityIndicator toast text={title} />)
        : null }
      {children || <EmptyPage />}
    </div>);
  }
}
