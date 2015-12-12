
(function () {
	'use strict';

	Uic.NavHeader = Backbone.Marionette.ItemView.extend({
		tagName: 'nav',
		className: 'navbar navbar-default navbar-fixed-top',
		role: "navigation",
		element:null,
		title:"",

		initialize: function (title) {
			if(title) {
				this.title = title.title;
			}

			$(this.el).html(this.template());
			this.setTitle(this.title);
		},
		template:function(data) {
			var raw = 
				'<div class="container-top">'
				+'  <div class="navbar-header">'
				+'    <a class="navbar-brand" href="/"> Nav Ttile </a>'
				+'  </div>'
				+'</div>';
			return _.template(raw)(data);
		},        

		render: function () {    		    	
			return this;
		},	
		removeTopElement: function () {
			// Get rid of that pesky wrapping-div.
			// Assumes 1 child element present in template.
			this.$el = this.$el.children();
			// Unwrap the element to prevent infinitely 
			// nesting elements during re-render.
			this.$el.unwrap();
			this.setElement(this.$el);
		},	    
		setTitle: function (title) {    	
			var el =  this.$(".navbar-brand");
			el.text(title);
			return this;
		},	

		select: function(menuItem) {
			$('.nav li').removeClass('active');
			$('.' + menuItem).addClass('active');
		},
		
		events: {
			"keyup .search-query": "search",
			"keypress .search-query": "onkeypress",
			"click .search-query": "clean"	
		},

		onkeypress: function (event) {
			if (event.keyCode == 13) {
				event.preventDefault();
			}
		},

		select: function(menuItem) {
			$('.nav li').removeClass('active');
			$('.' + menuItem).addClass('active');
		},
		
		clean: function () {      	
			$('#searchText').val("");
		},
		
	});



})();

