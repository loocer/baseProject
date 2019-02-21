import React, { PureComponent } from 'react';
import styles from './EmptyPage.less';

export default class EmptyPage extends PureComponent {
  render() {
    return (<div className={styles.wrap}>
      <div>
        <div className={styles.circle} />
        <div className={styles['line-wrap']}>
          <div className={styles.line} />
          <div className={styles.line} />
        </div>
      </div>
      <div />
    </div>);
  }
}
