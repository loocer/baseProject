import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { WhiteSpace, List, Checkbox } from 'antd-mobile';
import BaseFormContext from '../common/BaseFormContext';
import Loading from '../common/Loading';
import styles from './Auth.less';

@connect(state => ({
  loading: state.loading.models.channel,
}))
@createForm()
export default class HuaDao extends BaseFormContext {
  state = { disabled: true };

  componentWillMount() {
    const { dispatch, id } = this.props;

    dispatch({ type: 'channel/getHSResult', payload: id }).then((result) => {
      if (result === '1') {
        dispatch(routerRedux.replace(`/channel/${btoa(id)}/auth/success`));
      }
    });
  }

  onOkHandler = () => {}

  render() {
    const { id } = this.props;

    return (<Loading loading={this.props.loading}>
      <div className={styles['step-info']}>
        <WhiteSpace size="xl" />
        <List>
          <Checkbox.AgreeItem disabled>
            “聚宝盆”业务服务协议(个人版)
            <Link to={`/channel/${btoa(id)}/protocol/hs`} className={styles.fr}>协议内容</Link>
          </Checkbox.AgreeItem>
        </List>
      </div>
    </Loading>);
  }
}
