import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import './Menus.less';

function getCheckedMenuKey(arr, path) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].url === path) {
      return arr[i].accessId;
    }
    if (arr[i].child) {
      const tmp = getCheckedMenuKey(arr[i].child, path);
      if (tmp) {
        return tmp;
      }
    }
  }
  return null;
}

function getAllKeys(menus = []) {
  let arr = [];
  menus.forEach((menu) => {
    arr.push(menu.accessId);
    if (menu.child) {
      arr = arr.concat(getAllKeys(menu.child));
    }
  });
  return arr;
}

class Menus extends Component {
  constructor(props) {
    super(props);
    const { menus = [], path } = props;
    this.state = {
      menus,
      current: getCheckedMenuKey(menus, path),
      checkedKeys: getAllKeys(menus),
      key: '5e9cc76a9d2711e7a2fc00163e000102',
    };
  }

  componentWillReceiveProps({ menus = [], path }) {
    this.setState({
      menus,
      checkedKeys: getAllKeys(menus),
      current: getCheckedMenuKey(menus, path),
    });
  }

  handleClick = (e) => {
    this.setState({ current: e.key });
  }

  show = (key) => {
    this.setState({key})
  }

  content = (menu) => (menu.map(item =>(
    item.child && item.child.length ?
      <li key={item.accessId} className="menuslist" ref="lidom" onClick={this.show.bind(null, item.accessId)}>
        <a href={'#' + item.url}>{item.name}</a>
        <div className="listcon" >
          <ul className="listconul">
            {this.content(item.child)}
          </ul>
        </div>
      </li>
      :
      <li key={item.accessId} className="menuslist">
        <a href={'#' + item.url}>{item.name}</a>
      </li>
    )

  ))

  render() {
    return (
      <div className="side-menu">
        <ul className="menus">
          {
            this.state.menus.map(item => {
              return <li key={item.accessId} className="menuslist" ref="lidom" onClick={this.show.bind(this, item.accessId)}>
                <a href={'#' + item.url}>{item.name}</a>
                {this.state.key === item.accessId && item.child.length > 0 ?
                  <div className="listcon" >
                    <ul className="listconul">
                      {this.content(item.child)}
                    </ul>
                  </div>
                  : null
                }
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  menus: state.global.menus || [],
}))(Menus);
