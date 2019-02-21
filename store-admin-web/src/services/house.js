import request, { getParamString, HEADER_URLENCODED } from '../utils/request';
import { DEFAULT_PAGE_SIZE } from '../constants';

export function getList(sId, token,
  pageNo = 1, pageSize = DEFAULT_PAGE_SIZE, param = {}) {
  return request(`/salesmen/${sId}/admin/contract?pageNo=${pageNo}&pageSize=${pageSize}${getParamString(param)}`, {
    headers: { token },
  });
}
