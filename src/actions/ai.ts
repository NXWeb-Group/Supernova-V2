import { defineAction, ActionError } from 'astro:actions'
import { client, storeInDB } from '../lib/ai'
import { getRoom, renameRoom, deleteRoom } from '../lib/account'

export const aiActions = {
  ask: defineAction({
    handler: async (input, context) => {
      try {
        if (input.text.length > 2000) {
          return { error: 'Too many characters' }
        }
        let num = await context.session?.get('numchat')
        if (!num) {
          context.session?.set('numchat', 1)
          num = 1
        } else if (num >= Number(process.env.MAX_CHATS)) {
          return { error: 'Max chats reached' }
        } else {
          num++
          context.session?.set('numchat', num)
        }

        const chatBackend = [
          {
            role: 'developer',
            content: 'Markdown optional',
          },
        ]
        const userid = await context.session?.get('userid')
        if (userid && input.roomid) {
          const room = await getRoom(userid, input.roomid)
          if (room) {
            const chatsToAdd = room.rooms[0].chats.slice(-6)
            chatsToAdd.forEach((idk: { role: string; content: string }) => {
              chatBackend.push(idk)
            })
          }
        }
        chatBackend.push({
          role: 'user',
          content: input.text,
        })

        const completion = await client.chat.completions.create({
          // @ts-ignore
          messages: chatBackend,
          model: String(process.env.AI_MODEL),
          max_completion_tokens: 5000,
        })
        console.log(completion.choices[0])

        const chat = [{ role: 'user', content: input.text }]

        chat.push({
          role: 'assistant',
          content: completion.choices[0].message.content || '',
        })
        let roomid = null
        if (userid) {
          const id = await storeInDB(userid, input.roomid, chat)
          if (id) {
            roomid = id.toString()
          }
        }
        return {
          message: completion.choices[0].message.content,
          roomid: roomid,
          error: false,
          chats: num,
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
  getChats: defineAction({
    handler: async (input, context) => {
      try {
        const userid = await context.session?.get('userid')
        const accountData = await getRoom(userid, input.roomid)
        if (accountData) {
          return accountData.rooms[0].chats
        } else {
          return { error: 'Account data not found' }
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
  renameRoom: defineAction({
    handler: async (input, context) => {
      try {
        const userid = await context.session?.get('userid')
        await renameRoom(userid, input.roomid, input.roomname)
        return 'success'
      } catch (error) {
        console.warn(error)
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        })
      }
    },
  }),
  deleteRoom: defineAction({
    handler: async (input, context) => {
      try {
        const userid = await context.session?.get('userid')
        await deleteRoom(userid, input.roomid)
        return 'success'
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
