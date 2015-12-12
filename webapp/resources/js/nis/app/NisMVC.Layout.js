/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	NisMVC.RootLayout = Backbone.Marionette.LayoutView.extend({

		el: '#app',

		initialize: function(options) {
			//console.log('initialize:', options);
			if(options.regions){
				this.addRegions(options.regions);
			}
			else {
				this.addRegions({
					header: '#header',
					contents: '#contents',
					footer: '#footer',
				});
			}			
		},
	});


})();

