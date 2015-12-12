(function () {
	'use strict';

	NisMVC.ClientController = NisMVC.BaseController.extend({
		initialize: function (options) {
			console.log("initialize: options:", options);
			//options.loginLocation = 'NHPClient.html';
			options.isClient = true;
			NisMVC.BaseController.prototype.initialize.call(this, options);
		},		
		onStart:function(options){
			console.log("onStart:", options);
		},
	});

})();
