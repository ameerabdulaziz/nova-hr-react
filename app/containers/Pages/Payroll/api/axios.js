import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ServerURL } from './ServerConfig'
import ErrorMessages from '../../Payroll/api/ApiMessages'
import SITEMAP from '../../../App/routes/sitemap'

const axiosInstance = axios.create({
  baseURL: ServerURL,
  // baseURL: `http://92.205.178.113:85/,
  headers: {
    Authorization: localStorage.getItem('Token')
      ? 'Bearer ' + localStorage.getItem('Token')
      : null,
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

      const nextUrl = window.location.pathname;

      if (SITEMAP.auth.Login.route === nextUrl) {
        window.location.href = nextUrl;
      } else {
        window.location.href = `${SITEMAP.auth.Login.route}?redirectTo=${nextUrl}`
      }

      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + 'token/refresh/'
    ) {
      window.location.href = SITEMAP.auth.Login.route
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
          window.location.href = SITEMAP.auth.Login.route
        }
      } else {
        window.location.href = SITEMAP.auth.Login.route
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  },
)

export default axiosInstance
