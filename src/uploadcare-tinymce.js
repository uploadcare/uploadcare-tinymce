var uploadcareDefaultOptions = {
  integration: getIntegration(),
  crop: '',
}

tinymce.create('tinymce.plugins.UploadcarePlugin', {
  init: function(ed, url) {
    tinymce.ScriptLoader.add('https://ucarecdn.com/widget/' + '$_WIDGET_VERSION' + '/uploadcare/uploadcare.full.min.js')
    tinymce.ScriptLoader.loadQueue()

    var uploadcareOptions = Object.keys(ed.settings)
      .filter(function(settingName) {
        return settingName.search('^uploadcare_') !== -1
      })
      .reduce(function(options, settingName) {
        var optionName = settingName
          .replace('uploadcare_', '')
          .replace(/(_[a-z])/g, function(v) { return v.toUpperCase() })
          .replace('_', '')

        options[optionName] = ed.settings[settingName]

        return options
      }, uploadcareDefaultOptions)

    ed.addButton('uploadcare', {
      title: 'Insert media',
      cmd: 'showUploadcareDialog',
      image: url + '/icons/uploadcare.png',
      stateSelector: 'img',
    })

    ed.addCommand('showUploadcareDialog', function() {
      var cdnBase = uploadcareOptions.cdnBase || uploadcare.defaults.cdnBase
      var file = null
      var selectedNode = ed.selection.getNode()

      if (selectedNode.nodeName === 'IMG') {
        if (selectedNode.src.indexOf(cdnBase) === 0) {
          file = uploadcare.fileFrom('uploaded', selectedNode.src, uploadcareOptions)
        }
      }
      if (selectedNode.nodeName === 'A') {
        if (selectedNode.href.indexOf(cdnBase) === 0) {
          file = uploadcare.fileFrom('uploaded', selectedNode.href, uploadcareOptions)
        }
      }

      uploadcare.openDialog(file, uploadcareOptions).done(function(file) {
        file.done(function(fileInfo) {
          if (fileInfo.isImage) {
            ed.selection.setNode(tinymce.activeEditor.dom.create('img', {src: fileInfo.cdnUrl}))
          }
          else if (selectedNode.nodeName === 'A') {
            selectedNode.parentNode.replaceChild(
              tinymce.activeEditor.dom.create('a', {href: fileInfo.cdnUrl}, fileInfo.name),
              selectedNode
            )
          }
          else {
            ed.selection.setNode(tinymce.activeEditor.dom.create('a', {href: fileInfo.cdnUrl}, fileInfo.name))
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

  return 'TinyMCE/{tinymceVersion}; Uploadcare-TinyMCE/{pluginVerion}'
    .replace('{tinymceVersion}', tinymceVersion)
    .replace('{pluginVerion}', pluginVerion)
}
