import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import Icon from '../common/Icon';
import Logo from '../../assets/fonts/logo-icon@2x.svg';
import Service from '../../assets/fonts/contract-service.svg';
import Rent from '../../assets/contract-rent.png';
import Decoration from '../../assets/contract-decoration.png';
import Character from '../../assets/fonts/contract-character.svg';
import Page1 from '../../assets/fonts/contract-page1.svg';
import Page2 from '../../assets/fonts/contract-page2.svg';
import Page3 from '../../assets/fonts/contract-page3.svg';
import Page4 from '../../assets/fonts/contract-page4.svg';
import styles from './Contact.less';

export default function Contract() {
  return (<div className={styles.contract}>
    <Icon className={styles.logo} type={Logo} />
    <section className={styles.page1}>
      <p>元宝e家是一家着力打造服务于“家庭消费”的消费金融平台。平台自主研发具有
      双轨模式的人工智能系统——“松针”,采用智能化大数据风控系统,建立信用改变生活的
      信用体系，降低普通人的融资成本，让更多人享受品质生活。
      </p>
      <p>元宝e家秉承“畅享分期e生活”的理念，致力于将资金引入实体企业，构建更安
      全的金融体系，终坚持做一个有社会责任感的企业，提升人民的幸福感。
      </p>
      <p>元宝e家为满足大众需求，不断开发多样化消费场景，目前已推出家装e分期、房租e分期、旅游e分期、
      医美e分期四大新型产品。
      </p>
    </section>
    <Icon className={styles['contract-pic']} type={Service} />
    <WhiteSpace size="xs" />
    <section className={styles.page1}>
      <p>元宝e家目前的主推“家装e分期”和“房租e分期”两大消费分期产品，服务覆盖北京、天津、廊坊等大中城市。</p>
    </section>
    <WhiteSpace />
    <img className={styles['contract-ybejia']} src={Rent} alt="房租e分期" />
    <section className={styles.page2}>
      <p>房租e分期</p>
      <p>想住就住，月付房租</p>
    </section>
    <WhiteSpace size="xl" />
    <WhiteSpace size="xl" />
    <img className={styles['contract-ybejia']} src={Decoration} alt="家装e分期" />
    <section className={styles.page2}>
      <p>家装e分期</p>
      <p>品质装修，费用不愁</p>
    </section>
    <WhiteSpace />
    <WhiteSpace size="xl" />
    <Icon className={styles['contract-pic']} type={Character} />
    <WhiteSpace size="xl" />
    <WhiteSpace size="xl" />
    <section className={styles.page3}>
      <div className={styles.list}>
        <Icon className="contract-page contract-page1" type={Page1} />
        <p>零担保、零抵押</p>
      </div>
      <div className={styles.list}>
        <Icon className="contract-page contract-page2" type={Page2} />
        <p>申请简单，轻松提交</p>
      </div>
      <div className={styles.list}>
        <Icon className="contract-page contract-page1" type={Page3} />
        <p> 快速放开<br />24小时完成放款</p>
      </div>
      <div className={styles.list}>
        <Icon className="contract-page contract-page2" type={Page4} />
        <p> 使用安全<br />无需担心隐私泄露</p>
      </div>
    </section>
    <footer>
      <p>联系电话  400-811-8536</p>
      <p>Copyright © 2017</p>
      <p>元宝亿家互联网信息服务(北京)有限公司</p>
    </footer>
  </div>);
}
