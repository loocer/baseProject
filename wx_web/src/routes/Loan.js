import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { parse } from 'query-string';
import RepaymentPage from '../components/Loan/Repayment';
import DetailPage from '../components/Loan/Detail';
import EditAdapter from '../components/Loan/EditAdapter';
import Notice from '../components/Loan/Notice';
import ChangeBankCard from '../components/Loan/ChangeBankCard';
import TimeLine from '../components/Loan/TimeLine';
import getRoute, { matchURL, getPattern, getParams } from '../utils/routeutil';
import { TYPE_URL_MAPPING } from '../constants';

const ROUTE_PATH = '/loan/:id/type/:type';// app填单适配路由

const RoutePage = connect()(({ dispatch, id, type }) => {
  dispatch(routerRedux.replace({
    pathname: `/${TYPE_URL_MAPPING[type]}/${id}`,
  }));

  return <div />;
});

export default function Loan({ location: { pathname, search }, history }) {
  const query = parse(search);
  const ROUTES = [
    { path: '/loan/:id', title: '订单详情', getComponent: ({ id }) => (<DetailPage id={atob(id)} h5Supported={query.h5Supported !== false && query.h5Supported !== 'false'} />) },
    { path: '/loan/:id/timeline', title: '订单详情', getComponent: ({ id }) => (<TimeLine id={atob(id)} />) },
    { path: '/loan/:id/edit', title: '订单修改', getComponent: ({ id }) => (<EditAdapter step={query.step} id={atob(id)} history={history} />) },
    { path: '/loan/:id/repayment', title: '还款计划', getComponent: ({ id }) => (<RepaymentPage id={atob(id)} />) },
    { path: '/loan/:id/bank/card/change', title: '确认银行卡', getComponent: ({ id }) => (<ChangeBankCard id={atob(id)} card={query.id} />) },
    { path: '/loan/repayment/notice', title: '还款须知', component: Notice },
  ];

  if (matchURL(getPattern(ROUTE_PATH), pathname)) {
    const { id, type } = getParams(ROUTE_PATH, pathname);
    return <RoutePage id={id} type={type} />;
  }
  return getRoute(ROUTES, pathname);
}

