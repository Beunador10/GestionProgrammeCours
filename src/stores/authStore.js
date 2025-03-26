import { defineStore } from 'pinia'
import { ref } from 'vue'
import httpClient from '@/services/httpClient'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isLoggedIn = ref(false)

  const login = async (credentials) => {
    try {
      const response = await httpClient.post('/api/login', credentials)
      user.value = response.data.user
      token.value = response.data.token
      isLoggedIn.value = true
      localStorage.setItem('auth', JSON.stringify({ user: user.value, token: token.value }))
      router.push('/emploi-du-temps')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("L'email ou le mot de passe est incorrect.")
      }
      else if (error.response.status === 500){
        throw new Error("Une erreur interne est survenue. Veuillez réessayer plus tard.")
      }
      throw Error("Une erreur interne est survenue. Veuillez réessayer plus tard.")
    }
  }

  const register = async (userData, isAdmin = false) => {
    try {
      const endpoint = isAdmin
        ? '/api/register/administrator'
        : '/api/register/professor'
      const response = await httpClient.post(endpoint, userData)
      user.value = response.data.data
      isLoggedIn.value = true
      localStorage.setItem('auth', JSON.stringify({ user: user.value, token: token.value }))
      router.push('/emploi-du-temps')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    isLoggedIn.value = false
    localStorage.removeItem('auth')
    router.push('/connexion')
  }

  const initialize = () => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      user.value = authData.user
      token.value = authData.token
      isLoggedIn.value = true
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    login,
    register,
    logout,
    initialize
  }
})
