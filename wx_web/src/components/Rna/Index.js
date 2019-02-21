import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

@connect(state => ({
  user: state.global.user,
}))
export default class Index extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'global/getUserInfo' }).then(() => {
      const { certificationPasswd } = this.props.user;
      dispatch(routerRedux.replace(certificationPasswd ? '/rna/detail' : '/rna/id'));
    });
  }

  render() {
    return (<div />);
  }
}
