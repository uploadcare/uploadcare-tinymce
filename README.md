# File Uploader by Uploadcare

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-tinymce">
  <img align="right" width="64" height="64"
    src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
    alt="">
</a>

This is a plugin for [TinyMCE][tinymce] until version 7, a WYSIWYG HTML editor,
providing it for working with [Uploadcare Widget][uc-feature-widget].

To learn how the integration of TinyMCE version 7 with File Uploader 1.x works, see this [guide](https://uploadcare.com/docs/integrations/tinymce/).

The plugin allows TinyMCE users to upload media
from their devices, social media, cloud storage, and more.
All that without any backend code that's usually required to handle uploads.

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

* [TinyMCE 6.x demo][demo-6].
* [TinyMCE 5.x demo][demo-5].
* [TinyMCE 4.x demo][demo-4].

## Requirements

Supported TinyMCE versions: `6.x`, `5.x` and `4.x`.

## Install

Download the latest plugin archive from the [release branch][github-branch-release]
or [releases page][github-releases].

Extract the downloaded archive to the plugin directory of your TinyMCE
installation.

Another option here is cloning the repo:

```bash
git clone -b release git@github.com:uploadcare/uploadcare-tinymce.git plugins/uploadcare
```

* `uploadcare.tinymce@6.x` - compatible with TinyMCE 6.x
* `uploadcare.tinymce` - compatible with TinyMCE 4.x and 5.x

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
  // options example for 6.x
  uploadcare: {
    publicKey: 'YOUR_PUBLIC_KEY'
  }
  // options example for 4.x and 5.x
  uploadcare_public_key: 'YOUR_PUBLIC_KEY',
})
```

## Configuration

### Plugin configuration

To apply a custom configuration, initialize the TinyMCE editor
providing additional options.

Here is example for TinyMCE 6.x:

```javascript
tinymce.init({
  selector: '#editor',
  plugins: 'uploadcare',
  toolbar: 'uploadcare',
  external_plugins: {
    uploadcare: '/path/to/uploadcare/plugin.js',
  },
  uploadcare: {
    publicKey: 'YOUR_PUBLIC_KEY',
    /* when handling images, you can resize them on a client to save bandwidth */
    imageShrink: '500x375',
    /* allow multi-file uploads */
    multiple: true,
    multipleMax: 3,
    /* set crop options when handling images */
    crop: '1:1,4:3',
    /* feel free to add more options here */
  }
})
```

Example for TinyMCE 4.x and 5.x:

```javascript
tinymce.init({
  selector: '#editor',
  plugins: 'uploadcare',
  toolbar: 'uploadcare',
  external_plugins: {
    uploadcare: '/path/to/uploadcare/plugin.js',
  },
  uploadcare_public_key: 'YOUR_PUBLIC_KEY',
  /* when handling images, you can resize them on a client to save bandwidth */
  uploadcare_image_shrink: '500x375',
  /* allow multi-file uploads */
  uploadcare_multiple: true,
  uploadcare_multiple_max: 3,
  /* set crop options when handling images */
  uploadcare_crop: '1:1,4:3',
  /* feel free to add more options here */
})
```

You can use any [widget options][uc-docs-widget-options]
providing those as object keys. Just add the `uploadcare_` prefix and
use `snake_case` instead of `camelCase` in option names, e.g.
`imagesOnly` &rarr; `uploadcare_images_only`.

### Widget configuration

Uploadcare Widget can be deeply customized to suit your UX/UI. You can define
allowed upload sources, implement file validation, and more.

Use our live [widget sandbox][uc-widget-configure] as a starting point and consider
checking out the docs on [widget configuration][uc-docs-widget-config] and its
[JavaScript API][uc-docs-widget-js-api].

### Effects Tab

To enable [Effects Tab for Uploadcare Widget](https://github.com/uploadcare/uploadcare-widget-tab-effects), you need to add `init_instance_callback` callback to the options of TinyMCE's `init` method with the following code:

```
tinymce.init({
  selector: '#editor',
  plugins: 'uploadcare',
  toolbar: 'uploadcare',
  external_plugins: {
    uploadcare: '/path/to/uploadcare/plugin.js',
  },
  init_instance_callback: function() {
    window.UPLOADCARE_EFFECTS = 'crop,rotate,mirror';

    function onSuccess() {
      uploadcare.registerTab('preview', uploadcareTabEffects)
    }

    tinymce.ScriptLoader.add('https://ucarecdn.com/libs/widget-tab-effects/1.x/uploadcare.tab-effects.js', onSuccess)
    tinymce.ScriptLoader.loadQueue()
  }
})
```

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
[demo-4]: https://uploadcare.github.io/uploadcare-tinymce/demo/4.x/?utm_source=github&utm_campaign=uploadcare-tinymce
[demo-5]: https://uploadcare.github.io/uploadcare-tinymce/demo/5.x/?utm_source=github&utm_campaign=uploadcare-tinymce
[demo-6]: https://uploadcare.github.io/uploadcare-tinymce/demo/6.x/?utm_source=github&utm_campaign=uploadcare-tinymce
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
