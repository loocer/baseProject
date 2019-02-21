import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import LayoutPage from './routes/Layout';
import LoginPage from './components/Global/Login';
import IndexPage from './components/Global/Index';
import Loading from './components/common/Loading';

function loadingPage() {
  return <Loading loading title="页面加载中..." />;
}

export default function RouterConfig({ history, app }) {
  const getRoutePage = (component, models) => {
    return dynamic({
      app, LoadingComponent: loadingPage, models, component,
    });
  };

  const Layout = (props) => {
    return (<LayoutPage {...props}>
      <Switch>
        <Route
          path="/account"
          component={getRoutePage(
            () => import('./routes/Account'),
            () => [
              import('./models/account'),
              import('./models/ocr'),
              import('./models/bank'),
              import('./models/face'),
            ],
          )}
        />
        <Route path="/bank" component={getRoutePage(() => import('./routes/Bank'), () => [import('./models/bank')])} />
        <Route
          path="/channel"
          component={getRoutePage(
            () => import('./routes/Channel'),
            () => [import('./models/channel')],
          )}
        />
        <Route path="/clear" component={getRoutePage(() => import('./routes/Clear'))} />
        <Route path="/contract" component={getRoutePage(() => import('./routes/Contract'))} />
        <Route path="/credit" component={getRoutePage(() => import('./routes/Credit'), () => [import('./models/credit')])} />
        <Route
          path="/decoration"
          component={getRoutePage(
            () => import('./routes/Decoration'),
            () => [
              import('./models/decoration'),
              import('./models/face'),
              import('./models/spider'),
            ],
          )}
        />
        <Route
          path="/huodong"
          component={getRoutePage(
            () => import('./routes/Coupons'),
            () => [
              import('./models/coupons'),
              import('./models/credit'),
              import('./models/analysis'),
            ],
          )}
        />
        <Route
          path="/loan"
          component={getRoutePage(
            () => import('./routes/Loan'),
            () => [
              import('./models/payment'),
              import('./models/bank'),
            ],
          )}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="/payment" component={getRoutePage(() => import('./routes/Payment'), () => [import('./models/payment')])} />
        <Route path="/protocol/:id" component={getRoutePage(() => import('./routes/Protocol'))} />
        <Route
          path="/rent"
          component={getRoutePage(
            () => import('./routes/Rent'),
            () => [
              import('./models/rent'),
              import('./models/face'),
              import('./models/spider'),
              import('./models/bank'),
              import('./models/ocr'),
            ],
          )}
        />
        <Route
          path="/rna"
          component={getRoutePage(
            () => import('./routes/Rna'),
            () => [
              import('./models/face'),
              import('./models/ocr'),
              import('./models/rna'),
            ],
          )}
        />
        <Route path="/setting" component={getRoutePage(() => import('./routes/Setting'), () => [import('./models/setting')])} />
        <Route
          path="/trip"
          component={getRoutePage(() => import('./routes/Trip'))}
        />
        <Route
          path="/Agreement"
          component={getRoutePage(() => import('./routes/Agreement'))}
        />
        <Route path="/" component={IndexPage} />
      </Switch>
    </LayoutPage>);
  };

  return (<Router history={history}>
    <Route path="/" component={Layout} />
  </Router>);
}
