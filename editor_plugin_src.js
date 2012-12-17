(function() {
	var _uc_window;
	tinymce.create('tinymce.plugins.UploadcarePlugin', {
		init : function(ed, url) {
			ed.addCommand('mceUploadcare', function() {
				_uc_window = ed.windowManager.open({
					file : url + '/dialog.php',
					width : 800,
					height : 600,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			ed.addButton('uploadcare', {
				title : 'Uploadcare',
				cmd : 'mceUploadcare',
				image : url + '/logo.png'
			});

			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('uploadcare', n.nodeName == 'IMG');
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