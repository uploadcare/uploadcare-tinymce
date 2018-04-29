const archiver = require('archiver')
const fs = require('fs')

function createZipArchive() {
  const output = fs.createWriteStream('dist/uploadcare.tinymce.zip')
  const archive = archiver('zip')

  output.on('close', () => console.log('Done'))
  archive.on('warning', err => console.error(err))

  archive.pipe(output)
  archive.directory('dist/uploadcare.tinymce/', false)
  archive.finalize()
}

function createTarArchive() {
  const output = fs.createWriteStream('dist/uploadcare.tinymce.tar.gz')
  const archive = archiver('tar')

  output.on('close', () => console.log('Done'))
  archive.on('warning', err => console.error(err))

  archive.pipe(output)
  archive.directory('dist/uploadcare.tinymce/', false)
  archive.finalize()
}

createTarArchive()
createZipArchive()
