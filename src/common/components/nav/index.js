import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { menu } from '@common/resource';
import _ from 'lodash';

const renderNavList = (menu) => {
  if (_.isArray(menu)) {
    return menu.map(item => {
      if (item.hasOwnProperty('children')) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={<span>item.title</span>}
          >
            renderNavList(item.children)
          </Menu.SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            <NavLink to={item.key} replace><span>{item.title}</span></NavLink>
          </Menu.Item>
        )
      }
    })
  }

  return null;
};

const Nav = (props) => {
  return (
    <Layout.Sider
      trigger={null}
      collapsible
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[menu.length > 0 ? menu[0]['key'] : '/home']}
        selectedKeys={[props.location.pathname]}
      >
        { renderNavList(menu) }
      </Menu>
    </Layout.Sider>
  )
};

export default withRouter(Nav);
