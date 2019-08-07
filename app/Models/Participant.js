'use strict'

const Model = use('Model')

class Participant extends Model {
  users() {
    return this.belongsToMany('App/Models/User')
  }

  rooms() {
    return this.belongsToMany('App/Models/Room')
  }
}

module.exports = Participant
