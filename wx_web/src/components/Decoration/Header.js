import React from 'react';
import { Steps } from 'antd-mobile';
import styles from './Header.less';

const { Step } = Steps;

export default function StepsPage({ current }) {
  return (<header className={styles.header}>
    <Steps size="small" current={current} direction="horizontal">
      <Step title="个人信息" />
      <Step title="个人照片" />
      <Step title="产权证明" />
      <Step title="增信信息" />
    </Steps>
  </header>);
}
