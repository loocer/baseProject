import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { parse } from 'query-string';
import ContractPage from '../components/Rent/Contract';
import InfomationPage from '../components/Rent/Infomation';
import PaymentPreview from '../components/Rent/PaymentPreview';
import OCR from '../components/Rent/OCR';
import Verify from '../components/Rent/Verify';
import getRoute from '../utils/routeutil';

class Rent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.dispatch({ type: 'global/getQiNiuToken' });
  }

  render() {
    const { location: { pathname, search } } = this.props;
    const query = parse(search);
    const ROUTES = [
      { path: '/rent/:id', title: '租房e分期-个人信息', getComponent: ({ id }) => <InfomationPage id={atob(id)} redirected={query.redirected === 'true'} edit={query.edit} success={query.success === 'true'} /> },
      { path: '/rent/:id/step/1', title: '分期订单', getComponent: ({ id }) => <Verify id={atob(id)} cardId={query.id} /> },
      { path: '/rent/:id/payment', title: '租房e分期-还款预览', getComponent: ({ id }) => <PaymentPreview id={atob(id)} /> },
      { path: '/rent/:id/info', title: '租房e分期-租房详情', getComponent: ({ id }) => <ContractPage id={atob(id)} {...query} /> },
      { path: '/rent/:id/ocr', title: '租房e分期-身份信息', getComponent: ({ id }) => <OCR id={atob(id)} hasHold={query.hasHold === 'true'} edit={query.edit} redirect={query.redirect} /> },
    ];

    return getRoute(ROUTES, pathname);
  }
}

export default connect()(Rent);
