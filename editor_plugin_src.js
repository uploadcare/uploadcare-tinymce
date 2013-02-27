(function() {
    var _uc_window;
    var _file_id;
    tinymce.ScriptLoader.load('https://ucarecdn.com/widget/0.6.3/uploadcare/uploadcare-0.6.3.min.js');
    tinymce.ScriptLoader.load('https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');
    tinymce.create('tinymce.plugins.UploadcarePlugin', {
        init : function(ed, url) {
            tinymce.ScriptLoader.add(url + '/config.js');
            tinymce.ScriptLoader.loadQueue();
            ed.addCommand('mceUploadcare', function() {
                _uc_window = ed.windowManager.open({
                    file : url + '/dialog.php?file_id=' + _file_id,
                    width : 800,
                    height : 600,
                    inline : 1
                }, {
                    plugin_url : url
                });
            });

            ed.addButton('uploadcare', {
                title : 'Uploadcare',
                cmd : 'showUploadcareDialog',
                image : url + '/logo.png'
            });

            ed.onNodeChange.add(function(ed, cm, n) {
                cm.setActive('uploadcare', n.nodeName == 'IMG');
            });

            ed.addCommand('showUploadcareDialog',function() {   
                jQuery('span.mce_uploadcare').html('');
                var uploader = new uploadcare.uploader.Uploader();
                var circle = new uploadcare.ui.progress.Circle('span.mce_uploadcare');
                uploadcare.widget.showDialog().pipe(function(file) {
                    var upload = uploader.upload(file);
                    circle.listen(upload);
                    return upload;
                }).fail(function(error) {
                }).done(function(file) {
                    _file_id = file.fileId;
                    ed.execCommand('mceUploadcare', true);
                });
            });
        },

        createControl : function(n, cm) {
            return null;
        },

        getInfo : function() {
            return {
                longname : 'Uploadcare',
                author : 'Uploadcare',
                authorurl : 'https://uploadcare.com/',
                infourl : 'https://github.com/uploadcare/uploadcare-tinymce',
                version : "1.0"
            };
        }
    });

    tinymce.PluginManager.add('uploadcare', tinymce.plugins.UploadcarePlugin);
})();