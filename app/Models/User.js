'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  participants() {
    return this.hasMany('App/Models/Participant')
  }

  privatemessages() {
    return this.hasMany('App/Models/PrivateMessage')
  }

  rooms() {
    return this.belongsToMany('App/Models/Room').pivotModel('App/Models/Participant')
  }

  static get hidden () {
    return ['password', 'created_at', 'updated_at']
  }
}

module.exports = User
