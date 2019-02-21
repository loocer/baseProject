import React, { PureComponent } from 'react';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import { PAGE_PREFIX } from '../../constants';
import Checkbox from '../common/Checkbox';
import Loading from '../common/Loading';
import styles from './Reminder.less';
@connect(state => ({
  loading: state.loading.models.channel,
}))
export default class Reminder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch({ type: 'channel/getHSResult', payload: id }).then((result) => {
      if (result === '1') {
        dispatch(routerRedux.replace(`/channel/${btoa(id)}/auth/success`));
      }
    });
  }
  sunClick = (type) => {
    const { dispatch, id } = this.props;
    const queryType = this.props.data.type;
    const redirect = `${window.location.origin}${PAGE_PREFIX}/channel/${btoa(id)}?type=${queryType}`;
    if (type === 2) {
      const { checked } = this.state;
      if (!checked) return Toast.fail('请勾选！');
    }
    dispatch({ type: 'channel/getHSInsurance', payload: { id, redirect, type } }).then((data) => {
      const { success } = data;
      if (success === 'true') {
        if (type === 2) dispatch(routerRedux.replace(`/channel/${btoa(id)}?type=${queryType}`));
        if (type === 1) window.location.href = data.url;
      }
    });
  }
  checkHandle = () => {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { checked } = this.state;
    const { id } = this.props;
    return (<Loading loading={this.props.loading}>
      <div className={styles.reminderWrap}>
        <h3>确认分期</h3>
        <main>
          <h5>温馨提示</h5>
          <section>
          在您同意办理房租月付分期业务同时，元宝e家将无偿为您提供一份履约险，届时您将收到投保成功通知短信。
          </section>
          <aside>
            <div className={styles.confirmBox}>
              <Checkbox
                checked={checked}
                onClick={this.checkHandle}
              >
              勾选表示您同意
              </Checkbox>
            </div>
            <ul>
              <li>
                <Link to={`/channel/${btoa(id)}/protocol/hs`}>《徽商银行直销银行个人银行结算账户服务协议》</Link>
              </li>
              <li>
                <a onClick={() => (this.sunClick(1))}>《阳光保险个人履约险》</a>
              </li>
            </ul>
          </aside>
        </main>
        <div className={styles.btn}>
          <span onClick={() => (this.sunClick(2))}>同意分期</span>
        </div>
      </div>
    </Loading>);
  }
}
