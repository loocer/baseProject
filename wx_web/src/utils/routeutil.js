import React from 'react';
import DocumentTitle from 'react-document-title';
import { getParams as utilGetParams, compilePattern } from '../../lib/PatternUtils';
import PageNotFoundPage from '../components/common/PageNotFound';

const REG = /([^?]*)/;
// 添加路由的前缀处理
export default function getRoute(routes, pathname) {
  const path = REG.exec(pathname)[0];
  const route = routes.find((item) => {
    return matchURL(getPattern(item.path), path);
  });

  if (!route) return React.createElement(PageNotFoundPage);

  const component = route.getComponent ?
    route.getComponent(getParams(`${route.path}`, path)) : React.createElement(route.component);

  return route.title ? <DocumentTitle title={route.title}>{component}</DocumentTitle> : component;
}

export function getPattern(url) {
  return compilePattern(`${url}`).regexpSource;
}

export function getParams(pattern, pathname) {
  return utilGetParams(`${pattern}`, pathname);
}

export function matchURL(pattern, url) {
  return new RegExp(`^${pattern}$`).test(url);
}

export function getSearch(search = window.location.search.substr(1)) {
  const pairs = search.split(/[&?]/);
  const searchObj = {};

  pairs.forEach((pair) => {
    const arr = pair.split('=');
    if (arr && arr.length > 1) {
      searchObj[arr[0]] = arr.slice(1).join('');
    }
  });

  return searchObj;
}

export function getSearchStr(obj) {
  let str = '';

  Object.keys(obj).forEach((key) => {
    str += `${key}=${obj[key]}&`;
  });
  str += '_t=1';

  return str;
}
