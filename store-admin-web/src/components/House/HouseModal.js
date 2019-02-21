import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Select } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class HouseModal extends Component {
  constructor(props) {
    super(props);
    const { userInfo, leaders, departments, cities, roles, areas } = props;
    this.state = { userInfo, leaders, departments, visible: false, cities, roles, areas };
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo, leaders, departments, cities, roles, areas } = nextProps;
    this.setState({ userInfo, leaders, departments, cities, roles, areas });
  }

  onOkHandler = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onOk, id } = this.props;
        values.role.forEach((view, item) => {
          values[`roles[${item}].id`] = view;
        });
        values.area.forEach((v, i) => {
          values[`areas[${i}].id`] = v;
        });
        if (values.leaderId === null) delete values.leaderId;
        delete values.checkpass;
        delete values.role;
        delete values.area;
        onOk(values, id);
        this.hideModalHandler();
      }
    });
  }

  hideModalHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ visible: false });
  }

  showModalHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    const { id, dispatch } = this.props;
    dispatch({ type: 'users/takeEffect', payload: { effect: 'getUserInfo', param: { id } } });
    this.setState({ visible: true });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const defaultRoles = [];  // select下拉框的默认值
    const defaultAreas = [];  // select下拉框的默认值
    const { getFieldDecorator } = this.props.form;
    const {
        baseUser: {
          realName: userName,
          mobile: userMobile,
          email: userEmail,
          working: userWoking,
          leaderId: userLeaderId,
          departmentId: userDepartmentId,
          cityId: userCity,
        } = {},
        roles: rolesArr = [],
        areas: areasArr = [],
    } = this.state.userInfo;
    rolesArr.forEach((role) => {
      defaultRoles.push(role.id);
    });
    areasArr.forEach((area) => {
      defaultAreas.push(area.id);
    });

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
              getFieldDecorator('realName', {
                initialValue: userName,
                rules: [{ required: true, message: '请输入姓名' }],
              })(<Input />)
            }
          </FormItem>
          <FormItem label="联系电话" {...formItemLayout}>
            {
               getFieldDecorator('mobile', {
                 initialValue: userMobile,
                 rules: [{ required: true, message: '请输入电话' }],
               })(<Input />)
             }
          </FormItem>
          <FormItem label="邮箱" {...formItemLayout}>
            {
              getFieldDecorator('email', {
                initialValue: userEmail,
                rules: [{ required: true, message: '邮箱' }],
              })(<Input />)
            }
          </FormItem>
          <FormItem label="城市" {...formItemLayout}>
            {
               getFieldDecorator('cityId', {
                 initialValue: userCity,
                 rules: [{ required: true, message: '请选择城市' }],
               })(<Select
                 placeholder="请选择城市"
               >
                 {
                    this.state.cities.map(city => (
                      <Select.Option key={city.id} value={city.id}>{city.name}</Select.Option>))
                 }
               </Select>)
             }
          </FormItem>
          <FormItem label="在职状态" {...formItemLayout}>
            {
              getFieldDecorator('working', {
                initialValue: userWoking,
                rules: [{ required: true, message: '请选择在职状态' }],
              })(<RadioGroup>
                <Radio value={true} key={true}>在职</Radio>
                <Radio value={false} key={false}>离职</Radio>
              </RadioGroup>)
            }
          </FormItem>
          <FormItem label="部门" {...formItemLayout}>
            {
              getFieldDecorator('departmentId', {
                initialValue: userDepartmentId,
                rules: [{ required: true, message: '请选择部门' }],
              })(<Select
                placeholder="请选择部门"
              >
                {
                  this.state.departments.map(department => (
                    <Select.Option
                      key={department.id}
                      value={department.id}
                    >{department.name}</Select.Option>))
                }
              </Select>)
            }
          </FormItem>
          <FormItem label="团队负责人" {...formItemLayout}>
            {
              getFieldDecorator('leaderId', {
                initialValue: userLeaderId,
              })(<Select
                placeholder="请选择团队负责人"
              >
                <Select.Option key={null} value={null}>无</Select.Option>
                {
                  this.state.leaders.map(leader => (
                    <Select.Option
                      key={leader.id}
                      value={leader.id}
                    >{leader.realName}</Select.Option>))
                }
              </Select>)
            }
          </FormItem>
          <FormItem label="角色权限" {...formItemLayout}>
            {
              getFieldDecorator('role', {
                initialValue: defaultRoles,
              })(<Select
                mode="multiple"
                placeholder="请选择角色权限"
              >
                {
                  this.state.roles.map(role => (
                    <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>))
                }
              </Select>)
            }
          </FormItem>
          <FormItem label="区域管理" {...formItemLayout}>
            {
              getFieldDecorator('area', {
                initialValue: defaultAreas,
              })(<Select
                mode="multiple"
                placeholder="请选择区域管理"
              >
                {
                  this.state.areas.map(area => (
                    <Select.Option key={area.id} value={area.id}>{area.name}</Select.Option>))
                }
              </Select>)
            }
          </FormItem>
        </Form>
      </Modal>
    </span>);
  }
}

export default connect(state => ({
  userInfo: state.users.userInfo || {},
  cities: state.users.cities || [],
  roles: state.users.roles || [],
  areas: state.users.areas || [],
  leaders: state.users.leaders || [],
  departments: state.users.departments || [],
}))(Form.create()(HouseModal));