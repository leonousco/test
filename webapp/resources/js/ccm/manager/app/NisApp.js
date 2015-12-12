
/*global Backbone, NisMVC:true */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	var NisApp = Backbone.Marionette.Application.extend({
		initialize: function(options) {
			console.log('initialize:', options);
		},
		setRootLayout: function (options) {
			console.log("setRootLayout: options:", options);
			this.root = new NisMVC.RootLayout(options);
		}

	});

	// The Application Object is responsible for kicking off
	// a Marionette application when its start function is called
	//
	// This application has a singler root Layout that is attached
	// before it is started.  Other system components can listen
	// for the application start event, and perform initialization
	// on that event
	NisMVC.App = new NisApp();
	NisMVC.templateManager = new Marionette.TemplateManager();
	NisMVC.evnMaganger = new EnvManager();

	NisMVC.App.on('before:start', function (options) {
		console.log("before:start, options:", options);
		NisMVC.App.setRootLayout(options.rootLayout);
	});

	NisMVC.App.on("start", function(options){
		console.log("start, options:", options);
	});	

})();
