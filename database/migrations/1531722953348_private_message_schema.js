'use strict'

const Schema = use('Schema')

class PrivateMessageSchema extends Schema {
  up () {
    this.create('private_messages', (table) => {
      table.increments()
      table.integer('sender_id').unsigned().references('id').inTable('users')
      table.integer('receiver_id').unsigned().references('id').inTable('users')
      table.json('messages')
      table.timestamps()
    })
  }

  down () {
    this.drop('private_messages')
  }
}

module.exports = PrivateMessageSchema
