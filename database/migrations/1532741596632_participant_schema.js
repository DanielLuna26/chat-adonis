'use strict'

const Schema = use('Schema')

class ParticipantSchema extends Schema {
  up () {
    this.create('participants', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('room_id').unsigned().references('id').inTable('rooms')
      table.timestamps()
    })
  }

  down () {
    this.drop('participants')
  }
}

module.exports = ParticipantSchema
