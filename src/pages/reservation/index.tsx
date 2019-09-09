import React from 'react'
import Api from '../../api'
import { IReservations } from '../../types'
import { Table } from 'antd'

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
      dataIndex: 'number'
    },

    {
      title: '需求描述',
      dataIndex: 'desc'
    },

    {
      title: '提交时间',
      dataIndex: 'created_at'
    }
  ]

  componentDidMount() {
    this.getReservations()
  }

  getReservations = async () => {
    const rsp = await Api.getReservations()

    console.log(rsp)
  }

  render() {
    const { reservations } = this.state
    return <Table columns={this.columns} dataSource={reservations} />
  }
}
