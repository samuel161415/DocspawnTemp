import * as XLSX from 'xlsx'

export default async function xlsxToJSON(file) {
  try {
    const blobUrl = URL.createObjectURL(file)

    const response = await fetch(blobUrl)
    const data = await response.arrayBuffer()

    // Revoke the Blob URL to free up memory
    URL.revokeObjectURL(blobUrl)

    // Parse Excel file using xlsx
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    // Assuming the first row in the Excel sheet contains headers
    const [headers, ...dataRows] = jsonData

    // Map data rows to objects with keys based on headers
    const formattedData = dataRows.map((row) => {
      const rowData = {}
      headers.forEach((header, index) => {
        rowData[header] = row[index] !== undefined ? row[index] : ''
      })
      return rowData
    })

    return formattedData
  }
  catch (error) {
    console.error('Error fetching or processing file:', error)
    throw error
  }
}

// import * as XLSX from 'xlsx'

// export default async function xlsxToJSON(file) {
//   try {
//     // Convert ArrayBuffer to Uint8Array
//     // const uint8Array = new Uint8Array(data)
//     const dataF = await file.arrayBuffer()
//     const uint8Array = new Uint8Array(dataF)

//     // Attempt to read the workbook
//     const workbook = XLSX.read(uint8Array, { type: 'array' })

//     // Check if the workbook contains any sheets
//     if (!workbook.SheetNames || workbook.SheetNames.length === 0)
//       throw new Error('No sheets found in the workbook.')

//     // Get the first sheet name and the worksheet
//     const firstSheetName = workbook.SheetNames[0]
//     const worksheet = workbook.Sheets[firstSheetName]

//     // Convert the worksheet to JSON
//     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

//     // Check if the JSON data contains any rows
//     if (!jsonData || jsonData.length === 0)
//       throw new Error('No data found in the worksheet.')

//     // Assuming the first row in the Excel sheet contains headers
//     const [headers, ...dataRows] = jsonData

//     // Check if headers are present
//     if (!headers || headers.length === 0)
//       throw new Error('No headers found in the first row of the worksheet.')

//     // Map data rows to objects with keys based on headers
//     const formattedData = dataRows.map((row) => {
//       const rowData = {}
//       headers.forEach((header, index) => {
//         rowData[header] = row[index] !== undefined ? row[index] : ''
//       })
//       return rowData
//     })
//     return formattedData
//     // Add auto_index_by_docspawn to each row
//   }
//   catch (error) {
//     // Handle any errors that occurred during the process
//     console.error('An error occurred while processing the Excel file:', error.message)
//     // Optionally, you could set an error state or display a user-friendly message
//     // errorState.value = 'An error occurred while processing the Excel file.';
//   }
// }
