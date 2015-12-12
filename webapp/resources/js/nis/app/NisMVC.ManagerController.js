(function () {
	'use strict';

	NisMVC.ManagerController = NisMVC.BaseController.extend({
		initialize: function (options) {
			//console.log("initialize: options:", options);
			options.isClient = false;
			NisMVC.App.mgrOrgInfo = NisMVC.App.getDefaultOrgInfo({type:NisMVC.App.type});
			NisMVC.BaseController.prototype.initialize.call(this, options);
		},		
		onStart:function(options){
			console.log("onStart:", options);
		},
	});

})();
