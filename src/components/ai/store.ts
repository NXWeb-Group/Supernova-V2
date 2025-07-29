import { reactive } from 'vue'
import { actions } from 'astro:actions'

interface Room {
  roomid: string
  name: string
}

export const items = reactive({
  selectedRoom: null as string | null,
  rooms: [] as { roomid: string; name: string }[],
  chats: [] as { role: string; content: string }[],
  isSending: false as string | boolean,
})

export async function selectRoom(roomid: string | null) {
  if (!items.isSending) {
    if (roomid) {
      if (!actions?.aiActions) {
        throw new Error('AI actions not available');
      }
      const response = await actions.aiActions.getChats({ roomid })
      items.chats = response.data
      items.selectedRoom = roomid
    } else {
      items.selectedRoom = null
      items.chats = []
    }
  }
}

export async function removeRoom(roomid: string) {
  if (roomid === items.selectedRoom) selectRoom(null)
  const foundRooms = items.rooms.filter((room: Room) => room.roomid !== roomid)
  items.rooms = foundRooms
}
