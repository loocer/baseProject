import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import CreateModal from './CreateModal';
import ManagementModal from './ManagementModal';
import Panel from '../../common/Panel';
import SearchForm from './SearchForm';
import { getDateString } from '../../../utils/dateutil';

class Management extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.param = {};
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    const columns = [
      {
        title: '员工账号',
        dataIndex: 'idCard',
        key: 'idCard',
      }, {
        title: '员工姓名',
        dataIndex: 'realName',
        key: 'realName',
      }, {
        title: '身份证号',
        dataIndex: 'baseUser.mobile',
        key: 'mobile',
      }, {
        title: '所属门店',
        dataIndex: 'baseUser.cityName',
        key: 'city',
      }, {
        title: '角色',
        dataIndex: 'areas',
        key: areas => areas.map(area => (`${area.id},`)),
      }, {
        title: '后台访问',
        dataIndex: 'baseUser.departmentName',
        key: 'department',
      }, {
        title: '台账号',
        dataIndex: 'baseUser.working',
        key: 'working',
      }, {
        title: '账号状态',
        dataIndex: 'baseUser.email',
        key: 'email',
        render: text => (<a href="mailto:{text}">{text}</a>),
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span>
            <ManagementModal
              title="编辑用户"
            >
              <a>编辑</a>
            </ManagementModal>&nbsp;&nbsp;
             <a>离职</a>
          </span>
        ),
      },
    ];

    return (
      <Panel>
        <SearchForm

        />
        <Table

          bordered
        />
      </Panel>
    );
  }
};

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Management);
