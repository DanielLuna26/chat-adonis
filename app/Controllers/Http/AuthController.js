'use strict'

const User = use('App/Models/User')

class AuthController {
  async signUp ({ request, response }) {
    const { email, username, password } = await request.all()

    const user = new User()
    user.username = username
    user.email = email
    user.password = password
    user.status = false

    return user.save()
  }

  async signIn ({ request, response, auth }) {
    const { email, password } = request.all()

    return await auth.withRefreshToken().attempt(email, password)
  }

  async currentUser ({ response, auth }) {
    return auth.getUser()
  }
}

module.exports = AuthController
