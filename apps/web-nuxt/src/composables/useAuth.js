import { ref } from 'vue'

const user = ref(JSON.parse(localStorage.getItem('user')) || null)
const token = ref(localStorage.getItem('token') || null)

export function useAuth() {
  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const setToken = (accessToken) => {
    token.value = accessToken
    localStorage.setItem('token', accessToken)
  }

  return {
    user,
    token,
    setUser,
    setToken,
    fetchUserDetails,
  }
}
