import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Tree } from 'antd';

const FormItem = Form.Item;

class RoleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillReceiveProps() {
   
  }

  render() {
    return (
      <div>example</div>
    )
  }
}

export default RoleModal;
