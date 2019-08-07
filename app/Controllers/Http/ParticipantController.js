'use strict'
const Participant = use('App/Models/Participant')

class ParticipantController {
  async store ({ request }) {
    const { room_id, user_id } = request.all()
    const participant = new Participant()
    participant.room_id = room_id
    participant.user_id = user_id

    const participantS = await participant.save()

    return participantS
  }
}

module.exports = ParticipantController
