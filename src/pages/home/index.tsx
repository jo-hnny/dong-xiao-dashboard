import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
import styles from './index.module.scss'
import { Link, HashRouter as Router, Route } from 'react-router-dom'
import Example from '../example'
import Reservation from '../reservation'
import Api from '../../api'

const { Header, Content, Sider } = Layout

export default class extends React.Component<any> {
  logout = async () => {
    await Api.logout()
    this.props.history.replace('login')
  }

  render() {
    const { match } = this.props
    return (
      <Layout className={styles.home}>
        <Header className={styles.header}>
          <Button onClick={this.logout}>退出</Button>
        </Header>

        <Layout className={styles.sidebar}>
          <Sider>
            <Menu theme="dark">
              <Menu.Item>
                <Link to={`${match.url}/example`}>案例管理</Link>
              </Menu.Item>

              <Menu.Item>
                <Link to={`${match.url}/reservation`}>预约管理</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>

        <Layout className={styles.content}>
          <Content>
            <Router>
              <Route path={`${match.url}/example`} component={Example} />
              <Route
                path={`${match.url}/reservation`}
                component={Reservation}
              />
            </Router>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
