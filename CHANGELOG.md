# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* The ability to edit the inserted images
  and links to downloaded files. See [#9][github-pr-9].

[Unreleased]: https://github.com/uploadcare/uploadcare-tinymce/compare/v3.0.0...HEAD
[github-pr-9]: https://github.com/uploadcare/uploadcare-tinymce/pull/9

## 3.0.0, 2018-05-16

### Added

* Plugin settings can now be defined using the TinyMCE editor options.

### Changed

* Bumped the widget version to `3.x`, see [widget changelog][widget-changelog].
* Added `integration` to the default config to provide info
  on the TinyMCE version and plugin version for User Agent with requests
  to [Uploadcare Upload API](https://uploadcare.com/docs/api_reference/upload/).

### Removed

* Setting options for the plugin using the `config.js` file.

## 2.1.1, 2017-01-16

### Changed

* CDN link to the widget.

## 2.1.0, 2016-11-30

### Changed

* Bumped widget version to `2.10.2`, see [widget changelog][widget-changelog].

## 2.0.0, 2015-09-08

### Changed

* Updated plugin to work with TinyMCE 4+.
* Get rid of PHP dialog.
* Bumped widget version to 2.5.1, see [widget changelog][widget-changelog].

[widget-changelog]: https://github.com/uploadcare/uploadcare-widget/blob/master/HISTORY.markdown
