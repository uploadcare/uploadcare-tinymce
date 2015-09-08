if (typeof UPLOADCARE_CROP == 'undefined') {
    UPLOADCARE_CROP = '';
}
(function() {
    var _uc_window;
    var _file_id;
    tinymce.ScriptLoader.add('https://ucarecdn.com/widget/2.5.1/uploadcare/uploadcare.full.min.js');

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
                image : url + '/logo.png',
                stateSelector : 'img'
            });

            ed.addCommand('showUploadcareDialog',function() {   
                var dialog = uploadcare.openDialog().done(function(file) {
                    file.done(function(fileInfo) {
                        _file_id = fileInfo.uuid;
                        url = fileInfo.cdnUrl;
                        if (fileInfo.isImage) {
                            ed.execCommand('mceInsertContent', false, '<img src="'+url+'" />');
                        } else {
                            ed.execCommand('mceInsertContent', false, '<a href="'+url+'">'+fileInfo.name+'</a>');
                        }
                    });
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
                version : "1.1"
            };
        }
    });

    tinymce.PluginManager.add('uploadcare', tinymce.plugins.UploadcarePlugin);
})();
