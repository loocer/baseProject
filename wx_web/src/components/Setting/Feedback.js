import React, { Component } from 'react';
import { connect } from 'dva';
import { List, TextareaItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './Feedback.less';

@connect(state => ({
  loading: state.loading.models['setting/saveFeedback'],
}))
@createForm()
export default class Feedback extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (this.saving && !loading) {
      Toast.success('意见提交成功!');
      this.saving = false;
    }
  }

  onSaveFeedbackHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.props.dispatch({ type: 'setting/saveFeedback', payload: value });
        this.saving = true;
      } else {
        Toast.fail('请输入您的意见', 2, null, false);
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (<div className={styles.feedback}>
      <List>
        <TextareaItem
          rows={8}
          placeholder="请输入您的宝贵意见、建议，我们将不断改善"
          {...getFieldProps('question', {
            rules: [
              { required: true, message: '请输入意见' },
            ],
          })}
        />
        <List.Item>
          <Button type="primary" onClick={this.onSaveFeedbackHandler}>提交</Button>
        </List.Item>
      </List>
    </div>);
  }
}
