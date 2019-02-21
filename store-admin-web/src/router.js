import React from 'react';
import { Router } from 'dva/router';
import Root from './routes/App';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    cached[model.namespace] = 1;
    app.model(model);
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: Root,
      breadcrumbName: '首页',
      childRoutes: [
        {
          path: '/user/**',
          breadcrumbName: '用户管理',
          name: 'UsersPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/User'));
            });
          },
        }, {
          path: '/Order',
          name: 'OrderPage',
          breadcrumbName: '订单管理',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/order'));
              cb(null, require('./routes/Order'));
            });
          },
        }, {
          path: '/finance/**',
          name: 'FinancePage',
          breadcrumbName: '财务结算',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/finance'));
              cb(null, require('./routes/Finance'));
            });
          },
        }, {
          path: '/house',
          name: 'HousePage',
          breadcrumbName: '房源管理',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/house'));
              cb(null, require('./routes/House'));
            });
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
