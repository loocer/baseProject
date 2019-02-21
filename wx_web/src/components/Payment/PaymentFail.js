import React from 'react';
import Icon from '../common/Icon';
import IconFailureSVG from '../../assets/fonts/failure.svg';
import IconProcessingSVG from '../../assets/fonts/processing.svg';

import style from './Result.less';

export default (props) => {
  const { code } = props;
  return (<div className={style['payment-tips']}>
    {code === 'processing' ?
      <div>
        <Icon type={IconProcessingSVG} size="lg" />
        <h4>处理中</h4>
        <p>系统确认还款成功后，会通过短信通知并更新还款状态。</p>
      </div>
      : <div>
        <Icon type={IconFailureSVG} size="lg" />
        <h4>支付失败</h4>
        <p>如需继续还款，请重新进行操作！</p>
      </div>
    }
  </div>);
};
