import React, { Component } from 'react';
import Management from '../components/User/Management/Management';
import Store from '../components/User/Store';
import Role from '../components/User/Role/Role';
import Ledger from '../components/User/Ledger';


// 防止不同合同需要不同的页面，暂时先根据路由都跳入同一个page
export default class User extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const mapping = {
      '/user/management': <Management {...this.props}/>,
      '/user/store': <Store {...this.props}/>,
      '/user/role': <Role {...this.props}/>,
      '/user/ledger': <Ledger {...this.props}/>,
    };

    return mapping[pathname] || <span>error url</span>;
  }
}
