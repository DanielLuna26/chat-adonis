'use strict'

const Model = use('Model')

class Room extends Model {
  participants() {
    return this.hasMany('App/Models/Participant').pivotModel('App/Models/Participant')
  }

  users() {
    return this.belongsToMany('App/Models/User').pivotModel('App/Models/Participant')
  }
  static get hidden () {
    return ['created_at', 'updated_at']
  }
}

module.exports = Room
