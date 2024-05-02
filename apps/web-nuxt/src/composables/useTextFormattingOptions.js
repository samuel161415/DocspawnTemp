import { ref } from 'vue'

export function useTextFormattingOptions() {
  const fonts = ref([
    { label: 'Arial', value: 'Arial' },
    { label: 'Verdana', value: 'verdana' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Comic Sans MS', value: 'Comic Sans MS' },

  ])
  const fontSizes = ref([
    { label: '8', value: 8 },
    { label: '12', value: 12 },
    { label: '16', value: 16 },
    { label: '20', value: 20 },
    { label: '24', value: 24 },
    { label: '28', value: 28 },
    { label: '32', value: 32 },

  ])

  return { fonts, fontSizes }
}
