/**
 * uploadcare-tinymce 3.0.0
 * File Uploader by Uploadcare, a plugin providing TinyMCE users to upload media via Uploadcare Widget.
 * https://github.com/uploadcare/uploadcare-tinymce#readme
 * Date: 2018-05-23
 */

(function () {
  'use strict';

  var uploadcareDefaultOptions = {
    integration: getIntegration(),
    crop: '',
  };

  tinymce.create('tinymce.plugins.UploadcarePlugin', {
    init: function(ed, url) {
      tinymce.ScriptLoader.add('https://ucarecdn.com/widget/' + '3.x' + '/uploadcare/uploadcare.full.min.js');
      tinymce.ScriptLoader.loadQueue();

      var uploadcareOptions = Object.keys(ed.settings)
        .filter(function(settingName) {
          return settingName.search('^uploadcare_') !== -1
        })
        .reduce(function(options, settingName) {
          var optionName = settingName
            .replace('uploadcare_', '')
            .replace(/(_[a-z])/g, function(v) { return v.toUpperCase() })
            .replace('_', '');

          options[optionName] = ed.settings[settingName];

          return options
        }, uploadcareDefaultOptions);

      ed.addButton('uploadcare', {
        title: 'Uploadcare',
        cmd: 'showUploadcareDialog',
        image: url + '/icons/uploadcare.png',
        stateSelector: 'img',
      });

      ed.addCommand('showUploadcareDialog', function() {
        uploadcare.openDialog(null, uploadcareOptions).done(function(file) {
          file.done(function(fileInfo) {
            if (fileInfo.isImage) {
              ed.execCommand('mceInsertContent', false, '<img src="' + fileInfo.cdnUrl + '" />');
            }
            else {
              ed.execCommand('mceInsertContent', false, '<a href="' + fileInfo.cdnUrl + '">' + fileInfo.name + '</a>');
            }
          });
        });
      });
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
        version: '3.0.0',
      }
    },
  });

  tinymce.PluginManager.add('uploadcare', tinymce.plugins.UploadcarePlugin);

  function getIntegration() {
    var tinymceVersion = tinyMCE.majorVersion + '.' + tinyMCE.minorVersion;
    var pluginVerion = '3.0.0';

    return 'TinyMCE/{tinymceVersion}; Uploadcare-TinyMCE/{pluginVerion}'
      .replace('{tinymceVersion}', tinymceVersion)
      .replace('{pluginVerion}', pluginVerion)
  }

}());
