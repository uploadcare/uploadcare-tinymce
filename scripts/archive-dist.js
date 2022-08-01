const archiver = require('archiver')
const fs = require('fs')

function createZipArchive(source) {
  const output = fs.createWriteStream(`${source}.zip`)
  const archive = archiver('zip')

  output.on('close', () => console.log('Done'))
  archive.on('warning', err => console.error(err))

  archive.pipe(output)
  archive.directory(`${source}/`, false)
  archive.finalize()
}

function createTarArchive(source) {
  const output = fs.createWriteStream(`${source}.tar.gz`)
  const archive = archiver('tar')

  output.on('close', () => console.log('Done'))
  archive.on('warning', err => console.error(err))

  archive.pipe(output)
  archive.directory(`${source}/`, false)
  archive.finalize()
}

const sources = [
  'dist/uploadcare.tinymce',
  'dist/uploadcare.tinymce@6.x',
]

for (const source of sources) {
  createTarArchive(source)
  createZipArchive(source)
}
