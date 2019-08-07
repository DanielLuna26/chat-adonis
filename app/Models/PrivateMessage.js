'use strict'

const Model = use('Model')

class PrivateMessage extends Model {
  users() {
    return this.belongsTo('App/Models/User')
  }

  static get hidden () {
    return ['created_at', 'updated_at']
  }
}

module.exports = PrivateMessage
