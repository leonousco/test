var Uic = Uic || {};

(function () {
	'use strict';

	Uic.LayoutView = Backbone.Marionette.LayoutView.extend({
		initialize: function(options) {
			this.initOptions(options);
			//console.log('initialize:', options);
			this.addRegions(options.regions);
			this.param = options;
			this.renderLayout();
		},
		renderLayout:function() {
			if(this.param && this.param.raw) {
				var html = Handlebars.compile(this.param.raw)(this.param.data);
				$(this.el).html(html);							
			}
			else {
				this.renderView();
			}
		},		
		render: function () {   
			return this;
		},		  
		super: function() {
			return Uic.LayoutView.prototype;
		}, 
		setParam:function(options) {
			this.param = options;
			this.renderLayout();
		},        
		setParentView:function(view) {
			this.parentView = view;
		},
		getParentView:function() {
			if(this.parentView)
			    return this.parentView;
			return null;
		},
		
	}); // end of Uic.LayoutView


	_.extend(Uic.LayoutView.prototype, Uic.View.Mixin);


})();

