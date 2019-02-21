import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const MAPPING = {
  HUADAO: 'huadao',
  HUICAIJING: 'hcjing',
  XIAOLIAN: 'smile',
};

@connect()
export default class Channel extends PureComponent {
  componentDidMount() {
    const { type, dispatch, id } = this.props;
    dispatch(routerRedux.replace(`/channel/${btoa(id)}/${MAPPING[type]}`));
  }

  render() {
    return <div />;
  }
}
