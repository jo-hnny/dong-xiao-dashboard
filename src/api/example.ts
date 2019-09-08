import { get, post } from './http'
import { IExample } from '../types'

export const getExamples = (page = 1): Promise<any> =>
  post('/established-case/list', { page })

export const updateExample = (example: IExample) =>
  post('established-case/update', example)
