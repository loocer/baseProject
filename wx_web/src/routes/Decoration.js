import React, { Component } from 'react';
import { connect } from 'dva';
import DecorationPage from '../components/Decoration/Index';
import DecorationStep1Page from '../components/Decoration/DecorationStep1';
import DecorationStep1RelatedPage from '../components/Decoration/DecorationStep1Related';
import DecorationStep2Page from '../components/Decoration/DecorationStep2';
import DecorationStep2CommonPage from '../components/Decoration/DecorationStep2Common';
import DecorationStep3Page from '../components/Decoration/DecorationStep3';
import DecorationStep4Page from '../components/Decoration/DecorationStep4';
import CustomerImagesPage from '../components/Decoration/CustomerImages';
import getRoute from '../utils/routeutil';
import { getQuery } from '../utils/query-util';

class Decoration extends Component {
  componentWillMount() {
    const query = getQuery();

    this.props.dispatch({ type: 'global/getQiNiuToken' });

    if (query.h5faceId) {
      this.props.dispatch({ type: 'face/checkFace', payload: query });
    }
  }

  render() {
    const { location: { pathname, search } } = this.props;
    const query = getQuery(search);
    const ROUTES = [
      { path: '/decoration/:id', title: '家装e分期-合同信息', getComponent({ id }) { return <DecorationPage id={atob(id)} />; } },
      { path: '/decoration/:id/step/1', title: '家装e分期-基本资料信息', getComponent({ id }) { return <DecorationStep1Page id={atob(id)} edit={query.edit === true || query.edit === 'true'} />; } },
      { path: '/decoration/:id/step/1/related', title: '家装e分期-基本资料信息', getComponent({ id }) { return <DecorationStep1RelatedPage id={atob(id)} step={1} />; } },
      { path: '/decoration/:id/step/1/related/:step', title: '家装e分期-基本资料信息', getComponent({ id, step }) { return <DecorationStep1RelatedPage id={atob(id)} step={~~step} />; } },
      { path: '/decoration/:id/step/2', title: '家装e分期-上传个人证件照片', getComponent({ id }) { return <DecorationStep2Page id={atob(id)} />; } },
      { path: '/decoration/:id/step/2/common', title: '家装e分期-上传个人证件照片', getComponent({ id }) { return <DecorationStep2CommonPage id={atob(id)} step={1} />; } },
      { path: '/decoration/:id/step/2/common/:step', title: '家装e分期-上传个人证件照片', getComponent({ id, step }) { return <DecorationStep2CommonPage id={atob(id)} step={~~step} />; } },
      { path: '/decoration/:id/step/3', title: '家装e分期-上传购房合同/房产证照片', getComponent({ id }) { return <DecorationStep3Page id={atob(id)} />; } },
      { path: '/decoration/:id/step/4', title: '家装e分期-上传征信照片', getComponent({ id }) { return <DecorationStep4Page id={atob(id)} />; } },
      { path: '/decoration/:id/customer/images', title: '下户照片', getComponent: ({ id }) => (<CustomerImagesPage id={atob(id)} times={query.times} />) },
    ];

    return getRoute(ROUTES, pathname);
  }
}

export default connect()(Decoration);
