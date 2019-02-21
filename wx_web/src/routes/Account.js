import React from 'react';
import { parse } from 'query-string';
import ResetPasswordPage from '../components/Account/ResetPassword';
import BankCardPage from '../components/Account/BankCard';
import BindCardPage from '../components/Account/BindCard';
import getRoute from '../utils/routeutil';

export default function AccountRoute({ location: { search, pathname } }) {
  const query = parse(search);
  const ROUTES = [
    { path: '/account/password/reset', title: '重置密码', getComponent: () => <ResetPasswordPage /> },
    { path: '/account/bank/card', title: '银行卡绑卡', getComponent: () => <BankCardPage query={query} /> },
    { path: '/account/bank/addcard', title: '添加银行卡', getComponent: () => <BindCardPage src={query.src} redirect={query.redirect} query={query} /> },
    { path: '/account/bank/card/:id/verify', title: '验证银行卡', getComponent: ({ id }) => <BindCardPage readonly src={query.src} redirect={query.redirect} id={atob(id)} query={query} /> },
  ];

  return getRoute(ROUTES, pathname);
}
