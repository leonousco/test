/*global NisMVC:true, Backbone, $ */

var NisMVC = NisMVC || {};


(function () {
	'use strict';


	NisMVC.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			"": "main",
			"register": "register",
			"viewer": "viewer",
			"evaluate": "evaluate",
			"detail": "detail",
			"logout": "logout",
		},
	});
})();
