'use strict'

const Helpers = use('Helpers')
const File = use('App/Models/File')

class FileController {
  async store({request}) {
    const file = request.file('file', {
      types: [
        'image', 'video', 'audio'
      ],
      size: '100mb'
    })

    await file.move(Helpers.tmpPath('../uploads'), {
      name: `${new Date().getTime()}.${file.subtype}`
    })

    const newFile = new File()
    newFile.path = 'uploads/' + file.fileName
    newFile.type = file.subtype

    await newFile.save()

    if (!file.moved()) {
      return file.error()
    }
    return 'File moved'
  }
}

module.exports = FileController
