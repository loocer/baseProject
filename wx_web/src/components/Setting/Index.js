import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Button, Toast, WhiteSpace } from 'antd-mobile';
import { close } from '../../utils/pageutil';
import { USER_KEY, TOKEN_KEY } from '../../constants';
import styles from './Index.less';

const { Item } = List;

@connect(state => state.setting)
export default class Index extends Component {
  componentWillReceiveProps() {
    if (this.unbind) {
      Toast.success('解除绑定成功!', 2, close);
      if (localStorage && localStorage.removeItem) {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  }

  onUnbindHandler = () => {
    this.unbind = true;
    this.props.dispatch({ type: 'setting/unbind' });
  }

  render() {
    const btnStyle = {
      margin: 0,
      borderRadius: 0,
      color: '#FF6460',
      padding: '.08rem 0',
      height: 'auto',
    };

    /* eslint-disable */
    return (<div className={styles.index}>
      <WhiteSpace size="lg" />
      <List>
        <Link to="/setting/contact"><Item arrow="horizontal">关于我们</Item></Link>
      </List>
      <WhiteSpace size="lg" />
      <List>
        <Link to="/setting/feedback"><Item arrow="horizontal">问题反馈</Item></Link>
        <Link to="/setting/questions"><Item arrow="horizontal">常见问题</Item></Link>
        <Link to="/setting/standard"><Item arrow="horizontal">分期填写规范</Item></Link>
      </List>
      <WhiteSpace size="lg" />
      <List>
        <Link to="/setting/process"><Item arrow="horizontal">申请流程</Item></Link>
        <Link to="/setting/calculator"><Item arrow="horizontal">计算器</Item></Link>
      </List>
      <WhiteSpace size="lg" />
      <Button style={btnStyle} onClick={this.onUnbindHandler}>解除绑定</Button>
      <WhiteSpace size="lg" />
    </div>);
  }
}
