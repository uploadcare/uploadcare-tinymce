# File Uploader by Uploadcare

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-tinymce">
  <img align="right" width="64" height="64"
    src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
    alt="">
</a>

This is a plugin for the [TinyMCE][tinymce] WYSIWYG HTML editor
providing it to work with [Uploadcare Widget][uc-feature-widget].

The plugin allows your users to upload files and images
from local devices, social networks, cloud storages, and more.
All that — without any backend code that is often required for uploads.

[![GitHub release][badge-release-img]][badge-release-url]&nbsp;
[![Uploadcare stack on StackShare][badge-stack-img]][badge-stack-url]

* [Demo](#demo)
* [Requirements](#requirements)
* [Install](#install)
* [Usage](#usage)
* [Configuration](#configuration)
  * [Plugin configuration](#plugin-configuration)
  * [Widget configuration](#widget-configuration)
* [Security issues](#security-issues)
* [Feedback](#feedback)

## Demo

Check out the basic demo [here][demo].

## Requirements

TinyMCE 4+.

## Install

Download the latest plugin archive from the [release branch][github-branch-release]
or [releases page][github-releases].

Extract the downloaded archive to the plugin directory of your TinyMCE
installation.

Other options here are either cloning the repo:

```bash
git clone -b release git@github.com:uploadcare/uploadcare-tinymce.git plugins/uploadcare
```

## Usage

Add `uploadcare` to the list of your TinyMCE plugins and the toolbar.
**Set your [public key][uc-docs-widget-options-public-key]**. Public keys are used
to identify a target Uploadcare [project][uc-projects] your uploads will go to.

```javascript
tinymce.init({
  selector: '#editor',
  plugins: 'uploadcare',
  toolbar: 'uploadcare',
  external_plugins: {
    uploadcare: '/path/to/uploadcare/plugin.js',
  },
  uploadcare_public_key: 'YOUR_PUBLIC_KEY',
})
```

## Configuration

### Plugin configuration

To apply a custom configuration, initialize the TinyMCE editor
providing additional options:

```javascript
tinymce.init({
  selector: '#editor',
  plugins: 'uploadcare',
  toolbar: 'uploadcare',
  external_plugins: {
    uploadcare: '/path/to/uploadcare/plugin.js',
  },
  uploadcare_public_key: 'YOUR_PUBLIC_KEY',
  uploadcare_image_shrink: '500x375', // set client-size resize for images
  uploadcare_multiple: true, // allow multi-file uploads
  uploadcare_multiple_max: 3,
  uploadcare_crop: '1:1,4:3', // set crop options when handling images
  /* feel free to add more options here */
})
```

You can use any [widget options][uc-docs-widget-options]
that are allowed to use as object key. Just add the `uploadcare_` prefix and
use snake_case instead of camelCase for a name of an option, e.g.
`imagesOnly` &rarr; `uploadcare_images_only`.

### Widget configuration

Uploadcare Widget can be deeply customized to suit your UX/UI. You can define
allowed upload sources, implement file validation, and more.

Use our live [widget sandbox][uc-widget-configure] as a starting point and consider
checking out the docs on [widget configuration][uc-docs-widget-config] and its
[JavaScript API][uc-docs-widget-js-api].

## Security issues

If you think you ran into something in Uploadcare libraries which might have
security implications, please hit us up at [bugbounty@uploadcare.com][uc-email-bounty]
or Hackerone.

We'll contact you personally in a short time to fix an issue through co-op and
prior to any public disclosure.

## Feedback

Issues and PRs are welcome. You can provide your feedback or drop us a support
request at [hello@uploadcare.com][uc-email-hello].

[tinymce]: http://www.tinymce.com/
[demo]: https://uploadcare.github.io/uploadcare-tinymce/?utm_source=github&utm_campaign=uploadcare-tinymce
[uc-docs-widget-config]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=uploadcare-tinymce
[uc-docs-widget-js-api]: https://uploadcare.com/docs/api_reference/javascript/?utm_source=github&utm_campaign=uploadcare-tinymce
[uc-docs-widget-options]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=uploadcare-tinymce#options
[uc-docs-widget-options-public-key]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=uploadcare-tinymce#option-public-key
[uc-dashboard]: https://uploadcare.com/dashboard/?utm_source=github&utm_campaign=uploadcare-tinymce
[uc-widget-configure]: https://uploadcare.com/widget/configure/?utm_source=github&utm_campaign=uploadcare-tinymce
[uc-feature-widget]: https://uploadcare.com/features/widget/?utm_source=github&utm_campaign=uploadcare-tinymce
[uc-projects]: https://uploadcare.com/docs/keys/?utm_source=github&utm_campaign=uploadcare-tinymce#projects
[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
[github-releases]: https://github.com/uploadcare/uploadcare-tinymce/releases
[github-branch-release]: https://github.com/uploadcare/uploadcare-tinymce/tree/release
[github-contributors]: https://github.com/uploadcare/uploadcare-tinymce/graphs/contributors
[badge-stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[badge-stack-url]: https://stackshare.io/uploadcare/stacks/
[badge-release-img]: https://img.shields.io/github/release/uploadcare/uploadcare-tinymce.svg
[badge-release-url]: https://github.com/uploadcare/uploadcare-tinymce/releases
