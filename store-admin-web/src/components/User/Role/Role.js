import React from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Icon } from 'antd';
import RoleModal from './RoleModal';
import CreateModal from './CreateModal';
import Panel from '../../common/Panel';
import { getDateString } from '../../../utils/dateutil';
import styles from './Role.less';

function Role({ dispatch, list: dataSource, page, loading }) {
  function deleteHandler(id) {
    dispatch({ type: 'user/deleteRole', payload: id });
  }

  function editHandler(values) {
    dispatch({ type: 'user/editRole', payload: values });
  }

  function addUserHandler (values) {
    dispatch({ type: 'user/addRole', payload: values });
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
            onOk={editHandler}
            title="权限设置"
          >
            <a>权限设置</a>
          </RoleModal>&nbsp;&nbsp;
          <Popconfirm title="确定删除该数据？" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Panel title='none'>
      <div className={styles.buttoncon}>
        <CreateModal
          title="新建角色"
          onOk={addUserHandler}
        >
        <a className={styles.buttonicon} >
            添加
        </a>
        </CreateModal>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={page}
        bordered
      />
    </Panel>
  );
}

function mapStateToProps(state) {
  const { list, page } = state.user;
  return { loading: state.loading.models.user, list, page };
}

export default connect(mapStateToProps)(Role);
