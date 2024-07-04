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

    return data.url // Assuming the response contains the S3 URL
  }
  catch (error) {
    console.error('Error:', error)

    toast.error('Unable to continue at the moment!')
    return null
  }
}
