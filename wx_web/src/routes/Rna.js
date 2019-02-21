
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { parse } from 'query-string';
import Index from '../components/Rna/Index';
import Info from '../components/Rna/Info';
import IdCard from '../components/Rna/IdCard';
import CognizeFace from '../components/Rna/CognizeFace';
import getRoute from '../utils/routeutil';

@connect()
export default class Rna extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: 'global/getQiNiuToken' });
  }

  render() {
    const { location: { pathname, search } } = this.props;
    const query = parse(search.substr(1).replace(/\?/ig, '&'));
    const ROUTES = [
      { path: '/rna', title: '实名信息', getComponent: () => <Index redirect={query.redirect} /> },
      { path: '/rna/detail', title: '实名信息', component: Info },
      { path: '/rna/id', title: '实名认证', getComponent: () => <IdCard message={query.message} redirect={query.redirect} /> },
      {
        path: '/rna/face',
        title: '实名认证',
        getComponent: () => (<CognizeFace
          realName={query.realName}
          idCard={query.idCard}
          idCardFrontType={query.idCardFrontType}
          idCardBackType={query.idCardBackType}
          success={query.success === 'true'}
          message={query.success === 'false' && (query.errorMsg || '认证失败，人脸识别时请严格按照提示操作')}
          redirect={query.redirect}
        />),
      },
    ];
    return getRoute(ROUTES, pathname);
  }
}
