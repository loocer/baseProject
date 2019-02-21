import React, { Component } from 'react';
import AwardPage from '../components/Credit/Award';
import AwardSuccessPage from '../components/Credit/AwardSuccess';
import AwardFailPage from '../components/Credit/AwardFail';
import IncreasePage from '../components/Credit/Increase';
import IncreaseSuccessPage from '../components/Credit/IncreaseSuccess';
import getRoute from '../utils/routeutil';
import { getQuery } from '../utils/query-util';

export default class Credit extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const query = getQuery();
    const ROUTES = [
      { path: '/credit/award', title: '授信额度审批', component: AwardPage },
      { path: '/credit/award/success', title: '授信成功', getComponent: () => <AwardSuccessPage {...query} /> },
      { path: '/credit/award/fail', title: '授信失败', component: AwardFailPage },
      { path: '/credit/increase', title: '申请更高额度', component: IncreasePage },
      { path: '/credit/increase/success', title: '提额成功', getComponent: () => <IncreaseSuccessPage {...query} /> },
    ];

    return getRoute(ROUTES, pathname);
  }
}
