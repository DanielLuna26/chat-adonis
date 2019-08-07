'use strict'

const User = use('App/Models/User')
const Room = use('App/Models/Room')

class UserController {
  async index({ auth }) {
    const currentUser = await auth.getUser()
    const id = currentUser.id
    const users = await User.query().whereRaw('id != ?', [id])

    return users
  }

  async show({ params }) {
    const user = await User.find(params.id)
    return user
  }

  async roomusers({ params }) {
    const groups = await Room.find(params.id)
    const users = await groups.users().fetch()

    return users
  }
}

module.exports = UserController
