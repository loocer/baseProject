import { Component } from 'react';
import { routerRedux } from 'dva/router';
import { Modal } from 'antd';
import { DEFAULT_PAGE } from '../../constants';
import { getParamString } from '../../utils/request';

export default class BaseOrders extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  state = { visible: false }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    const { exception, exportLoading } = nextProps;
    if (this.export) {
      if (exception) {
        Modal.error({ content: `导出失败:${exception.message || ''}` });
      } else if (exportLoading) {
        Modal.info({ content: '导出成功' });
        this.export = false;
      }
    }
  }

  onExportHandler = (values) => {
    this.export = true;
    this.props.dispatch({
      type: this.exportAction,
      payload: {
        page: this.page || DEFAULT_PAGE,
        param: values,
      },
    });
  }

  onChangePageHandler = (page) => {
    this.page = page;
    this.doPushAction(page, this.param);
  }

  onClearHandler = () => {
    this.param = {};
  }

  onSearchHandler = (values) => {
    this.param = values;
    this.doPushAction(DEFAULT_PAGE, values);
  }

  showModal = (e) => {
    e.preventDefault();
    this.setState({ visible: true });
  }

  hideModal = (e) => {
    e.preventDefault();
    this.setState({ visible: false });
  }

  doPushAction = (page, param) => {
    this.props.dispatch(routerRedux.push({
      pathname: this.searchPath,
      search: `?page=${page.current}&per=${page.pageSize}${getParamString(param, true)}`,
    }));
  }
}
