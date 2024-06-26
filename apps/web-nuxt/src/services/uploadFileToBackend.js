export default async function uploadFileToBackend(file, isJSON) {
  if (!file)
    return

  const formData = new FormData()
  if (isJSON)
    formData.append('files', new Blob([file], { type: 'application/json' }), 'data.json')
  else
    formData.append('files', file)

  try {
    const response = await fetch('https://beta.docspawn.app/api/v1/files/upload/s3', {
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
    // Assuming setIsLoading and toast are defined elsewhere in your application
    setIsLoading(false)
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
