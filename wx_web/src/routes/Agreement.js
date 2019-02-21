import React from 'react';
import Credit from '../components/Agreement/Credit';
import PersonalCredit from '../components/Agreement/PersonalCredit';
import getRoute from '../utils/routeutil';

export default function AccountRoute({ location }) {
  const { pathname } = location;
  const ROUTES = [
    { path: '/agreement/credit', title: '征信查询授权书', getComponent: () => <Credit /> },
    { path: '/agreement/personalcredit', title: '征信查询授权书', getComponent: () => <PersonalCredit /> },
  ];

  return getRoute(ROUTES, pathname);
}
