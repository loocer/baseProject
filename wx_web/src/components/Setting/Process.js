import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import Icon from '../common/Icon';
import Age from '../../assets/fonts/process-page1.svg';
import ProcessSvg from '../../assets/fonts/process-page2.svg';
import Process1 from '../../assets/process1.png';
import Process2 from '../../assets/process2.png';
import Process3 from '../../assets/process3.png';
import Process4 from '../../assets/process4.png';
import styles from './Process.less';

export default function Process() {
  return (
    <div className={styles.process}>
      <h3>申请条件</h3>
      <p>租房申请年龄为20-50周岁<div style={{ height: '.1rem' }} />(家装年龄为22-55周岁)的大陆公民无<br />不良个人信用记录</p>
      <WhiteSpace size="xl" />
      <Icon className={styles['process-page1']} type={Age} />
      <h3 className={styles['process-title2']}>申请流程</h3>
      <div className={styles['process-page2']}>
        <Icon type={ProcessSvg} />
      </div>
      <section>
        <p>
          <b>1</b><span>联系商家创建分期订单并生成二维码</span>
        </p>
        <div className="processPic">
          <img src={Process1} alt="" style={{ width: '75%', marginTop: '.4rem' }} />
        </div>
      </section>
      <section>
        <p>
          <b>2</b><span>扫描二维码确认订单并完善个人资料</span>
        </p>
        <div className="processPic" >
          <WhiteSpace size="xs" />
          <img src={Process2} alt="" style={{ width: '80%' }} />
          <WhiteSpace size="lg" />
        </div>
      </section>
      <section>
        <p>
          <b>3</b><span>元宝e家整理资料并递交资方审核</span>
        </p>
        <div className="processPic" >
          <img src={Process3} alt="" style={{ width: '43%' }} />
        </div>
      </section>
      <section>
        <p>
          <b>4</b><span>资方审核通过，受托放款到申请人指定商家</span>
        </p>
        <div className="processPic" >
          <img src={Process4} alt="" style={{ width: '60%', marginRight: '-1rem' }} />
        </div>
      </section>
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
    </div>
  );
}
