# Uploadcare TinyMCE Plugin

That's the [Uploadcare][1] plugin for the [TinyMCE][2] WYSIWYG HTML editor.
The plugin allows your users to upload files and images
from local devices, social networks, cloud storages, and more.
All that — without any backend code that is often required for uploads.

# Requirements

* TinyMCE 4+

# Installation

Installing the Uploadcare plugin is done via cloning
the repo to your plugins directory with git:

    git clone git://github.com/uploadcare/uploadcare-tinymce.git plugins/uploadcare

Next step is adding the plugin and its button
while initializing TinyMCE:

    tinymce.init({
      ....
      plugins : ["uploadcare,..."],
      ....
      toolbar : "... | link image uploadcare"
      ....
# Usage

Uploading files and images with the plugin
will take you about three steps:

1. Click the "Uploadcare" button.
2. Select a file to upload.
3. Either an image or a file link will appear in the editor.

We split the concepts of files and images here.
That's because images can be transformed on-the-fly
with our [CDN](https://uploadcare.com/documentation/cdn/).
Technically, the plugin lets your TinyMCE editor to
ineract with [Uploadcare Widget](https://uploadcare.com/documentation/widget/).

# Configuration

All the settings are managed within the "config.js" file.

There's only one **critical** setting — your
Uploadcare public API key. It can be easily obtained
once you're [registered](https://uploadcare.com/documentation/)
with Uploadcare and have at least a single project
created on your [dashboard](https://uploadcare.com/dashboard/).
You can still use the demo public key during the dev stage.
Keep in mind that demo account files are removed every few hours.

    var UPLOADCARE_PUBLIC_KEY = "demopublickey";

## Useful settings

### Locale
Use this setting to define a widget locale.
Should be set as a global variable:

```html
<script>
    UPLOADCARE_LOCALE = 'es';
</script>
```

### Crop
This setting is applicable to images and
enables custom crop for the plugin.
Cropping will then become available after a user
selects a file for upload.
Please note that the file uploaded to your project
still is an original image. Crop operations are performed
on-the-fly with our 
[CDN API](https://uploadcare.com/documentation/cdn/)
and hence are included in a resulting image URL.

Crop options are set in a string holding one or more
crop presets. Those are divided by commas.
If there are multiple crop presets present in an options
string, users will then be able to choose which of
them to apply during the crop step.
Each preset consists of a size definition and an optional keyword.

- "disabled" — crop is disabled. Can't be combined with other presets.
- "" or "free" — crop is enabled and users will be able to
  define crop area freely on an image.
- "2:3" — enables crop with the 2:3 aspect ratio.
- "300x200" — same as above, but if the selected area is bigger than 300x200 px,
  it will be downscaled to fit these dimensions.
- "300x200 upscale" — same as above, but if the selected area is smaller than
  300x200 px, it will be upscaled to the specified size.
- "300x200 minimum" — users won't be able to select an area smaller than 300x200 px.
  If an uploaded image is smaller than that, it will be upscaled.

```html
<script type="text/javascript">
  UPLOADCARE_CROP = '4:3, 3:4';
</script>
```

### Tabs (Upload Sources)
The widget can upload files from disks, URLs, social media,
and many other sources. There's a separate tab for each
upload source in the widget.

Here's the full list of tabs (sources) supported by
the latest widget version.

<table class="reference">
  <tr>
    <th>Code</th>
    <th>File Source</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>file</code></td>
    <td>Local disk</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>camera</code></td>
    <td>Local webcam</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>url</code></td>
    <td>Any URL</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>facebook</code></td>
    <td><a href="https://www.facebook.com/">Facebook</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>gdrive</code></td>
    <td><a href="https://drive.google.com/">Google Drive</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>gphotos</code></td>
    <td><a href="https://photos.google.com/">Google Photos</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>dropbox</code></td>
    <td><a href="https://www.dropbox.com/">Dropbox</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>instagram</code></td>
    <td><a href="http://instagram.com/">Instagram</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>evernote</code></td>
    <td><a href="http://evernote.com/">Evernote</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>flickr</code></td>
    <td><a href="https://www.flickr.com/">Flickr</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>skydrive</code></td>
    <td><a href="https://onedrive.live.com/">OneDrive</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>box</code></td>
    <td><a href="https://www.box.com/">Box</a></td>
    <th>Off</th>
  </tr>
  <tr>
    <td><code>vk</code></td>
    <td><a href="http://vk.com/">VK</a></td>
    <th>Off</th>
  </tr>
  <tr>
    <td><code>huddle</code></td>
    <td><a href="https://www.huddle.com/">Huddle</a></td>
    <th>Off</th>
  </tr>
</table>

The set of enabled sources can be reconfigured.
This is done through specifying their respective 
codes in an options string, as space-separated values.
Use the `all` value to enable all supported sources.

```html
<script type="text/javascript">
  UPLOADCARE_TABS = 'file url instagram flickr';
</script>
```

## Other settings

All the Uploadcare Widget settings can be found in our [docs][4].
Please read those to unleash the uploading power in its full.

# Contributors

* [@grayhound](https://github.com/grayhound)
* [@dmitry-mukhin](https://github.com/dmitry-mukhin)
* [@dimaninc](https://github.com/dimaninc)
* [@Zmoki](https://github.com/Zmoki)

# Contact

Got any thoughts to share? Hit us up at
[hello@uploadcare.com](mailto:hello@uploadcare.com).

[1]: https://uploadcare.com/
[2]: http://www.tinymce.com/
[3]: https://uploadcare.com/documentation/widget/#crop
[4]: https://uploadcare.com/documentation/widget/#configuration
