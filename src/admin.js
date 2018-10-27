import React from 'react';
import {
  Layout,
} from "antd";
import Header from "@common/components/header";
import Nav from "@common/components/nav";

const Admin = (props) => {
  return (
    <Layout style={{height: '100vh'}}>
      <Header />
      <Layout>
        <Nav />
        <Layout.Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          {props.children}
        </Layout.Content>
      </Layout>
    </Layout>
  )
};

export default Admin;