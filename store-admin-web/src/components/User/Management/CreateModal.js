import React, { Component } from 'react';
import { Modal, Form, Select, Input, Radio, Tree } from 'antd';
import { connect } from 'dva';
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
      defaultCheckedKeys.push(item.id);
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.checkedKeys.map((item, i) => {
          values[`functions[${i}].id`] = item;
          return item;
        });
        values.pid = this.pid || '';
        onOk(values);
        this.hideModalHandler();
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
      if (item.children && item.children.length) {
        return (<TreeNode key={item.id} title={item.name}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>);
      } else {
        return <TreeNode key={item.id} title={item.name} />;
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;

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
          <FormItem label="姓名" {...formItemLayout}>
            {
              getFieldDecorator('loginName', {
                rules: [{ required: true, message: '请输入用户姓名' }],
              })(<Input />)
            }
          </FormItem>
          <FormItem label="手机号码" {...formItemLayout}>
            {
              getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入手机号码' }],
              })(<Input />)
            }
          </FormItem>
        </Form>
      </Modal>
    </span>);
  }
}


export default Form.create()(CreateModal);
