import axios from 'axios'
import { getAccessToken, getRefreshToken } from './token'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token =
      config.url !== '/auth/refresh' ? getAccessToken() : getRefreshToken()
    if (token && config.headers) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
