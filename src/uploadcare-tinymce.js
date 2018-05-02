if (typeof window.UPLOADCARE_CROP === 'undefined') {
  window.UPLOADCARE_CROP = ''
}

var widgetConfig = {integration: getIntegration()}

tinymce.ScriptLoader.add('https://ucarecdn.com/widget/' + '$_WIDGET_VERSION' + '/uploadcare/uploadcare.full.min.js')

tinymce.create('tinymce.plugins.UploadcarePlugin', {
  init: function(ed, url) {
    tinymce.ScriptLoader.add(url + '/config.js')
    tinymce.ScriptLoader.loadQueue()

    ed.addButton('uploadcare', {
      title: 'Uploadcare',
      cmd: 'showUploadcareDialog',
      image: url + '/icons/uploadcare.png',
      stateSelector: 'img',
    })

    ed.addCommand('showUploadcareDialog', function() {
      uploadcare.openDialog(null, widgetConfig).done(function(file) {
        file.done(function(fileInfo) {
          if (fileInfo.isImage) {
            ed.execCommand('mceInsertContent', false, '<img src="' + fileInfo.cdnUrl + '" />')
          }
          else {
            ed.execCommand('mceInsertContent', false, '<a href="' + fileInfo.cdnUrl + '">' + fileInfo.name + '</a>')
          }
        })
      })
    })
  },

  createControl: function() {
    return null
  },

  getInfo: function() {
    return {
      longname: 'Uploadcare',
      author: 'Uploadcare',
      authorurl: 'https://uploadcare.com/',
      infourl: 'https://github.com/uploadcare/uploadcare-tinymce',
      version: '$_VERSION',
    }
  },
})

tinymce.PluginManager.add('uploadcare', tinymce.plugins.UploadcarePlugin)

function getIntegration() {
  var tinymceVersion = tinyMCE.majorVersion + '.' + tinyMCE.minorVersion
  var pluginVerion = '$_VERSION'

  var integration = 'TinyMCE/{tinymceVersion}; Uploadcare-TinyMCE/{pluginVerion}'
    .replace('{tinymceVersion}', tinymceVersion)
    .replace('{pluginVerion}', pluginVerion)

  return integration
}
