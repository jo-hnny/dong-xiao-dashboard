import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
import styles from './index.module.scss'
import { Link, HashRouter as Router, Route, Redirect } from 'react-router-dom'
import Example from '../example'
import Reservation from '../reservation'
import Api from '../../api'

const { Header, Content, Sider } = Layout

export default class extends React.Component<any> {
  logout = async () => {
    await Api.logout()
    this.props.history.replace('/login')
  }

  render() {
    const { match, location } = this.props
    console.log(this.props)
    return (
      <Layout className={styles.home}>
        <Header className={styles.header}>
          <Button onClick={this.logout}>退出</Button>
        </Header>

        <Layout className={styles.sidebar}>
          <Sider>
            <Menu theme="dark" defaultSelectedKeys={[`${match.url}/example`]}>
              <Menu.Item key={`${match.url}/example`}>
                <Link to={`${match.url}/example`}>案例管理</Link>
              </Menu.Item>

              <Menu.Item key={`${match.url}/reservation`}>
                <Link to={`${match.url}/reservation`}>预约管理</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>

        <Layout className={styles.content}>
          <Content>
            <Router>
              {location.pathname === '/home' && (
                <Redirect to={`${match.url}/example`} exact />
              )}
              <Route path={`${match.url}/example`} component={Example} exact />
              <Route
                path={`${match.url}/reservation`}
                component={Reservation}
                exact
              />
            </Router>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
