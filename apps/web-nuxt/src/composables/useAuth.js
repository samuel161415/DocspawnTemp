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
        //   'x-api-key': config.public.OUTSETA_API_KEY,
        },
      })

      if (!response.ok)
        throw new Error('Failed to fetch user details')

      const data = await response.json()
      console.log(' data at use auth >>>>>', data)
    //   setUser(data)
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
