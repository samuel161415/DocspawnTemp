import { useRoute } from 'vue-router'

export function useQueryParams() {
  const route = useRoute()

  // Extract email and templateId from the query parameters
  const email = route.query.email || null
  const templateId = route.query.templateId || null

  return {
    email,
    templateId,
  }
}
