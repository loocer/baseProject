import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { stringify } from 'query-string';
import { TYPE_DECORATION } from '../../constants';
import { close } from '../../utils/pageutil';
import Loading from '../common/Loading';
// 驳回修改订单适配器，根据订单类型及驳回原因跳转至相应的修改页面
@connect(state => ({ detail: state.loan.detail || {} }))
export default class EditAdapter extends Component {
  componentWillMount() {
    const { id, dispatch, history } = this.props;
    if (history.action === 'POP') { // 处理返回防止重复进入编辑页面
      if (history.length > 1) history.go(-1); // 如果是APP直接打开编辑页面无法继续返回则直接关闭
      else close();
    } else {
      dispatch({ type: 'loan/getLoan', payload: id }).then(this.toRejectPage);
    }
  }
  toRejectPage = () => {
    const { id, detail } = this.props;
    if (!detail[id]) setTimeout(this.toRejectPage, 10);
    if (detail[id].loanDetailMap.type === TYPE_DECORATION) {
      this.toDecorationRejectPage();
    } else {
      this.toRentRejectPage();
    }
  }
  toRentRejectPage = () => {
    const {
      id, dispatch, detail,
    } = this.props;
    let hasPerson = false;
    let hasIdCard = false;
    // let hasBankCard = false;
    const { fieldsMap } = detail[id];
    Object.values(fieldsMap).forEach((reason) => {
      if (reason.category === 'person') hasPerson = true;
      if (reason.category === 'idCard') hasIdCard = true;
      // if (reason.category === 'bankCard') hasBankCard = true;
    });
    const route = `/rent/${btoa(id)}${hasPerson ? '' : '/step/1'}`;
    if (hasIdCard) {
      dispatch(routerRedux.replace({
        pathname: `/rent/${btoa(id)}/ocr`,
        search: `?redirect=${route}&edit=true`,
      }));
    } else {
      dispatch(routerRedux.replace({
        pathname: route,
        search: `?${stringify(Object.assign({ edit: true }))}`,
      }));
    }
  }
  toDecorationRejectPage = () => {
    const { id, dispatch, detail } = this.props;
    const categories = ['person', 'bankCard', 'idCard', 'contract'];
    let index = 3;
    const { fieldsMap } = detail[id];
    Object.values(fieldsMap).forEach((reason) => {
      const i = categories.indexOf(reason.category);
      if (i < index && i >= 0) index = i;
    });
    if (index === 1) index = 2;
    else if (index === 0) index = 1;
    dispatch(routerRedux.replace({
      pathname: `/decoration/${btoa(id)}/step/${index}`,
      search: `?${stringify({ edit: true })}`,
    }));
  }
  render() {
    return <Loading loading />;
  }
}
