import React from 'react';

export default () => {
  if (localStorage && localStorage.clear) localStorage.clear();

  return <div>清理local storage数据专用页,数据已清空，刷新一下!</div>;
};
