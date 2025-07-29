import { defineAction, ActionError } from 'astro:actions'
import bcrypt from 'bcrypt'
import { account as dbAccount } from '../lib/db'
import { signupValidate, getAccountByUser } from '../lib/account'

export const accountActions = {
  logout: defineAction({
    handler: async (input, context) => {
      try {
        context.session?.set('userid', undefined)
        return {
          status: 'success',
          message: input.idk,
        }
      } catch (error) {
        console.warn(error)
        return {
          status: 'error',
          message: 'Logout failed',
        }
      }
    },
  }),
  signup: defineAction({
    handler: async (input, context) => {
      try {
        const validate = await signupValidate(input.email, input.username, input.password)
        if (validate) {
          return { status: 'error', message: validate }
        } else {
          const hash = await bcrypt.hash(input.password, Number(process.env.SALT_ROUNDS))
          const acc = await dbAccount.insertOne({
            email: input.email,
            username: input.username,
            password: hash,
            rooms: [],
          })
          context.session?.set('userid', acc.insertedId.toString())
          return {
            status: 'successful',
          }
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
  login: defineAction({
    handler: async (input, context) => {
      try {
        const acc = await getAccountByUser(input.username)
        if (acc === 'none')
          return {
            status: 'error',
            message: 'Invalid Username or Password',
          }
        else {
          if (await bcrypt.compare(input.password, acc.password)) {
            context.session?.set('userid', acc._id.toString())
            return {
              status: 'successful',
            }
          } else
            return {
              status: 'error',
              message: 'Invalid Username or Password',
            }
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
