import { TYPE_DECORATION, TYPE_URL_MAPPING } from '../constants';

export function getBindCardUrl(type, loanId) {
  if (type === TYPE_DECORATION) {
    return {
      pathname: '/account/bank/addcard',
      search: `?redirect=/${TYPE_URL_MAPPING[type]}/${btoa(loanId)}`,
    };
  }

  return `/${TYPE_URL_MAPPING[type]}/${btoa(loanId)}`;
}
