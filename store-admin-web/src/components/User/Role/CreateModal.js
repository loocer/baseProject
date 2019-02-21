import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Tree } from 'antd';
import styles from '../../common/tree.css';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

class CreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tree: [],
      record: {},
      checkedKeys: [],
      defaultCheckedKeys: [],
    };
  }

  componentWillReceiveProps({ record = {}, tree, menus }) {
    const { functions = [] } = record;
    const defaultCheckedKeys = [];
    functions.map((item) => {
      defaultCheckedKeys.push(item.accessId);
      return item;
    });
    this.setState({ record, tree, defaultCheckedKeys, menus });
  }

  onCheckHandler = (checkedKeys) => {
    this.setState({ checkedKeys });
  }

  onCheckPidHandler = (checkedKeys) => {
    this.pid = checkedKeys[0];
  }

  onOkHandler = () => {
    const { onOk } = this.props;
    const jihe = [];
    const accessId = [];
    const obj = {};
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.checkedKeys.map((item, i) => {
          jihe[`functions[${i}].accessId`] = item;
          return accessId.push(jihe[`functions[${i}].accessId`]);
        });
        values.accessId = accessId || '';
        obj.roleName = values.roleName;
        values.role = obj;
        delete values.roleName;
        console.log(values);
        onOk(values);
        this.hideModalHandler();
        this.props.form.resetFields();
      }
    });
  }

  hideModalHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      visible: false,
    });
  }

  showModalHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ visible: true });
  }

  renderTreeNodes(arr = []) {
    return arr.map((item) => {
      if (item.child && item.child.length) {
        return (<TreeNode key={item.accessId} title={item.name}>
          {this.renderTreeNodes(item.child)}
        </TreeNode>);
      } else {
        return <TreeNode key={item.accessId} title={item.name} />;
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, url, icon = '', parent = {}, mOrder = '' } = this.state.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (<span style={this.props.style}>
      <span onClick={this.showModalHandler}>
        { this.props.children }
      </span>
      <Modal
        visible={this.state.visible}
        onCancel={this.hideModalHandler}
        onOk={this.onOkHandler.bind(this)}
        title={this.props.title}
      >
        <Form>
          <FormItem label="角色名称" {...formItemLayout}>
            {
                getFieldDecorator('roleName', {
                  rules: [{ required: true, message: '请输入角色名称' }],
                })(<Input />)
              }
          </FormItem>
          <FormItem label="菜单访问权限" {...formItemLayout}>
            {
              <Tree
                checkable
                defaultCheckedKeys={this.state.defaultCheckedKeys}
                onCheck={this.onCheckHandler}
                className={styles.tree}
              >
                {this.renderTreeNodes(this.state.menus)}
              </Tree>
            }
          </FormItem>
          <FormItem label="操作权限管理" {...formItemLayout}>
            {
              <Tree
                checkable
                defaultCheckedKeys={this.state.defaultCheckedKeys}
                onCheck={this.onCheckHandler}
                className={styles.tree}
              >
                {this.renderTreeNodes(this.state.tree)}
              </Tree>
            }
          </FormItem>
        </Form>
      </Modal>
    </span>);
  }
}

export default connect(state => ({
  menus: state.user.menu || [],
  tree: state.user.operation || [],
}))(Form.create()(CreateModal));

