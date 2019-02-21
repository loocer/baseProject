export function getUrl(loanId, type) {
  return `/client/api/hd/protocols/${loanId}?type=${type}`;
}
