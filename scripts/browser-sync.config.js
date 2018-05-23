module.exports = {
  files: ['index.html', 'dist', 'demo'],
  server: './',
  rewriteRules: [
    {
      match: 'http://uploadcare.github.io/uploadcare-tinymce/dist/',
      replace: '/../dist/',
    },
  ],
}
