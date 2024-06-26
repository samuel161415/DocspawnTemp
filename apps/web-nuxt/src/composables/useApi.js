// // composables/useApi.js
// import { ref } from 'vue'
// import axiosInstance from '@/plugins/axios'

// export function useApi() {
//   const data = ref(null)
//   const error = ref(null)
//   const loading = ref(false)

//   const getData = async (url) => {
//     loading.value = true
//     try {
//       const response = await axiosInstance.get(url)
//       data.value = response.data
//     }
//     catch (err) {
//       error.value = err
//     }
//     finally {
//       loading.value = false
//     }
//   }

//   const postData = async (url, payload) => {
//     loading.value = true
//     try {
//       const response = await axiosInstance.post(url, payload)
//       data.value = response.data
//     }
//     catch (err) {
//       error.value = err
//     }
//     finally {
//       loading.value = false
//     }
//   }

//   const putData = async (url, payload) => {
//     loading.value = true
//     try {
//       const response = await axiosInstance.put(url, payload)
//       data.value = response.data
//     }
//     catch (err) {
//       error.value = err
//     }
//     finally {
//       loading.value = false
//     }
//   }

//   const deleteData = async (url) => {
//     loading.value = true
//     try {
//       const response = await axiosInstance.delete(url)
//       data.value = response.data
//     }
//     catch (err) {
//       error.value = err
//     }
//     finally {
//       loading.value = false
//     }
//   }

//   return {
//     data,
//     error,
//     loading,
//     getData,
//     postData,
//     putData,
//     deleteData,
//   }
// }

// // example of usimng these in any component

// // <template>
// //   <div>
// //     <button @click="loadData">Load Data (GET)</button>
// //     <button @click="createData">Create Data (POST)</button>
// //     <button @click="updateData">Update Data (PUT)</button>
// //     <button @click="removeData">Delete Data (DELETE)</button>
// //     <div v-if="loading">Loading...</div>
// //     <div v-if="error">{{ error.message }}</div>
// //     <div v-if="data">{{ data }}</div>
// //   </div>
// // </template>

// // <script setup>
// // import { useApi } from '@/composables/useApi'

// // const { data, error, loading, getData, postData, putData, deleteData } = useApi()

// // const loadData = () => {
// //   getData('/resource')
// // }

// // const createData = () => {
// //   const payload = { key: 'value' }
// //   postData('/resource', payload)
// // }

// // const updateData = () => {
// //   const payload = { key: 'updated value' }
// //   putData('/resource/1', payload) // Assuming 1 is the ID of the resource to update
// // }

// // const removeData = () => {
// //   deleteData('/resource/1') // Assuming 1 is the ID of the resource to delete
// // }
// // </script>
