import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { User } from '../interfaces/User'
import api from '../utils/axios'
import { getAccessToken } from '../utils/token'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const auth = reactive<User>({
    id: 1,
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
  })
  const loading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref<string>('')

  const authenticated = computed(() => {
    return !!auth.first_name
  })

  const setAuthUser = (user: User) => {
    Object.assign(auth, user)
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const { data } = await api.post('/authentication', {
        email,
        password,
      })
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      getAuthUser()
    } catch (err: any) {
      loading.value = false
      hasError.value = true
      if (err.response) {
        errorMessage.value = err.response.data.error[0].msg
      }
      errorMessage.value = 'Something went wrong, please try again latter!'
    }
  }

  const getAuthUser = async () => {
    const accessToken = getAccessToken()
    if (!accessToken) return
    const { sub } = decodeToken(accessToken ?? '')
    const user = await api.get('/users/' + sub)
    console.log('user ', user)
    setAuthUser(user.data)
    loading.value = false
    router.push('/')
  }

  const decodeToken = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  return {
    authenticated,
    auth,
    login,
    loading,
    hasError,
    errorMessage,
    setAuthUser,
    getAuthUser,
  }
})
