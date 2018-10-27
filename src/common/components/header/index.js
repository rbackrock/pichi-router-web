import React from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { Header } = Layout;
  return (
    <Header className="header">
      <h2 style={{color: '#fff'}}><NavLink to="/home" replace>Pichi</NavLink></h2>
    </Header>
  )
};

export default Header;