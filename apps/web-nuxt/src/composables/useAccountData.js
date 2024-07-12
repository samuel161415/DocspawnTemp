import { reactive } from 'vue'

// Define initial values for each reactive object
const initialAccountData = {
  accountType: '',
}

// Create reactive objects
export const accountData = reactive({ ...initialAccountData })
// Function to reset all values to their initial state
export function resetAllAccountData() {
  Object.assign(accountData, { ...initialAccountData })
}
