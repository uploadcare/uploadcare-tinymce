/* global tinymce, uploadcare */
/* eslint-disable no-param-reassign */
import icon from "./icons/uploadcare.svg";

var uploadcareDefaultOptions = {
  integration: getIntegration(),
  crop: "",
};

var plugin = function(editor) {
  if(!window.uploadcare) {
    tinymce.ScriptLoader.add(
      "https://ucarecdn.com/widget/" +
        "$_WIDGET_VERSION" +
        "/uploadcare/uploadcare.full.min.js"
    );
    tinymce.ScriptLoader.loadQueue();
  }

  editor.options.register('uploadcare', {
    processor: 'object',
    default: {}
  });

  var uploadcareOptions = Object.assign({}, uploadcareDefaultOptions, editor.options.get('uploadcare'))

  function showUploadcareDialog() {
    var cdnBase = uploadcareOptions.cdnBase || uploadcare.defaults.cdnBase;
    var file = null;
    var selectedNode = editor.selection.getNode();

    if (selectedNode.nodeName === "IMG") {
      if (selectedNode.src.indexOf(cdnBase) === 0) {
        file = uploadcare.fileFrom(
          "uploaded",
          selectedNode.src,
          uploadcareOptions
        );
      }
    }
    if (selectedNode.nodeName === "A") {
      if (selectedNode.href.indexOf(cdnBase) === 0) {
        file = uploadcare.fileFrom(
          "uploaded",
          selectedNode.href,
          uploadcareOptions
        );
      }
    }

    uploadcare.openDialog(file, uploadcareOptions).done(function (file) {
      file.done(function (fileInfo) {
        if (fileInfo.isImage) {
          editor.selection.setNode(
            tinymce.activeEditor.dom.create("img", { src: fileInfo.cdnUrl })
          );
        } else if (selectedNode.nodeName === "A") {
          selectedNode.parentNode.replaceChild(
            tinymce.activeEditor.dom.create(
              "a",
              { href: fileInfo.cdnUrl },
              fileInfo.name
            ),
            selectedNode
          );
        } else {
          editor.selection.setNode(
            tinymce.activeEditor.dom.create(
              "a",
              { href: fileInfo.cdnUrl },
              fileInfo.name
            )
          );
        }
      });
    });
  }
  editor.ui.registry.addIcon("uploadcare", icon);

  editor.ui.registry.addButton("uploadcare", {
    text: "Insert media",
    tooltip: "Insert media",
    onAction: showUploadcareDialog,
    icon: "uploadcare",
  });

  return {
    getMetadata: function () {
      return {
        name: "Uploadcare Plugin",
        url: "https://github.com/uploadcare/uploadcare-tinymce/",
        version: "$_VERSION",
      };
    },
  };
}

tinymce.PluginManager.add("uploadcare", plugin);

function getIntegration() {
  var tinymceVersion = tinymce.majorVersion + "." + tinymce.minorVersion;
  var pluginVerion = "$_VERSION";

  return "TinyMCE/{tinymceVersion}; Uploadcare-TinyMCE/{pluginVerion}"
    .replace("{tinymceVersion}", tinymceVersion)
    .replace("{pluginVerion}", pluginVerion);
}
