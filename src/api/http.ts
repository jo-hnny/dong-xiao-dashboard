import Axios from 'axios'
import { notification } from 'antd'

const axios = Axios.create({
  baseURL: 'dashboard',
  timeout: 2000
})

axios.interceptors.request.use(config => {
  console.log('config', config)

  const { data } = config

  if (data) {
    const formdata = new FormData()

    Object.entries(data).forEach(([key, value]) =>
      formdata.append(key, value as string)
    )

    config.data = formdata
  }

  return config
})

axios.interceptors.response.use(
  ({ status, data }) => {
    console.log('status', status)
    if (status !== 200) {
      notification.error({ message: '服务器错误！' })

      return Promise.reject()
    }

    const { statusCode, message } = data

    if (statusCode !== 200) {
      notification.error({
        message
      })

      return Promise.reject()
    }

    return data.data
  },

  error => {
    notification.error({
      message: '服务器错误！'
    })

    return Promise.reject()
  }
)

export const get = (url: string): Promise<any> => axios(url)

export const post = (url: string, params: any) => axios.post(url, params)
