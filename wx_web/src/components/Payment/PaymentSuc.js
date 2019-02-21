import React from 'react';
import { Link } from 'dva/router';
import style from './Result.less';

export default (props) => {
  const { redirect } = props;
  return (<div className={style['payment-tips']}>
    <div>
      <img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQzICgzODk5OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c3VjY2VzczwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLmjojkv6HmiJDlip8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjMuMDAwMDAwLCAtMjEyLjAwMDAwMCkiIGZpbGw9IiMxQjg3RUQiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTg4LDIxMiBDMTc0LjE5MjkwMSwyMTIgMTYzLDIyMy4xOTI5MDEgMTYzLDIzNyBDMTYzLDI1MC44MDcwOTkgMTc0LjE5MjkwMSwyNjIgMTg4LDI2MiBDMjAxLjgwNzE2OSwyNjIgMjEzLDI1MC44MDcwOTkgMjEzLDIzNyBDMjEzLDIyMy4xOTI5MDEgMjAxLjgwNzA5OSwyMTIgMTg4LDIxMiBaIE0xODUuMTU4OTg5LDI0OC4wODAyMyBMMTgzLjI2NDkzNSwyNDkuOTc0Mjg0IEwxNzEuOTAwNjgxLDIzOC42MTAwMyBMMTc1LjY4ODc4OSwyMzQuODIxOTkyIEwxODMuMjY0ODY1LDI0Mi4zOTgxMzggTDIwMC4zMTEyMTEsMjI1LjM1MTc5MiBMMjA0LjA5OTI0OSwyMjkuMTM5ODMgTDE4NS4xNTg5ODksMjQ4LjA4MDIzIEwxODUuMTU4OTg5LDI0OC4wODAyMyBaIiBpZD0ic3VjY2VzcyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" />
      <h4>支付成功</h4>
      <p>请等待系统确认，还款成功后，会通过短信通知并更新还款状态。</p>
      {redirect ?
        <Link to={`/loan/${redirect}/repayment`} className={style.anchor}>返回还款计划</Link>
        : <Link to="/" className={style.anchor}>返回首页</Link>
      }
    </div>
  </div>);
};
