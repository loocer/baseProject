import React from 'react';
import ActiveRepayment from '../components/Payment/ActiveRepayment';
import PaymentInfo from '../components/Payment/PaymentInfo';
import PaymentSuc from '../components/Payment/PaymentSuc';
import PaymentFail from '../components/Payment/PaymentFail';
import PickCard from '../components/Payment/PickCard';
import getRoute from '../utils/routeutil';
import { getQuery } from '../utils/query-util';

export default function PaymentRoute({ location: { pathname, state } }) {
  const query = getQuery();
  const ROUTES = [
    { path: '/payment/:id/bindcard', title: '在线支付', getComponent: ({ id }) => (<PaymentInfo id={atob(id)} />) },
    { path: '/payment/result/success', title: '支付成功', getComponent: () => (<PaymentSuc {...state} />) },
    { path: '/payment/result/fail', title: query.code === 'processing' ? '支付处理中' : '支付失败', getComponent: () => (<PaymentFail {...query} />) },
    { path: '/payment/bank/card/pick', title: '选择银行卡', getComponent: () => (<PickCard {...state} />) },
    { path: '/payment/:id', title: '主动还款', getComponent: ({ id }) => <ActiveRepayment id={atob(id)} /> },
  ];
  return getRoute(ROUTES, pathname);
}
