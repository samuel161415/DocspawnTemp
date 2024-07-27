import { ref } from 'vue'

export function useTextFormattingOptions() {
  const fonts = ref([
    { label: 'Arial', value: 'Arial' },
    { label: 'Verdana', value: 'verdana' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    // { label: 'Helvetica', value: 'Helvetica' },
    // { label: 'Courier New', value: 'Courier New' },
    // { label: 'Georgia', value: 'Georgia' },
    // { label: 'Comic Sans MS', value: 'Comic Sans MS' },

  ])
  const fontSizes = ref([
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '14', value: 14 },
    { label: '16', value: 16 },
    { label: '20', value: 20 },
    { label: '24', value: 24 },
    { label: '28', value: 28 },
    { label: '32', value: 32 },
    { label: '36', value: 36 },
    { label: '40', value: 40 },
    { label: '44', value: 44 },
    { label: '48', value: 48 },
    { label: '52', value: 52 },
    { label: '56', value: 56 },
    { label: '60', value: 60 },
    { label: '64', value: 64 },
    { label: '68', value: 68 },
    { label: '72', value: 72 },
    { label: '84', value: 84 },
    { label: '96', value: 96 },

  ])

  return { fonts, fontSizes }
}
