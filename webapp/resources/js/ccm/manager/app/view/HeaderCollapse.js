/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	// ------------------
	// Layout Header View
	// ------------------
	NisMVC.HeaderCollapse = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'navbar-header',
		titleClass: '.navbar-brand',
		
		initialize: function (param) {
			$(this.el).html(this.template());
		},
		template: function(data) {
			var raw = 
				'  <div class="navbar-collapse collapse">'
				+'    <ul class="nav navbar-nav"> </ul>'
				+'    <form class="navbar-form navbar-right"> </form>'
				+'  </div>';
				
			return _.template(raw)(data);

		},
		render: function () {    	
			return this;
		},
		makeMenu:function() {
		},
		makeForm:function() {			
		},
	});

	NisMVC.HeaderMenu = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		className: null,
		titleClass: '.navbar-brand',
		
		initialize: function (param) {
			$(this.el).html(this.template());
		},
		template: function(data) {
			var raw = 
				'  <div class="navbar-collapse collapse">'
				+'    <ul class="nav navbar-nav"> </ul>'
				+'    <form class="navbar-form navbar-right"> </form>'
				+'  </div>';
				
			return _.template(raw)(data);

		},
		render: function () {    	
			return this;
		},
		getTemplate: function(){
			if (this.model.get("foo")){
				return "#some-template";
			} else {
				return "#a-different-template";
			}
		},
		makeMenu:function() {
		},
		makeForm:function() {			
		},
	});


})();

