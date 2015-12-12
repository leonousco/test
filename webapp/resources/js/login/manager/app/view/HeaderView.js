/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';


	// ------------------
	// Layout Header View
	// ------------------
	NisMVC.HeaderView = Backbone.Marionette.LayoutView.extend({
		param:null,
		tagName: function() {
			return this.options.tagName;
		},
		className: function() {
			return this.options.className;
		},

		regions: {
			header: ".navbar-header",
			collapse: ".navbar-collapse",
		},
		
		initialize: function (param) {
			this.param = param;
			$(this.el).html(this.template());

			/*
			var headerTitle = new Uic.HBView(this.param.HeaderTitle);
			if(this.param.HeaderTitle.replaceToParent) {
				var view3 = this.$el.find(this.regions.header);
				$(view3).replaceWith(headerTitle.el);
			}
			*/
			this.makeChildView(this.param.HeaderTitle, this.regions.header);
			//this.makeChildView(this.param.HeaderTitle, this.regions.collapse);
			this.makeChildView(this.param.HeaderCollapse, this.regions.collapse);
			//this.makeChildView(this.param.HeaderCollapse, this.regions.header);
		},
		makeChildView:function(childParam, region) {
			var view = new Uic.HBView(childParam);
			//if(childParam.replaceToParent) {
				var view3 = this.$el.find(region);
				$(view3).replaceWith(view.el);
			//}
			//else {
			//	this.showChildView(region, view);
			//}
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
	    
	    events: {
	        "keyup .search-query": "search",
	        "keypress .search-query": "onkeypress",
	        "click .search-query": "clean"	
	    },

	    search: function () {    	
	    	$('#loadingimage').show();
	    	
	        var key = $('#searchText').val();
	        
	        console.log('search ' + key);
	        
	        this.searchResults.findByName(key);
	        
	        var size = this.searchResults.length;
	        
	        setTimeout(function () {        	
	        	$('.dropdown').addClass('open');
	        	$('#loadingimage').hide();        	
	        	//$('.dropdown-menu').fadeIn(1000);
	        }, 1500);        
	        
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

