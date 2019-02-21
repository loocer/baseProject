import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Button } from 'antd';
import styles from './SearchForm.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    const { roles, cities } = props;
    this.state = { roles, cities };
  }

  componentWillReceiveProps({ roles, cities }) {
    this.setState({ roles, cities });
  }

  onClearHandler = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    const { onClear } = this.props;
    onClear();
  }

  onSearchHandler = (e) => {
    e.preventDefault();
    const { onSearch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (onSearch) {
          onSearch(values);
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSearchHandler} className={styles['search-form']}>
        <Row gutter={40} style={{ margin: '0' }}>
          <Col span={8}>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('name')(<Input placeholder="请输入用户名" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('mobile')(<Input placeholder="请输入手机号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ marginBottom: '24px' }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button onClick={this.onClearHandler}>清空</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" htmlType="submit" onClick={this.onSearchHandler}>查询</Button>
          </Col>
        </Row>
      </Form>);
  }
}

export default connect(state => ({
  roles: state.users.roles || [],
  cities: state.users.cities || [],
}))(Form.create()(SearchForm));
