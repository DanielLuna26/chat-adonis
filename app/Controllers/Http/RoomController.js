'use strict'

const User = use('App/Models/User')
const Room = use('App/Models/Room')
const Helpers = use('Helpers')

class RoomController {

  async index({ request }) {
    const rooms = await Room.all()
    return rooms
  }

  async show({ request, params }) {
    const room = await Room.find(params.id)
    return room
  }

  async store ({ request }) {
    const {name, type} = await request.all()

    const roomData = {
      name: name,
      type: type,
      messages: JSON.stringify([])
    }

    const room = await Room.create(roomData)
    return room
  }

  async addParticipant ({ request }) {
    const {room_id, user_id} = request.all()
    const participant = new Participant()
    participant.room_id = room_id
    participant.user_id = user_id

    const participantS = await participant.save()

    return participantS
  }

  async userroom({ params, auth }) {
    const currentUser = await auth.getUser()
    const user = await User.find(currentUser.id)
    const rooms = await user.rooms().fetch()
    return rooms
  }

  async addMessage({ request, params, response }) {
    const file = request.file('file', {
      types: [
        'image', 'video', 'audio'
      ],
      size: '100mb'
    })
    const { message } = await request.all()
    let dataMessage = {}
    const messageParse = JSON.parse(message)
    if (file) {
      await file.move(Helpers.publicPath('src'), {
        name: `${new Date().getTime()}.${file.subtype}`
      })
      if (messageParse) {
        dataMessage = {
          user_id: messageParse.user_id,
          username: messageParse.username,
          body: messageParse.body,
          file: 'src/' + file.fileName,
          type: file.type
        }
      } else {
        dataMessage = {
          user_id: null,
          username: null,
          body: null,
          file: 'src/' + file.fileName,
          type: file.type
        }
      }
    } else {
      dataMessage = {
        user_id: messageParse.user_id,
        username: messageParse.username,
        body: messageParse.body,
        file: null,
        type: null
      }
    }
    const room = await Room.find(params.id)
    const messages = room.messages
    messages.push(dataMessage)
    room.messages = JSON.stringify(messages)
    await room.save()
    return response.json(dataMessage)
  }
}

module.exports = RoomController
