
(function () {
	'use strict';

	NisMVC.HeaderView = Backbone.Marionette.LayoutView.extend({
		param:null,
		events: {
		    "keyup .search-query": "search",
		    "keypress .search-query": "onkeypress",
		    //"click .search-query": "clean"	
		},
		regions: {
			header: ".navbar-header",
			collapse: ".navbar-collapse",
		},
		tagName: function() {
			return this.options.tagName;
		},
		className: function() {
			return this.options.className;
		},
		initialize: function (param) {
			this.param = param;
			$(this.el).html(this.template());
			this.makeChildView(this.param.HeaderTitle, this.regions.header);
			this.makeChildView(this.param.HeaderCollapse, this.regions.collapse);
			this.makeLogoutView();
			//this.$el.parent().parent().css("background-image", 'url("resources/images/nis/mg_header.png") repeat');
			//this.$el.parent().parent().css("background", 'url("resources/images/nis/mg_header.png")');
		},
		makeLogoutView:function() {
			var view = this.$el.find('#logout_button');			
			if(view.length >= 1) {
				view.on('click', this.onClickLogout.bind(this));
			}
		},
		onClickLogout:function(){
			console.log('onClickLogout:');
			NisMVC.App.setToken();
			//localStorage.removeItem("token");
		},
		makeChildView:function(childParam, region) {
			var view = new Uic.HBView(childParam);
			var view3 = this.$el.find(region);
			$(view3).replaceWith(view.el);
		},
		template: function(data) {		
			return _.template(this.param.raw)(data);
		},
	    render: function () {    	
	        //$('.dropdown', this.el).append(this.searchresultsView.render().el);
	        return this;
	    },	
	    select: function(menuItem) {
	        $('.nav li').removeClass('active');
	        $('.' + menuItem).addClass('active');
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
	}); // end of NisMVC.HeaderView

})();

