import React from 'react';
import { parse } from 'query-string';
import Protocol from '../components/Channel/Protocol';
import ChannelPage from '../components/Channel/Index';
import SmileAuth from '../components/Channel/SmileAuth';
import HuaDaoAuth from '../components/Channel/HuaDao';
import HCJingAuth from '../components/Channel/HCJing';
import JzyAuth from '../components/Channel/JiaZhaoYe';
import ZlAuth from '../components/Channel/ZhaoLian';
import BRAuth from '../components/Channel/BaiRong';
import HSProtocol from '../components/Channel/HSProtocol';
import AuthSuccessPage from '../components/Channel/AuthSuccess';
import Reminder from '../components/Reminder/Reminder';
import getRoute, { getPattern, matchURL, getParams } from '../utils/routeutil';

export default function AccountRoute({ location: { pathname, search } }) {
  const query = parse(search);
  const ROUTES = [
    { path: '/channel/:id', title: '用户鉴权', getComponent: ({ id }) => <ChannelPage id={atob(id)} type={query.type} /> },
    { path: '/channel/:id/smile', title: '用户鉴权', getComponent: ({ id }) => <SmileAuth id={atob(id)} card={query.id} /> },
    { path: '/channel/:id/huadao', title: '用户鉴权', getComponent: ({ id }) => (<HuaDaoAuth id={atob(id)} card={query.id} />) },
    { path: '/channel/:id/hcjing', title: '用户鉴权', getComponent: ({ id }) => (<HCJingAuth id={atob(id)} card={query.id} />) },
    { path: '/channel/:id/hs', title: '用户鉴权', getComponent: ({ id }) => (<Reminder id={atob(id)} card={query.id} data={query} />) },
    { path: '/channel/:id/jzy', title: '用户鉴权', getComponent: ({ id }) => (<JzyAuth id={atob(id)} card={query.id} />) },
    { path: '/channel/:id/br', title: '用户鉴权', getComponent: ({ id }) => (<BRAuth id={atob(id)} card={query.id} />) },
    { path: '/channel/:id/zl', title: '用户鉴权', getComponent: ({ id }) => (<ZlAuth id={atob(id)} card={query.id} />) },
    { path: '/channel/:id/protocol/hs', title: '用户鉴权', getComponent: ({ id }) => (<HSProtocol id={atob(id)} />) },
    { path: '/channel/auth/success', title: '鉴权成功', component: AuthSuccessPage },
    { path: '/channel/:id/auth/success', title: '鉴权成功', component: AuthSuccessPage },
  ];
  const path = /([^?]*)/.exec(pathname)[0];

  if (matchURL(getPattern('/channel/:id'), path)) {
    const { type } = parse(search);
    const params = getParams('/channel/:id', path);
    const id = atob(params.id);

    switch (type) {
      case 'HUADAO':
        return <HuaDaoAuth id={id} card={query.id} />;
      case 'HUICAIJING':
        return <HCJingAuth id={id} card={query.id} />;
      case 'XIAOLIAN':
        return <SmileAuth id={id} card={query.id} />;
      case 'JIAZHAOYE':
        return <JzyAuth id={id} card={query.id} />;
      case 'BAIRONG':
        return <BRAuth id={id} card={query.id} />;
      case 'ZHAOLIAN':
        return <Protocol id={id} type="zl" card={query.id} />;
      case 'HUISHANG':
        return <Reminder id={id} card={query.id} data={query} />;
      default:
        return <div>数据异常</div>;
    }
  }

  return getRoute(ROUTES, pathname);
}
