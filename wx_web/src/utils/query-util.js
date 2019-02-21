import { parse } from 'query-string';

const REG = /\?(.*)(_[^=]*=[^=]*)?$/;

export function getQuery(search = window.location.search) {
  if (search) {
    return parse(search.slice(1));
  } else {
    const matches = REG.exec(window.location.hash);
    return parse((matches && matches[1]) || '');
  }
}

export function getBasePath() {
  return /(https?:\/\/[^/]*)/.exec(window.location.href)[1];
}
