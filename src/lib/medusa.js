import Medusa from '@medusajs/js-sdk'

const medusa = new Medusa({
  baseUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:9000',
  publishableKey: process.env.REACT_APP_MEDUSA_PUBLISHABLE_KEY,
})

export default medusa
