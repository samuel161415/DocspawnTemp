export default async function uploadFileToBackend(file, isJSON) {
  const runtimeConfig = useRuntimeConfig()

  // console.log('runtimeConfig.public.BASE_URL', runtimeConfig.public.BASE_URL)
  if (!file)
    return

  const formData = new FormData()
  if (isJSON)
    formData.append('files', new Blob([file], { type: 'application/json' }), 'data.json')
  else
    formData.append('files', file)
  // 'https://beta.docspawn.app/api/v1/files/upload/s3'
  // `${runtimeConfig.public.BASE_URL}/files/upload/s3`
  // `http://localhost:5000/api/v1/files/upload/s3`

  // console.log('api', `${runtimeConfig.public.BASE_URL}/files/upload/s3`)
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

// import axios from 'axios'

// export default async function uploadFileToBackend(file, isJSON) {
//   if (!file)
//     return
//   const formData = new FormData()
//   isJSON
//     ? formData.append(
//       'files',
//       new Blob([file], { type: 'application/json' }),
//       'data.json',
//     )
//     : formData.append('files', file)

//   try {
//     // http://localhost:5000/api/v1/files/upload/s3
//     const response = await axios.post('https://beta.docspawn.app/api/v1/files/upload/s3', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })

//     return response.data.url // Assuming the response contains the S3 URL
//   }
//   catch (error) {
//     // console.error(error);
//     setIsLoading(false)
//     toast.error('unable to cntinue at the moment!')
//     return null
//   }
// }
