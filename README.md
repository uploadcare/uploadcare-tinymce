# Uploadcare TinyMCE Plugin

This is a module for [TinyMCE][2] to work with [Uploadcare][1].

## Requirements

- TinyMCE 4+

## Install

Clone plugin from git to your plugins directory:

    git clone git://github.com/uploadcare/uploadcare-tinymce.git plugins/uploadcare --recursive

Find "config.js" file and replace demo public key with yours:

    var UPLOADCARE_PUBLIC_KEY = "demopublickey";

Set up the [crop function][3] if needed:

    var UPLOADCARE_CROP = '3:2';

Add the plugin and its button while initializing TinyMCE:

    tinymce.init({
      ....
      plugins : ["uploadcare,..."],
      ....
      toolbar : "... | link image uploadcare"
      ....

Enable autostore option for you Uploadcare account.

## Usage

1. Press "Uploadcare" button.
2. Select a file to upload.
3. Change any parameters you like in the appeared dialog.
4. Press "Insert" and an image will be available inside editor.
 
[1]: http://uploadcare.com/
[2]: http://www.tinymce.com/
[3]: https://uploadcare.com/documentation/widget/#crop
