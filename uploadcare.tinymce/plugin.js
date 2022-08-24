/**
 * uploadcare-tinymce 4.0.2
 * File Uploader by Uploadcare, a plugin providing TinyMCE users to upload media via Uploadcare Widget.
 * https://github.com/uploadcare/uploadcare-tinymce#readme
 * Date: 2022-08-24
 */

(function () {
  'use strict';

  var icon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 80 80\">\n  <path fill=\"#FFD800\" fill-rule=\"evenodd\" d=\"M32,64 C14.326888,64 0,49.673112 0,32 C0,14.326888 14.326888,0 32,0 C49.673112,0 64,14.326888 64,32 C64,49.673112 49.673112,64 32,64 Z M32,34.7654321 C33.527306,34.7654321 34.7654321,33.527306 34.7654321,32 C34.7654321,30.472694 33.527306,29.2345679 32,29.2345679 C30.472694,29.2345679 29.2345679,30.472694 29.2345679,32 C29.2345679,33.527306 30.472694,34.7654321 32,34.7654321 Z\" transform=\"translate(8 8)\"/>\n</svg>\n";

  /**
   * **WARNING**: DO NOT REMOVE OR RENAME THIS FILE!
   * This file is here for compatibilty purposes.
   * We're serving this file from gh pages in the demo,
   * and some TinyMCE 4.x or 5.x users could use it.
   */

  var uploadcareDefaultOptions = {
    integration: getIntegration(),
    crop: '',
  };

  tinymce.create('tinymce.plugins.UploadcarePlugin', {
    init: function(editor, url) {
      if(!window.uploadcare) {
        tinymce.ScriptLoader.add('https://ucarecdn.com/widget/' + '3.x' + '/uploadcare/uploadcare.full.min.js');
        tinymce.ScriptLoader.loadQueue();
      }

      var uploadcareOptions = Object.keys(editor.settings)
        .filter(function(settingName) {
          return settingName.search('^uploadcare_') !== -1
        })
        .reduce(function(options, settingName) {
          var optionName = settingName
            .replace('uploadcare_', '')
            .replace(/(_[a-z])/g, function(v) {
              return v.toUpperCase()
            })
            .replace('_', '');

          options[optionName] = editor.settings[settingName];

          return options
        }, uploadcareDefaultOptions);

      function showUploadcareDialog() {
        var cdnBase = uploadcareOptions.cdnBase || uploadcare.defaults.cdnBase;
        var file = null;
        var selectedNode = editor.selection.getNode();

        if (selectedNode.nodeName === 'IMG') {
          if (selectedNode.src.indexOf(cdnBase) === 0) {
            file = uploadcare.fileFrom('uploaded', selectedNode.src, uploadcareOptions);
          }
        }
        if (selectedNode.nodeName === 'A') {
          if (selectedNode.href.indexOf(cdnBase) === 0) {
            file = uploadcare.fileFrom('uploaded', selectedNode.href, uploadcareOptions);
          }
        }

        uploadcare.openDialog(file, uploadcareOptions).done(function(file) {
          file.done(function(fileInfo) {
            if (fileInfo.isImage) {
              editor.selection.setNode(tinymce.activeEditor.dom.create('img', {src: fileInfo.cdnUrl}));
            }
            else if (selectedNode.nodeName === 'A') {
              selectedNode.parentNode.replaceChild(
                tinymce.activeEditor.dom.create('a', {href: fileInfo.cdnUrl}, fileInfo.name),
                selectedNode
              );
            }
            else {
              editor.selection.setNode(tinymce.activeEditor.dom.create('a', {href: fileInfo.cdnUrl}, fileInfo.name));
            }
          });
        });
      }

      if (detectMajorVersion() === 4) {
        editor.addCommand('showUploadcareDialog', showUploadcareDialog);

        editor.addButton('uploadcare', {
          title: 'Insert media',
          cmd: 'showUploadcareDialog',
          image: url + '/icons/uploadcare.png',
          stateSelector: 'img',
        });
      }
      else if (detectMajorVersion() === 5) {
        editor.ui.registry.addIcon('uploadcare', icon);

        editor.ui.registry.addButton('uploadcare', {
          text: 'Insert media',
          tooltip: 'Insert media',
          onAction: showUploadcareDialog,
          icon: 'uploadcare',
        });
      }
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
        version: '4.0.2',
      }
    },
  });

  tinymce.PluginManager.add('uploadcare', tinymce.plugins.UploadcarePlugin);

  function getIntegration() {
    var tinymceVersion = tinymce.majorVersion + '.' + tinymce.minorVersion;
    var pluginVerion = '4.0.2';

    return 'TinyMCE/{tinymceVersion}; Uploadcare-TinyMCE/{pluginVerion}'
      .replace('{tinymceVersion}', tinymceVersion)
      .replace('{pluginVerion}', pluginVerion)
  }

  function detectMajorVersion() {
    var version = parseInt(tinymce.majorVersion);

    return version
  }

}());
