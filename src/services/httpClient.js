import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  //baseURL: 'https://gestionapiaql-7bc221e2dc4b.herokuapp.com',
  //baseURL: 'https://apijojo-a0ced7714bf0.herokuapp.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

httpClient.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

export default httpClient
