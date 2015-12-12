
var NisMVC = NisMVC || {};

$(function () {
	'use strict';

	NisMVC.App.on('start', function (options) {
		//console.log("start, options:", options);
		if (! History.started) Backbone.history.start();
		var controller = new NisMVC.Controller(options);
		controller.router = new NisMVC.Router({
			controller: controller
		});
		controller.start(options);
	});

	//console.log("before app start");
	NisMVC.appInterface.loadInitialData().done(function (options) {
		//console.log("before NisMVC.App.start(), ", options);
		NisMVC.uiStore = {};
		NisMVC.code = new Nis.Code();		
		var appInfo = {};
		if(! _.isUndefined(Nis.Model.AppInfo)) {
			appInfo = new Nis.Model.AppInfo();
		}
		NisMVC.App.start(appInfo);
	}).fail(function(options){
		console.error("init fail, " + options);
	});

});


