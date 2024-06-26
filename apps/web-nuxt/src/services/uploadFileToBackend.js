import axios from 'axios'

export default async function uploadFileToBackend(file, isJSON) {
  if (!file)
    return
  const formData = new FormData()
  isJSON
    ? formData.append(
      'files',
      new Blob([file], { type: 'application/json' }),
      'data.json',
    )
    : formData.append('files', file)

  try {
    // http://localhost:5000/api/v1/files/upload/s3
    const response = await axios.post('https://beta.docspawn.app/api/v1/files/upload/s3', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data.url // Assuming the response contains the S3 URL
  }
  catch (error) {
    // console.error(error);
    setIsLoading(false)
    toast.error('unable to cntinue at the moment!')
    return null
  }
}
