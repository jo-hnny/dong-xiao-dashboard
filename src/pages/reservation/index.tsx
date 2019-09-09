import React from 'react'
import Api from '../../api'
import { IReservations } from '../../types'
import { Table } from 'antd'
import dayjs from 'dayjs'

interface IState {
  reservations: IReservations[]

  count: number

  page: number
}

export default class extends React.Component<any, IState> {
  state: IState = {
    reservations: [],

    count: 0,

    page: 1
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

  getReservations = async (page = 1) => {
    const { list, count } = await Api.getReservations(page)

    this.setState({ reservations: list, count, page })
  }

  render() {
    const { reservations, count, page } = this.state
    return (
      <Table
        columns={this.columns}
        dataSource={reservations}
        pagination={{
          current: page,
          defaultPageSize: 20,
          total: count,
          onChange: this.getReservations
        }}
        rowKey="id"
      />
    )
  }
}
