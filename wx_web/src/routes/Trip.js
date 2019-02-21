import React from 'react';
import Description from '../components/Trip/Description';
import getRoute from '../utils/routeutil';

export default function AccountRoute({ location: { pathname } }) {
  const ROUTES = [
    { path: '/trip/desc/:area', title: '产品详情', getComponent: ({ area }) => <Description area={area} /> },
  ];

  return getRoute(ROUTES, pathname);
}
