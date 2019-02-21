import fetch from 'dva/fetch';
import { REQ_PREFIX } from '../constants';

const DEFAULT_HEADER = { 'x-requested-with': 'XMLHttpRequest' };

export const HEADER_JSON = { 'Content-Type': 'application/json' };
export const HEADER_URLENCODED = { 'Content-Type': 'application/x-www-form-urlencoded' };
export const Y_REQUEST_SOURCE = { 'Y-REQUEST-SOURCE': 'PC-REQUEST-SOURCE' };

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options = {}) {
  options.headers = Object.assign({}, DEFAULT_HEADER, options.headers);
  const response = await fetch(`${REQ_PREFIX}/api/v1${url}`, Object.assign({
    credentials: 'include',
  }, options));

  try {
    if (response.status >= 200 && response.status < 300) {
      const result = await response.json();
      if (result.status === true || !('status' in result)) {
        result.data = result.data || result.result || result || {};
        return result;
      } else if (result.err) {
        throw result.err;
      } else {
        throw result;
      }
    } else if (response.status >= 500) {
      throw await response.json();
    } else {
      throw await response.json();
    }
  } catch (e) {
    throw e;
  }
}

export function getFormData(values) {
  /* global FormData */
  const data = new FormData();

  Object.keys(values).map(prop => data.append(prop, values[prop] || ''));

  return data;
}

export function getParamString(param = {}, ignoreNullValue) {
  const keys = Object.keys(param);
  let str = '&';

  keys.forEach((key) => {
    if (typeof param[key] !== 'object' && typeof param[key] !== 'function') {
      const isNull = param[key] === null || param[key] === undefined || param[key] === '';
      if (!isNull || !ignoreNullValue) {
        str += `${key}=${isNull ? '' : param[key]}&`;
      }
    }
  });

  return str.slice(0, -1);
}
