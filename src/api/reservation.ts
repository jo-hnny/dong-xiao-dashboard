import { post } from './http'

export const getReservations = (page = 1) =>
  post('/appointment/list', { page }) as any
