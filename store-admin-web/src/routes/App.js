import React, { Component } from 'react';
import { message, Spin } from 'antd';
import { connect } from 'dva';
import LoginPage from '../components/Global/Login';
import Layout from '../components/Global/MainLayout';
import Index from './IndexPage';

class App extends Component {
  constructor(props) {
    super(props);
    const { global } = props;
    this.state = {global};
  }

  componentWillMount() {
    const  isLogined  = this.state.global.isLogined;
    this.loging = true;
    if(isLogined == 'false'){
        this.props.dispatch({ type: 'global/login' });
    }
  }

  componentWillReceiveProps({ global }) {
    const { menus, role, salesman, path, exception, isLogined, loading } = global;

    if (exception && !this.loging) {
      let msg = (exception.message && exception.message.name) || exception.retMsg;
      msg = msg || '系统异常，请联系技术人员';
      message.error(msg);
    }

    if (this.loging && (exception || !loading)) this.loging = false;

    this.setState({ menus, role, salesman, path, isLogined, loading });
  }

  render() {
    const { path, role, salesman, menus } = this.state;

    if (!this.state.isLogined) return <LoginPage />;

    return (
      <Layout location={location} path={path} role={role} salesman={salesman} menus={menus}>
        { this.props.children || <Index /> }
      </Layout>
    )
  }
}

export default connect(state => ({
  global: state.global,
  loading: state.loading.models.global,
}))(App);

