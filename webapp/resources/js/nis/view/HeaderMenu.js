/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	// ------------------
	// Layout Header View
	// ------------------
	NisMVC.HeaderTitle = Backbone.Marionette.View.extend({
		tagName: 'div',
		className: 'navbar-header',
		titleClass: '.navbar-brand',
		
		initialize: function (param) {
			$(this.el).html(this.template());
			this.setTitle(param.title);
		},
		template: function(data) {
			var raw = 
				'  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'
				+'    <span class="icon-bar"></span>'
				+'    <span class="icon-bar"></span>'
				+'    <span class="icon-bar"></span>'
				+'  </button>'
				+'  <a class="navbar-brand" href="#"> Title </a>'
				
			return _.template(raw)(data);

		},
		render: function () {    	
			return this;
			/*
			this.$el = this.$el.children();
			this.$el.unwrap();
			this.setElement(this.$el);			
			*/
		},
		setTitle: function(title) {
			var stringConstructor = "test".constructor;
			var arrayConstructor = [].constructor;

			if(title === undefined)
				return;
			if (title.constructor === stringConstructor) {
				this.$el.find(this.titleClass).text(title);
			}
		}				    
	});

})();

