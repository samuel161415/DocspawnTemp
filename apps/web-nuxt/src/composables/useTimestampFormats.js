import { ref } from 'vue'

export function useTimestampFormats() {
  const timeFormats = ref([
    { name: 'HH:MM:SS XM' },
    { name: 'HH:MM:SS' },
    { name: 'HH:MM XM' },
    { name: 'HH:MM' },
    { name: 'HH:SS' },
    { name: 'MM:SS' },
  ])
  const dateFormats = ref([
    { name: 'MM/DD/YYYY' },
    { name: 'MM-DD-YYYY' },
    { name: 'MM-DD-YY' },
    { name: 'DD-MM-YY' },
  ])

  return { timeFormats, dateFormats }
}
