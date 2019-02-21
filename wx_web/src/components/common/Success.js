import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import ImgSuccess from '../../assets/success_icon@xhdpi.png';
import ImgSuccess2X from '../../assets/success_icon@2x.png';
import ImgSuccess3X from '../../assets/success_icon@3x.png';
import { close } from '../../utils/pageutil';
import styles from './Success.less';

export default class Success extends Component {
  componentDidMount() {
    setTimeout(close, 2000);
  }

  render() {
    return (<div className={styles.normal}>
      <div className={styles.close} onClick={close}>×</div>
      <img
        src={ImgSuccess}
        alt="已提交审核"
        srcSet={`${ImgSuccess2X} 2x,${ImgSuccess3X} 3x`}
      />
      <h4>合同已提交审核</h4>
      <section>
        我们将在1个工作日内为您完成<br />
        审核，请您耐心等待!
      </section>
      <Button type="primary" onClick={close}>确定</Button>
    </div>);
  }
}
