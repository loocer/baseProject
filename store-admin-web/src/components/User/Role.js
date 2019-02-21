import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm } from 'antd';
import RoleModal from './RoleModal';
import Panel from '../../common/Panel';
import { getDateString } from '../../../utils/dateutil';

function Roles({ dispatch, list: dataSource, page, loading }) {
  function deleteHandler(id) {
    dispatch({ type: 'roles/takeEffect', payload: { effect: 'delete', param: { id } } });
  }
  const columns = [
    {
      title: '序号',
      key: 'index',
      render: (text, record, i) => <span>{i + 1}</span>,
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    }, {
      title: '编辑人',
      dataIndex: 'creater',
      key: 'creater',
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: times => getDateString(times),
    }, {
      title: '更新时间',
      dataIndex: 'updateDate',
      key: 'updateDate',
      render: times => getDateString(times),
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record) => (
        <span>
          <RoleModal
            record={record}
            onOk={editHandler.bind(null, record.id)}
            title="编辑角色"
          >
            <a>编辑</a>
          </RoleModal>&nbsp;&nbsp;
          <Popconfirm title="确定删除该数据？" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  function createHandler(values) {
    dispatch({ type: 'roles/takeEffect', payload: { effect: 'create', param: { values } } });
  }

  function editHandler(id, values) {
    dispatch({ type: 'roles/takeEffect', payload: { effect: 'edit', param: { id, values } } });
  }

  function onChangeHandler(pagination) {
    dispatch({ type: 'roles/takeEffect', payload: { effect: 'getList', param: { page: pagination } } });
  }
  const panelTitle = (<div>
        <Button type="primary" icon="plus">添加</Button>
  </div>);

  return (
    <Panel title={panelTitle}>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={page}
        onChange={onChangeHandler}
        bordered
      />
    </Panel>
  );
}

function mapStateToProps(state) {
  const { list } = state.user;
  return { loading: state.loading.models.user, list };
}

export default connect(mapStateToProps)(Roles);
