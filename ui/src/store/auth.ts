import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { User } from '../interfaces/User'
import axios from 'axios'

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
      const { data } = await axios.post(
        'http://localhost:3000/api/authentication',
        {
          email,
          password,
        }
      )
      const { sub } = decodeToken(data.accessToken)
      const user = await axios.get('http://localhost:3000/api/users/' + sub, {
        headers: { Authorization: data.accessToken },
      })
      loading.value = false
      setAuthUser(user.data)
    } catch (err: any) {
      loading.value = false
      hasError.value = true
      if (err.response) {
        errorMessage.value = err.response.data.error[0].msg
      }
    }
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
  }
})
