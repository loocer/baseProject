import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import Loading from '../common/Loading';
import { close } from '../../utils/pageutil';
import styles from './AuthSuccess.less';

@connect(state => ({ loading: state.loading.models.loan }))
export default class AuthSuccess extends Component {
  state = {}

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    this.setState({ loading });
  }

  render() {
    return (<div className={styles.info}>
      {
        this.state.loading ? <Loading loading={this.state.loading} /> : <div>
          <div className={styles.text}>
            您已鉴权成功<br />
            请您耐心等待放款
          </div>
          <footer><Button type="primary" onClick={close}>确定</Button></footer>
        </div>
      }
    </div>);
  }
}
