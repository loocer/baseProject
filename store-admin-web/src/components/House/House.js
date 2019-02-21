import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button, Badge } from 'antd';
import Panel from '../common/Panel';
import { DEFAULT_PAGE, STATUS, LEASETYPE } from '../../constants';
import { getDateString } from '../../utils/dateutil';
import HouseModal from './HouseModal';
import SearchForm from './SearchForm';

class House extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.param = {};
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  onSearchHandler = (param) => {
    this.param = param;
    const { dispatch } = this.props;
    dispatch({ type: 'house/takeEffect', payload: { effect: 'getList', param: { page: DEFAULT_PAGE, param } } });
  }

  onClearHandler = () => {
    this.param = {};
  }

  render() {
    const columns = [
      {
        title: '序号',
        key: 'index',
        render: (a0, a1, i) => (<span>{i + 1}</span>),
      }, {
        title: '委托地址',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '委托开始日期',
        dataIndex: 'startTime',
        key: 'startTime',
        render: times => getDateString(times),
      }, {
        title: '委托终止日期',
        dataIndex: 'endTime',
        key: 'endTime',
        render: times => getDateString(times),
      }, {
        title: '租赁类型',
        dataIndex: 'leaseType',
        key: 'leaseType',
        render: leaseType =>
          leaseType === 'entireRent' ? <a>{LEASETYPE[leaseType]}</a>
          : <a>{LEASETYPE[leaseType]}</a>,
      }, {
        title: '租赁状态',
        dataIndex: 'status',
        key: 'status',
        render: status =>
          status === 0 ? <a>{STATUS[status]}</a>
          : <a>{STATUS[status]}</a>,
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span>

              <a>编辑</a>
              <a>查看照片</a>
            <Popconfirm title="确定删除该数据？" >
              <a href="">删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return (
      <Panel title = "none">
        <SearchForm
          ref={(form) => { this.searchForm = form; }}
          {...this.props}
          onSearch={this.onSearchHandler}
          onClear={this.onClearHandler}
        />
        <Table
          columns={columns}
          dataSource={this.state.list}
          pagination={this.state.page}
          bordered
        />
      </Panel>
    );
  }
};

function mapStateToProps(state) {
  const { list, total, page } = state.house;
  return {
    loading: state.loading.models.house,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(House);