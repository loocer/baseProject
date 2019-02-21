import React from 'react';
import { parse } from 'query-string';
import PickCard from '../components/Bank/PickCard';
import getRoute from '../utils/routeutil';

export default function AccountRoute({ location }) {
  const { pathname, search } = location;
  const query = parse(search);
  const ROUTES = [
    { path: '/bank/card/pick', title: '选择银行卡', getComponent: () => <PickCard id={query.id} redirect={query.redirect} /> },
  ];

  return getRoute(ROUTES, pathname);
}
