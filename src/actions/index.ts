import { accountActions } from './account'
import { aiActions } from './ai'
import { webhook } from './webhook'

export const server = {
  ...(process.env.AI === 'true' ? { aiActions,accountActions } : {}),
  ...(process.env.REPORT === 'true' ? { webhook } : {})
}
