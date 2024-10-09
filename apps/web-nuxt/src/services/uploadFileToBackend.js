import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
export default async function uploadFileToBackend(file, isJSON) {
  const runtimeConfig = useRuntimeConfig()

  if (!file)
    return

  const formData = new FormData()
  if (isJSON)
    formData.append('files', new Blob([file], { type: 'application/json' }), 'data.json')
  else
    formData.append('files', file)

  try {
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/files/upload/s3`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    const data = await response.json()

    // return data.url // Assuming the response contains the S3 URL
    const fileUrl = data.url // Assuming the response contains the S3 URL

    // Check if the file is an image
    // console.log('user', user)
    // console.log('file.type', file.type)

    if (file.type.startsWith('image/')) {
      // Create a new image element
      fetch(`${runtimeConfig.public.BASE_URL}/library-image/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Make sure to specify the content type
        },
        body: JSON.stringify({
          account_type: user.value?.email,
          image_url: fileUrl,
        }),
      })
    }

    return fileUrl
  }
  catch (error) {
    console.error('Error:', error)

    toast.error('Unable to continue at the moment!')
    return null
  }
}
