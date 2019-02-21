import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { stringify, parse } from 'query-string';
import DocumentTitle from 'react-document-title';
import LoginPage from '../components/Global/Login';
import Loading from '../components/common/Loading';
import { USER_KEY, TOKEN_KEY } from '../constants';
import { getPattern, matchURL } from '../utils/routeutil';
import { getAuthention, deducePlatform } from '../utils/platform';

const WHITE_LIST = [
  getPattern('/login'),
  getPattern('/contract'),
  getPattern('/protocol'),
  getPattern('/setting/contact'),
  getPattern('/setting/process'),
  getPattern('/setting/standard'),
  getPattern('/setting/questions'),
  getPattern('/account/password/reset'),
  getPattern('/setting/calculator'),
  getPattern('/huodong/jzmx'),
  getPattern('/huodong/events'),
  getPattern('/huodong/sx'),
  getPattern('/huodong/sx/use'),
  getPattern('/huodong/rm'),
  getPattern('/decoration/:id/customer/images'),
  getPattern('/huodong/11/jzmx'),
  getPattern('/trip/desc/:area'),
];

@connect((state) => {
  return Object.assign({ loading: state.loading.models.global }, state.global);
})
export default class LayoutPage extends Component {
  state = {};

  componentWillMount() {
    if (deducePlatform()) {
      this.matchClient();
    } else {
      this.matchWXLogin();
    }
    this.matchRedirect();
  }

  componentWillReceiveProps({
    isLogined, loading, user, token,
  }) {
    if (this.state.login && !loading) {
      this.setState({ loading, login: false });
    } else {
      this.setState({ loading });
    }

    if (isLogined) {
      if (localStorage && localStorage.setItem) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
      }
    }
  }

  matchClient = () => {
    const { dispatch } = this.props;
    getAuthention(({ userId, token }) => {
      if (!userId || !token) return;
      dispatch({
        type: 'global/loginSuccess',
        payload: {
          user: { id: userId },
          token,
        },
      });
      dispatch({ type: 'trace/trace', payload: { loanId: '-', pathname: '/global/app/login', search: `?token=${token}&id=${userId}` } });
    });
  }

  matchWXLogin = () => {
    const matches = /code=([^&]+)/.exec(window.location.search);

    if (matches) {
      this.setState({ login: true });
      this.props.dispatch({ type: 'global/login', payload: { wxAuthCode: matches[1] } });
    } else if (localStorage && localStorage.getItem &&
      localStorage.getItem(TOKEN_KEY) && localStorage.getItem(USER_KEY)) {
      this.props.dispatch({
        type: 'global/loginSuccess',
        payload: {
          user: JSON.parse(localStorage.getItem(USER_KEY)),
          token: localStorage.getItem(TOKEN_KEY),
        },
      });
    }
  }

  matchRedirect = () => {
    const search = parse(window.location.search.substr(1).replace(/h5faceId=/, '&h5faceId=').replace('?', '&'));
    const { dispatch } = this.props;

    if (search.token && search.userId) {
      dispatch({ type: 'global/loginSuccess', payload: { user: { id: atob(search.userId) }, token: search.token } });
    }

    if (search.route) {
      // 兼容老接口的route参数路由跳转
      const { route, ...query } = search;
      dispatch(routerRedux.push({ pathname: route, search: stringify(query) }));
    } else {
      // 兼容hash history
      const match = /#([^?&]*)(.*)/.exec(window.location.hash);
      if (match && match[1] && /^\//.test(match[1])) {
        dispatch(routerRedux.replace({
          pathname: match[1],
          search: match[2] || '',
        }));
      }
    }
  }

  renderChildren = () => {
    const { location: { pathname } } = this.props;
    let inWhiteList = false;

    WHITE_LIST.forEach((pattern) => {
      if (matchURL(pattern, pathname)) inWhiteList = true;
    });

    if (this.props.isLogined || inWhiteList) {
      return this.props.children;
    }

    if (this.state.login || deducePlatform()) return <div />;

    return <DocumentTitle title="元宝e分期-登录"><LoginPage /></DocumentTitle>;
  }

  render() {
    const changingRoute = /route=/.exec(window.location.search);

    return (<div style={{ width: '100%', height: '100%' }}>
      {this.state.login || changingRoute ?
        <Loading loading={this.state.loading} /> : this.renderChildren()}
    </div>);
  }
}
