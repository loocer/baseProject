import React from 'react';
import Icon from '../common/Icon';
import { formatMoney } from '../../utils/stringutil';
import IconSmileSVG from '../../assets/fonts/smile.svg';
import styles from './Result.less';

export default ({ limit, increase }) => {
  return (<div className={styles.result}>
    <Icon type={IconSmileSVG} size="lg" />
    <h3>恭喜您提额成功！</h3>
    <div className={styles.gray}>本次提额{formatMoney(+increase, 0)}元，您现在的授信</div>
    <div className={styles.gray}>额度提升至{formatMoney((+increase) + (+limit), 0)}元</div>
  </div>);
};
