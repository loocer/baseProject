import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, Checkbox, Flex, Button, Toast } from 'antd-mobile';
import styles from './Detail.less';

@connect()
export default class HuaDaoProtocol extends Component {
  componentWillMount() {
    const { id } = this.props;
    if (localStorage && localStorage.getItem) {
      this.setState({
        checkboxjkedsx: !!localStorage.getItem(`${btoa(id)}-jkedsx`),
      });
    }
  }

  onAgreeHandler = () => {
    const { id, dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: `/channel/${btoa(id)}/auth/success`,
    }));
  }

  onCancelHandler = () => {
    this.props.dispatch({
      type: 'loan/userCancellation',
      payload: this.props.id,
    });
    Toast.success('取消分期成功');
  }

  onShowProtocolHndler = (type) => {
    const { id, dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: `/loan/${btoa(id)}/protocol/${type}`,
    }));
  }

  render() {
    const agreeBtnEnabled = this.state.checkboxjkedsx;

    return (<div className={styles.detail}>
      <List>
        <List.Item extra={<a style={{ color: '#1B98F4' }} onClick={() => { this.onShowProtocolHndler('jkedsx'); }}>《个人借款额度合同》</a>}>
          <Checkbox checked={this.state.checkboxjkedsx} />
        </List.Item>
      </List>
      <Flex className="btn-groups-loan">
        <Flex.Item><Button inline size="large" onClick={this.onCancelHandler}>取消分期</Button></Flex.Item>
        <Flex.Item><Button type="primary" inline size="large" onClick={this.onAgreeHandler} disabled={!agreeBtnEnabled}>同意分期</Button></Flex.Item>
      </Flex>
    </div>);
  }
}
