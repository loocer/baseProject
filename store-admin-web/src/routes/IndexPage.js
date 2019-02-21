import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import WELCOME_IMG from '../assets/welcome.png';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome}>
        <img src={WELCOME_IMG} alt="欢迎使用员工管理系统" width="400" />
        <ul className={styles.list}>
          <li>欢迎使用员工管理系统!</li>
        </ul>
      </div>
    </div>
  );
}

export default connect()(IndexPage);
