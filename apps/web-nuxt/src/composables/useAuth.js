import { ref } from 'vue'

const user = ref(null)
const token = ref(null)

export function useAuth() {
  const setUser = (userData) => {
    user.value = userData
  }

  const setToken = (accessToken) => {
    token.value = accessToken
  }

  const fetchUserDetails = async () => {
    if (!token.value)
      return

    try {
      const response = await fetch('https://api.outseta.com/v1/user', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (!response.ok)
        throw new Error('Failed to fetch user details')

      const data = await response.json()
      setUser(data)
    }
    catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  return {
    user,
    token,
    setUser,
    setToken,
    fetchUserDetails,
  }
}
