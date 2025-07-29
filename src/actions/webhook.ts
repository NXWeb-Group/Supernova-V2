import { defineAction, ActionError } from 'astro:actions'
import fetch from 'node-fetch'

export const webhook = {
  report: defineAction({
    handler: async (input, context) => {
      try {
        if (input.text.length > 1000) {
          return { error: 'Too many characters' }
        }
        const response = await fetch(String(process.env.WEBHOOK), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: input.text }),
        })
        const data = await response
        return {
          status: 'success',
          message: 'Report succeded',
        }
      } catch (error) {
        console.warn(error)
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        })
      }
    },
  }),
}
