/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	NisMVC.RootLayout = Backbone.Marionette.LayoutView.extend({

		el: '#app',

		initialize: function(options) {
			console.log('initialize:', options);
			this.addRegions(options.regions);
		},
	});


})();

