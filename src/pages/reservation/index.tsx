import React from 'react'
import Api from '../../api'
import { IReservations } from '../../types'
import { Table } from 'antd'
import dayjs from 'dayjs'

interface IState {
  reservations: IReservations[]
}

export default class extends React.Component<any, IState> {
  state: IState = {
    reservations: []
  }

  columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },

    {
      title: '电话',
      dataIndex: 'number',
      key: 'number'
    },

    {
      title: '需求描述',
      dataIndex: 'desc'
    },

    {
      title: '提交时间',
      dataIndex: 'created_at',
      render(text: string) {
        return dayjs.unix(parseInt(text)).format('YYYY-MM-DD HH:mm')
      }
    }
  ]

  componentDidMount() {
    this.getReservations()
  }

  getReservations = async () => {
    const { list } = await Api.getReservations()

    this.setState({ reservations: list })
  }

  render() {
    const { reservations } = this.state
    return (
      <Table columns={this.columns} dataSource={reservations} rowKey="id" />
    )
  }
}
