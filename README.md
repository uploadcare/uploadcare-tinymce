# Uploadcare TinyMCE Plugin

This is a module for [TinyMCE][4] to work with [Uploadcare][1].

It's based on a [uploadcare-php][3] library.

## Requirements

- TinyMCE 3.5+
- PHP 5.2+
- php-curl

## Install

Clone plugin from git to your plugins directory:

    git clone git://github.com/uploadcare/uploadcare-tinymce.git plugins/uploadcare --recursive

Find a "config.php" file inside plugin directory and edit it:

    <?php
    define('UC_PUBLIC_KEY', 'demopublickey');
    define('UC_SECRET_KEY', 'demoprivatekey');

Find a "config.js" file an edit it:

    var UPLOADCARE_PUBLIC_KEY = "demopublickey";

Add a plugin and plugin button when initializing TinyMCE:

    tinyMCE.init({
      ....
      plugins : "uploadcare,..."
      ....
      theme_advanced_buttons1 : "uploadcare,save,..."
      ....

## Usage

1. Press "Uploadcare" button.
2. Select a file to upload.
3. Change any parameters you like in the appeared dialog.
4. Press "Insert" and an image will be available inside editor.
 
[1]: http://uploadcare.com/
[2]: https://uploadcare.com/documentation/reference/basic/cdn.html
[3]: https://github.com/uploadcare/uploadcare-php
[4]: http://www.tinymce.com/
