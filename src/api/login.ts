import { post, get } from './http'
import { IUser } from '../types'

export const login = (user: IUser) => post('/user/login', user)

export const logout = () => get('/user/logout')
