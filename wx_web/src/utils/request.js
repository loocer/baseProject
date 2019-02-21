import fetch from 'dva/fetch';
import { REQUEST_URL_PREFIX } from '../constants';
import { deducePlatform, WEB_VIEW } from './platform';

const DEFAULT_HEADER = { 'x-requested-with': 'XMLHttpRequest' };

export const HEADER_URLENCODED = { 'Content-Type': 'application/x-www-form-urlencoded' };
export const HEADER_JSON = { 'Content-Type': 'application/json' };
const HEADER_AGENT = { 'ybej-agent': deducePlatform() || WEB_VIEW };

const REQUESTING = {};


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options = {}, prefix = REQUEST_URL_PREFIX) {
  options.headers = Object.assign({}, DEFAULT_HEADER, options.headers, /^http/.test(url) ? {} : HEADER_AGENT);

  const id = `${url}${JSON.stringify(options)}`;
  const clear = () => {
    REQUESTING[id].index--;
    if (!REQUESTING[id].index) {
      REQUESTING[id] = false;
    }
  };

  if (!REQUESTING[id]) {
    REQUESTING[id] = { request: doRequest(url, options, prefix), index: 1 };
  } else {
    REQUESTING[id].index++;
  }

  try {
    const result = await REQUESTING[id].request;
    clear();
    return result;
  } catch (e) {
    clear();
    throw e;
  }
}

async function doRequest(url, options, prefix) {
  const response = await fetch(/^(http(s)?)?:\/\//.test(url) ? url : `${prefix}${url}`, Object.assign({
    credentials: 'include',
  }, options));
  const result = await response.json();

  if (response.status >= 200 && response.status < 300) {
    if (result.status === true || !('status' in result)) {
      if (result.data === null || result.data === undefined) {
        result.data = {};
      }
      return result;
    } else {
      const error = result.err || result;
      if (error.code)error.returnCode = error.code;
      throw Object.assign({}, error, { code: response.status });
    }
  } else {
    const error = result.err || result;
    if (error.code)error.returnCode = error.code;
    error.code = response.status;
    throw error;
  }
}

export function getFormData(values) {
  /* global FormData */
  const data = new FormData();

  Object.keys(values).map(prop => data.append(prop, values[prop] || ''));

  return data;
}

export function getParamString(param) {
  const keys = Object.keys(param);
  let str = '&';
  keys.forEach((key) => {
    str += `${key}=${param[key] || ''}&`;
  });
  return str.slice(0, -1);
}
