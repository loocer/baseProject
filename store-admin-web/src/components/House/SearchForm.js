import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import styles from './SearchForm.less';
import rolestyles from '../User/Role/Role.less';

const FormItem = Form.Item;
const Option = Select.Option;

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
      <div className={styles.housecon}>
      <Form onSubmit={this.onSearchHandler} layout="inline" className={styles.searchform}>
        <FormItem>
          {getFieldDecorator('name')(<Input placeholder="请输入委托地址" style={{'color' : '#666'}}/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('mobile',{
              initialValue: '租赁类型',
            })(<Select style={{ width: 120 }}>
                <Option value="0">整租</Option>
                <Option value="1">家装</Option>
              </Select>)
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('mobile',{
              initialValue: '租赁状态',
            })(<Select style={{ width: 120 }}>
                <Option value="3">已租</Option>
                <Option value="4">未租</Option>
              </Select>)
          }
        </FormItem>
        <Button type="primary" htmlType="submit" onClick={this.onSearchHandler}>查询</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={this.onClearHandler}>清空</Button>
      </Form>
      <div className={styles.buttonicon}>
        <a className={rolestyles.buttonicon} >添加</a>
      </div>
      <div className={styles.clearfix} />
    </div>
    )
  }
}

export default connect(state => ({

}))(Form.create()(SearchForm));
