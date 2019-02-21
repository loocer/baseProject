import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Button } from 'antd-mobile';
import styles from './Protocol.less';

export default connect()(({ dispatch }) => {
  function goBack() {
    dispatch(routerRedux.goBack());
  }

  return (<DocumentTitle title="用户授权协议">
    <div className={styles.container}>
      <h3 className={styles.title}>授权书</h3>
      <h4>重要提示：</h4>
      <section>
        <strong>
        为了保障您的合法权益，您应当阅读并遵守本授权书，请您务必审慎阅读、充分理解本授权书的条款内容，
        特别是免除或限制元宝亿家互联网信息服务（北京）有限公司（以下称为“元宝e家”）、元宝e家合作第三方的责任，
        或者限制您责任的条款，其中免除或者减轻责任条款将以加粗形式提示您注意。
        </strong>
      </section>
      <section>
        <strong>
        除非您已阅读并接受本授权书的所有条款，否则您无权使用元宝e家及其合作的第三方所提供的服务。
        您的使用、申请借款等行为即视为您已阅读并同意本授权书条款的约束。
        </strong>
      </section>
      <p>元宝亿家互联网信息服务（北京）有限公司：</p>
      <section>
        一、本人同意并不可撤销地授权：
        <strong>元宝e家及其合作的第三方金融机构、网贷平台等（统称为“贷款服务机构”）按照国家规定采集符合法律
        规定的本人个人信息及包括信贷信息在内的信用信息（包括本人在贷款服务机构处办理业务时产生的逾期等不良信息），
        并可以向中国人民银行金融信用信息基础数据库、其他依法设立的征信机构提供以上信息。
          <Link to="/agreement/credit" className={styles.end}>
          《征信查询授权书》
          </Link>
          <Link to="/agreement/personalcredit" className={styles.end}>
            《个人征信授权书》
          </Link>
        </strong>
      </section>
      <section>
        二、本人同意并不可撤销地授权：
        <strong>贷款服务机构可以根据有关规定，通过中国人民银行金融信用信息基础数据库、其他依法设立的征信机构、资信评估机构、
        公安部公民身份信息数据库等查询、打印、保存符合法律法规规定的本人个人信息和包括信贷信息在内的信用信息。
        </strong>用途如下：审核本人借款申请、处理贷后管理事务、处理本人征信异议、依法或根据有权部门要求、其他业务。
      </section>
      <section>
        三、本人同意并不可撤销地授权：
        <strong>在本人申请借款时，元宝e家有权将本人相关信息推送给提供贷款的金融机构或提供借贷居间服务的第三方网贷平台等贷款服务机构，
        同意元宝e家或其他贷款服务机构代本人在其他贷款服务机构如第三方网贷平台办理实名注册、开户、生成电子签名等事宜，
        以便为本人提供本次贷款发放、借贷居间撮合等服务。
        </strong>
      </section>
      <section>
        四、本人同意并不可撤销地授权：
        <strong>贷款服务机构在本人的借款申请经贷款服务机构审核通过当时或之后，使用本人的电子签名等代本人签署借款协议及其他与本人借款相关的全部文件。
        本人确认因此签署的借款协议及其他文件等合法有效，并对本人具有约束力。</strong>
      </section>
      <section>
        <strong>
        本人同意在元宝亿家平台电子文档中使用电子签名，本签名完全符合《中华人民共和国电子签名法》，本人的电子签名和线下的签名具有同等的法律效力。本人勾选成功即视为本人对此表示认可并对此事知晓。
        </strong>
      </section>
      <p>授权人声明：</p>
      <section>
        <strong>
        本授权书为本人向元宝e家做出的单方承诺，效力具有独立性，不受借款协议等相关文件效力的影响，并且以上授权在本人借款业务全部终结前持续有效。
        </strong>
      </section>
      <section>
        <strong>
        如若本人与元宝e家、其他贷款服务机构产生任何纠纷或争议，首先应友好协商解决；协商不成的，本人同意将纠纷提交本授权书签订地即北京市东城区有管辖权的人民法院管辖。
        本授权书的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律。
        </strong>
      </section>
      <section>
        <strong>
        本人已知悉授权书所有内容（尤其是加粗字体内容）的意义及由此产生的法律效力，自愿作出上述授权，本授权是本人的真实意思表示，本人同意承担由此带来的一切法律后果。
        </strong>
      </section>
      <div className={styles.footer}>特此授权！</div>
      <p />
      <Button type="primary" onClick={goBack}>返回</Button>
      <p />
    </div>
  </DocumentTitle>);
});
