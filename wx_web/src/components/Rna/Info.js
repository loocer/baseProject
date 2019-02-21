import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, WhiteSpace } from 'antd-mobile';
import Icon from '../common/Icon';
import IconPassed from '../../assets/fonts/passed_icon.svg';
import { QINIU_BASE_PATH } from '../../constants';
import Loading from '../common/Loading';
import styles from './Info.less';

@connect(state => ({
  loading: state.loading.models.global,
  certification: state.global.user || {},
}))
export default class Index extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: 'global/getUserInfo' });
  }

  getIdCardNo = (str) => {
    return str && str.replace(/^(.{5})(.*)(.{4})$/, (...args) => `${args[1]}${new Array(args[2].length).join('*')}${args[3]}`);
  }

  render() {
    const { certification } = this.props;

    return (<section className={styles['step-info']}>
      <Loading loading={this.props.loading}>
        <WhiteSpace size="xs" />
        <List>
          <List.Item extra={certification.realName}>姓名</List.Item>
          <List.Item extra={certification.idCard}>身份证号</List.Item>
          <section className={styles.images}>
            <figure>
              {certification.idCardFrontImg ? <img src={`${QINIU_BASE_PATH}/${certification.idCardFrontImg}`} alt="" /> : null}
              <figcaption>身份证正面</figcaption>
            </figure>
            <figure>
              {certification.idCardBackImg ? <img src={`${QINIU_BASE_PATH}/${certification.idCardBackImg}`} alt="" /> : null}
              <figcaption>身份证反面</figcaption>
            </figure>
          </section>
          <Icon type={IconPassed} />
        </List>
        <footer>
          实名有问题？<Link to="/rna/id">重新认证</Link>
        </footer>
      </Loading>
    </section>);
  }
}
