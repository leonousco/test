var NisMVC = NisMVC || {};

(function () {
	'use strict';

	var NisApp = Backbone.Marionette.Application.extend({
		initialize: function(options) {
			//console.log('initialize:', options);
		},
		setRootLayout: function (options) {
			//console.log("setRootLayout: options:", options);
			this.root = new NisMVC.RootLayout(options);
		}

	});

	NisMVC.App = new NisApp();
	NisMVC.templateManager = new Marionette.TemplateManager();
	NisMVC.evnMaganger = new EnvManager();

	NisMVC.App.on('before:start', function (options) {
		//console.log("before:start, options:", options);
		NisMVC.App.setRootLayout(options.rootLayout);
	});

	NisMVC.App.on("start", function(options){
		//console.log("start, options:", options);
	});	

})();
