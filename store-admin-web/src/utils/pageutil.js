import React from 'react';

export function getAntPage(page) {
  return {
    current: page.page || page.pageNo || 1,
    pageSize: page.per || page.pageSize || 10,
    total: page.totalCount,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total, range) =>
    (<span>共{total}条数据，当前显示第{range[0]}-{range[1]}条数据,共{page.totalPages}页</span>),
  };
}
