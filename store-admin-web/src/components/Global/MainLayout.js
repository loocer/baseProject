import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './MainLayout.less';
import Header from './Header';
import Login from './Login';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    const { role, path } = props;
    this.state = { isLogined: true, role, path };
  }

  componentWillReceiveProps({ role = {}, path }) {
    this.setState({ role, path });
  }

  onLoginHandler = () => {
    this.setState({ isLogined: true });
  }

  renderLoginPage =() => {
    return <Login onOk={this.onLoginHandler} />;
  }

  renderMainLayout() {
    const { children, location } = this.props;
    return (<div className={styles.page}>
      <Header className={styles.header} role={this.state.role} location={location} path={this.state.path}/>
      <div className={styles.content}>
        {children}
      </div>
    </div>);
  }

  render() {
    return this.state.isLogined ? this.renderMainLayout() : this.renderLoginPage();
  }
}

export default connect()(MainLayout);
