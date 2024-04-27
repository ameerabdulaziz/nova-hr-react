import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ServerURL } from './ServerConfig'
import ErrorMessages from '../../Payroll/api/ApiMessages'

const axiosInstance = axios.create({
  baseURL: ServerURL,
  // baseURL: `http://92.205.178.113:85/,
  headers: {
    Authorization: localStorage.getItem('Token')
      ? 'Bearer ' + localStorage.getItem('Token')
      : null, //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImNlZWU1YWJjLTdlODYtNDZmZS04NmY3LTQ0MzFmYTk4OWU4YiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNGMyMDA3ODAtMDk1MS00NDA3LWFmZTAtNTgyMTgzNzZiNzE2IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiSnVsIFdlZCAxOSAyMDIzIDEzOjEyOjIzIFBNIiwibmJmIjoxNjg5Njg1OTQzLCJleHAiOjE2ODk3OTc1NDMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTExNiIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTExNiJ9.SwCPkzxvustLy9hfdlIcnBzKCww_9CWZWXTLRDcgy4E
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('Token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  config.headers.ContentType = 'application/json'
  return config
})
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    debugger
    const originalRequest = error.config
    if (typeof error.response === 'undefined') {
      toast.error(
        'A server/network error occurred. ' +
          'Looks like CORS might be the problem. ' +
          'Sorry about this - we will get it fixed shortly.',
      )
      return Promise.reject(error)
    }
    if (error.response.status === 500) {
      if (error.response.data.title) toast.error(error.response.data.title)
      else if (error.response.data)
        toast.error(JSON.parse(error.response.data).message)
      else toast.error('Internal Server Error')

      return Promise.reject(error)
    }
    if (error.response.status === 400) {
      if (error.response.data.title) toast.error(error.response.data.title)
      else if (error.response.data.error) toast.error(error.response.data.error)
      else if (error.response.data) {
        if (!Object.keys(ErrorMessages).includes(error.response.data)) {
          /* if (typeof error.response.data !== 'object') { */
            toast.error(error.response.data)
          /* } */
        }
      } else toast.error('Internal Server Error')

      return Promise.reject(error)
    }
    if (error.response.status === 404) {
      if (error.response.data.title) toast.error(error.response.data.title)
      else if (error.response.data)
        toast.error(JSON.stringify(error.response.data))
      else toast.error('Internal Server Error')

      return Promise.reject(error)
    }

    if (error.response.status === 401) {
      if (error.response.data.title) toast.error(error.response.data.title)
      else toast.error('Unauthorized')
      localStorage.removeItem('Token')

      window.location.href = '/login?redirectTo=' + window.location.pathname

      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + 'token/refresh/'
    ) {
      window.location.href = '/login/'
      return Promise.reject(error)
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token')

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000)

        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/token/refresh/', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem('access_token', response.data.access)
              localStorage.setItem('refresh_token', response.data.refresh)

              axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + response.data.access
              originalRequest.headers['Authorization'] =
                'JWT ' + response.data.access

              return axiosInstance(originalRequest)
            })
            .catch((err) => {
              // console.log(err);
            })
        } else {
          window.location.href = '/login/'
        }
      } else {
        window.location.href = '/login/'
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  },
)

export default axiosInstance
