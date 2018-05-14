# Uploadcare TinyMCE Plugin

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-tinymce">
  <img align="right" width="64" height="64"
    src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
    alt="">
</a>

That's the [Uploadcare][uploadcare] plugin for the [TinyMCE][tinymce] WYSIWYG HTML editor.
The plugin allows your users to upload files and images
from local devices, social networks, cloud storages, and more.
All that — without any backend code that is often required for uploads.

[![GitHub release][badge-release-img]][badge-release-url]&nbsp;
[![Uploadcare stack on StackShare][badge-stack-img]][badge-stack-url]

# Requirements

* TinyMCE 4+

# Demo

A minimalistic demo can be found [here][demo].

# Install

Installing the Uploadcare plugin is done via cloning
the release branch to your plugins directory with git:

```bash
git clone -b release git@github.com:uploadcare/uploadcare-tinymce.git plugins/uploadcare
```

# Usage

Add the plugin and its button while initializing TinyMCE:

```javascript
tinymce.init({
  selector: "#editor",
  plugins: "uploadcare",
  toolbar: "uploadcare",
  external_plugins: {
    uploadcare: "/path/to/uploadcare/plugin.js"
  }
});
```

# Configuration

All the settings are managed within the `config.js` file.

There's only one **critical** setting — your
Uploadcare [public API key][widget-docs-keys]. It can be easily obtained at your [dashboard].
You can still use the demo public key during the dev stage.
Keep in mind that demo account files are removed every few hours.

```
UPLOADCARE_PUBLIC_KEY = 'demopublickey'
```

You can deeply customize the widget behavior:
file sources, file validation, and much more.
Please, check out the [Uploadcare Widget][widget-docs-config]
and [JavaScript API][widget-docs-js-api] docs.

## Feedback

Your feedback or support requests are welcome at [hello@uploadcare.com][uc-email-hello].

[uc-email-hello]: mailto:hello@uploadcare.com
[widget-docs-config]: https://uploadcare.com/docs/uploads/widget/config/
[widget-docs-js-api]: https://uploadcare.com/docs/api_reference/javascript/
[widget-docs-keys]: https://uploadcare.com/docs/keys/#keys
[uploadcare]: https://uploadcare.com/
[tinymce]: http://www.tinymce.com/
[demo]: http://uploadcare.github.io/uploadcare-tinymce/
[badge-stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[badge-stack-url]: https://stackshare.io/uploadcare/stacks/
[badge-release-img]: https://img.shields.io/github/release/uploadcare/uploadcare-tinymce.svg
[badge-release-url]: https://github.com/uploadcare/uploadcare-tinymce/releases
[dashboard]: https://uploadcare.com/dashboard/
