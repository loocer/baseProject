import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Modal, Form, Input, Icon, Select } from 'antd';
import styles from './Header.less';
import LOGO_IMG from '../../assets/navlogo.png';

const FormItem = Form.Item;

class Header extends Component {
  constructor(props) {
    super(props);
    const { role, logout, menus = [], path } = props;
    this.state = { role, logout, menus, visible: false };
  }

  componentWillReceiveProps(nextProps) {
    const { role = {}, menus = [], path } = nextProps;
    this.setState({ role, menus, path });
  }

  onChangePasswordHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        delete values.checkpass;
        dispatch({ type: 'global/takeEffect', payload: { effect: 'editPassword', param: { values } } });
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
    this.setState({ visible: true });
  }

  logoutHandler = () => {
    this.logout = true;
    this.props.dispatch({ type: 'global/takeEffect', payload: { effect: 'logout', param: { } } });
  }

  show = (key) => {
    this.setState({key}, ()=>{
        this.setState({ visible: true });
    })
  }


  render() {
    const { className } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (<div>
        <div className={className}>
          <div className={styles.headercon}>
            <img src={LOGO_IMG} alt="员工管理系统" height="24" className={styles.logo} />
            <div className={styles.sidemenu}>
              <ul className={styles.menus}>
                {
                  this.state.menus.map(item => (
                    item.child && item.child.length > 0 ? <li key={item.accessId} className={styles.menuslist} onClick={this.show.bind(this, item.accessId)}>
                        {item.name}
                    </li>
                    :
                    <li key={item.accessId} className={styles.menuslist} onClick={this.show.bind(this, item.accessId)}>
                        <Link to={item.url}>{item.name}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
            <ul className={styles.info}>
              <li>
                <input type="text" placeholder="搜索用户姓名、电话、订单号" className={styles.searchinput}/>
                <Icon type='search' className={styles.searchicon} />
              </li>
              <li>
                <span className={styles.searchselect}>北京昊园恒业地产经纪有限公司</span>
                 <Icon type="caret-down" className={styles.selecticon} />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.listcon} data-visible={this.state.visible}>
            {
                this.state.menus.map(item => (
                    this.state.key === item.accessId && item.child.length > 0 ?
                        <ul className={styles.listconul}>
                          {item.child.map(sublist => {
                                return <li key={sublist.accessId}>
                                        <Link to={sublist.url}>{sublist.name}</Link>
                                 </li>
                             })
                          }
                        </ul>
                      : null
                ))
            }
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  role: state.global.role || {},
  menus: state.global.menus || [],
}))(Form.create()(Header));
