import React from 'react';
import Icon from '../common/Icon';
import IconSadSVG from '../../assets/fonts/sad.svg';
import styles from './Result.less';

export default () => {
  return (<div className={styles.result}>
    <Icon type={IconSadSVG} size="lg" />
    <h3>授信失败</h3>
    <div className={styles.gray}>很遗憾，您未能通过授信审核！</div>
  </div>);
};
