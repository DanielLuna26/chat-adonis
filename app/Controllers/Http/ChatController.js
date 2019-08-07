'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const PM = use('App/Models/PrivateMessage')
const Helpers = use('Helpers')

class ChatController {
  async store({request, auth}) {
    const { sender_id, receiver_id } = await request.all()
    const chatData = {
      sender_id: sender_id,
      receiver_id: receiver_id,
      messages: JSON.stringify([])
    }
    return await PM.create(chatData)
  }

  async userprivate({request, params, auth}) {
    const currentUser = await auth.getUser()
    const id = currentUser.id
    const user = await PM.query().whereRaw('sender_id = ? and receiver_id = ?', [id, params.id])
    if (user[0]) {
      return user[0]
    } else {
      const user = await PM.query().whereRaw('sender_id = ? and receiver_id = ?', [params.id, id])
      if (user[0]) {
        return user[0]
      } else {
        const data = {
          receiver_id: params.id,
          sender_id: id,
          messages: JSON.stringify([])
        }
        return PM.create(data)
      }
    }
  }

  async addPrivateMessage({ request, auth, params, response }) {
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

    const currentUser = await auth.getUser()
    const id = currentUser.id
    const pm = await PM.query().whereRaw('sender_id = ? and receiver_id = ?', [id, params.id])
    if (pm[0]) {
      const privateM = await PM.find(pm[0].id)
      const newMessages = privateM.messages
      newMessages.push(dataMessage)
      privateM.messages = JSON.stringify(newMessages)
      await privateM.save()
      return response.json(dataMessage)
    } else {
      const pm = await PM.query().whereRaw('sender_id = ? and receiver_id = ?', [params.id, id])
      if (pm[0]) {
        const privateM = await PM.find(pm[0].id)
        const newMessages = privateM.messages
        newMessages.push(dataMessage)
        privateM.messages = JSON.stringify(newMessages)
        await privateM.save()
        return response.json(dataMessage)
      }
    }
  }
}

module.exports = ChatController
