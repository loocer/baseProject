import React from 'react';
import DocumentTitle from 'react-document-title';
import HS from '../../assets/hs.png';
import styles from './Agreement.less';

export default (() => {
  return (<DocumentTitle title="用户授权协议">
    <div className={styles.container}>
      <div><img alt="" src={HS} /></div>
      <h3 className={styles.title}>中国人民银行个人信用信息基础数据库查询授权书</h3>
      <section>
        <p>    本人授权贵行在办理以下涉及到本人的业务时，可以向中国人民银行个人信用信息基础数据库查询本人信用报告，范围包括：</p>
        <p>□审核贷款申请的，以及进行贷后风险管理的；</p>
        <p>□审核贷记卡、准贷记卡申请的；</p>
        <p>□审查本人作为担保人的；</p>
        <p>□审查本人异议申请和投诉的；</p>
        <p>□审核特约商户实名审查的；</p>
        <p>□受理法人或其他组织的贷款申请或其作为担保人，以及进行贷后风险管理， 需要查询其法定代表人及其配偶、实际控制人、高管和出资人等信用状况的。</p>
        <p>同时授权贵行将本人的个人基本信息、信贷交易信息等相关信息向中国人民银行个人信用信息基础数据库报送，授权有效期至本业务全部终结。</p>
        <p>若信贷业务未获批准，本人的授权书、个人信用报告等资料也不撤回。特此授权。</p>
        <p>授权人（签字）：</p>
        <p>身份证件类型：</p>
        <p>证件号码：</p>
      </section>
      <div className={styles.care}>
        <strong>（为保护您的合法权益，请在以上空白处请填写完整，授权查询范围请在以上“□”内勾选）</strong>
        <p> 注：1、此授权书应由与贷款相关的自然人独立填写，包括借款人及其配偶
          担保人、共同还款人等其他关联人， 贷款涉及到机构的法定代表人及其配偶、实际控制人、主要自然人股东等；</p>
        <p> 2、需多名自然人征信查询授权时，可依此格式另行附页； </p>
        <p> 3、“关联人”为非自然人机构时，应独立签署《中国人民银行企业信用信息基础数据库查询授权书》，授权书格式此处略。 </p>
      </div>
    </div>
  </DocumentTitle>);
});
