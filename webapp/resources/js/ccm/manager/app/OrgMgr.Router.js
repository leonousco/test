/*global NisMVC:true, Backbone, $ */

var NisMVC = NisMVC || {};


(function () {
	'use strict';


	NisMVC.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			"": "main",
			"manager": "manager",
			"user": "user",
			"approval": "approval",
			"userInfo": "userInfo",
			"requestDrop": "requestDrop",
			"ccm": "ccm",
			"logout":"logout",
			"checkUser": "checkUser",

			// "addManager" : "addManager",
			// "checkManager" : "checkManager",
			// "approvalUser" : "approvalUser",
			// "addUser" : "addUser",
			// "checkUser" : "checkUser",
			// "dropUser" : "dropUser",
			// "ccmVersionControl" : "versionControl",
			// "versionInfo" : "versionInfo",
		},
	});
})();
