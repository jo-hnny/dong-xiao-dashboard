import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './index.module.scss'
import Api from '../../api'
import { IUser } from '../../types'

export default class extends React.Component<any, IUser> {
  state: IUser = {
    username: '',

    password: ''
  }

  login = async () => {
    const { username, password } = this.state
    await Api.login({ username, password })
    console.log(this.props)
    this.props.history.push('home')
  }

  handleInputChange = (
    key: keyof IUser
  ): React.ReactEventHandler<HTMLInputElement> => ({ currentTarget }) => {
    this.setState({ [key]: currentTarget.value } as any)
  }

  render() {
    return (
      <div className={styles.login}>
        <Form className={styles.form}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
              onChange={this.handleInputChange('username')}
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              onChange={this.handleInputChange('password')}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submit}
              onClick={this.login}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
