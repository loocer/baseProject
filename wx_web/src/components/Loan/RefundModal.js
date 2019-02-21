import React, { Component } from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button, Modal, Checkbox, TextareaItem, Toast } from 'antd-mobile';
import styles from './Repayment.less';
import Close from '../../assets/close@xhdpi.png';
import Close2X from '../../assets/close@2x.png';
import Close3X from '../../assets/close@3x.png';

const CheckboxItem = Checkbox;

@connect()
@createForm()
export default class RefundModal extends Component {
  constructor(props) {
    super(props);
    this.state = { visiable: false };
    this.check = [];
  }

  onClose = (e) => {
    e.preventDefault();
    this.setState({ visiable: false });
  }

  onChange = (val) => {
    const index = this.check.indexOf(val);
    if (index !== -1) {
      this.check.splice(index, 1);
    } else {
      this.check.push(val);
    }
  }

  onSubmitRent = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.check.length === 0 && values.reason === undefined) {
          Toast.info('请输入您的退租理由', 2, null, false);
        } else {
          values.tag = this.check.toString();
          this.props.dispatch({ type: 'loan/refund', payload: { values, loanId: this.props.id } }).then(() => {
            this.setState({ visiable: false });
            this.check = [];
            Toast.success('提交成功', 1);
          });
        }
      }
    });
  }

  onShowHandler = (e) => {
    e.preventDefault();
    this.setState({ visiable: true });
  }

  render() {
    const { getFieldProps } = this.props.form;

    const data = [
      { value: 0, label: '已经跟经纪人沟通' },
      { value: 1, label: '换其他住处' },
      { value: 2, label: '商家没给房东房租' },
      { value: 3, label: '改押一付三' },
    ];

    return (<div className={styles.btnRent}>
      <span onClick={this.onShowHandler}>{ this.props.children }</span>
      <Modal
        popup
        visible={this.state.visiable}
        animationType="slide-up"
        maskClosable={false}
        className={styles.Modal}
      >
        <div className={styles.titleCon}>
          <h3 className={styles.title}>申请退租</h3>
          <img
            className={styles.Closeimg}
            src={Close}
            alt="关闭按钮"
            srcSet={`${Close2X} 2x,${Close3X} 3x`}
            onClick={this.onClose}
          />
        </div>
        <div className={styles.remindCon}>
          <div className={styles.remind}>
            <p>温馨提示：提交后，需先与商户线下办理相关手续，商户申请并结清尾款后，订单方可 结清，如需详询可致电 400-811–8536 客服热线。</p>
          </div>
        </div>
        <div className={styles.selectCon}>
          <div className={styles.select}>
            {data.map(i => (
              <CheckboxItem
                key={i.value}
                onChange={() => this.onChange(i.value)}
              >
                <span >{i.label}</span>
              </CheckboxItem>
            ))}
          </div>
        </div>
        <div className={styles.Multiline}>
          <TextareaItem
            {...getFieldProps('reason')}
            rows={3}
            placeholder="其他理由"
          />
        </div>
        <Button type="primary" className={styles.btnSubmit} onClick={this.onSubmitRent}>确定提交</Button>
      </Modal>
    </div>);
  }
}
