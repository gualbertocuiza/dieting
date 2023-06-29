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
      loading.value = false
      setAuthUser(data)
    } catch (err: any) {
      loading.value = false
      hasError.value = true
      if (err.response) {
        errorMessage.value = err.response.data.error[0].msg
      }
    }
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
