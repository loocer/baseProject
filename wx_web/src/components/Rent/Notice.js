import React, { PureComponent } from 'react';
import { Button } from 'antd-mobile';
import { connect } from 'dva';
import Loading from '../common/Loading';
import styles from '../../routes/Protocol.less';

@connect(state => ({ loading: state.loading.models.rent }))
export default class Notice extends PureComponent {
  onOkHandler = () => {
    this.props.dispatch({ type: 'rent/generateSignature' }).then(() => {
      localStorage.setItem('$$RENT-NOTICE-POPED', true);
      this.props.onClose();
    });
  }

  render() {
    return (<Loading loading={this.props.loading}>
      <div className={styles.container}>
        <h3 className={styles.title}>告知书</h3>
        <h4>尊敬的客户：</h4>
        <section>
          您好，感谢您对我公司的信任与支持，我公司很荣幸能够为您提供“房租e分期”贷款服务。
          我们提示您认真阅读本告知书，充分理解告知书中的内容。
          <strong>当您点击【接受】时，视为您已知悉告知书内容。</strong>
        </section>
        <section>
          1、<strong>您正在通过我公司元宝e家APP申请“房租e分期”贷款，请保证是您本人亲自操作。</strong>
        </section>
        <section>
          2、您的贷款申请经过审核批准后，您将会获得相应金额的贷款。
        </section>
        <section>
          3、您应当通过元宝e家APP按时进行还款，不得逾期。
          <strong>否则，将会对您的征信产生不良影响。</strong>
        </section>
        <section>
          4、<strong>您确认，您与房屋经纪公司之间发生的任何纠纷均与我公司无关，应当由您与房屋经纪公司自行解决。</strong>
          您保证，不会因与房屋经纪公司之间的任何纠纷而影响正常还款。
        </section>
        <section>
          5、<strong>您确认，当您点击【接受】本告知书时，视为您已知晓您正在办理的是贷款业务。</strong>
        </section>
        <p />
        <Button type="primary" onClick={this.onOkHandler}>确定</Button>
        <p />
      </div>
    </Loading>);
  }
}
