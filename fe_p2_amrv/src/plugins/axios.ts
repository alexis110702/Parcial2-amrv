import Axios, { type AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
})

axios.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['Content-type'] = 'application/json'
  }
  return config
})

export default axios
