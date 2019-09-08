import { post } from './http'

export const getReservations = (page = 1) =>
  post('/order/list', { page }) as any
