/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
	'use strict';


	Uic.PageHeader = Backbone.Marionette.ItemView.extend({
		element:null,
		titleParam:null,
		h1_title:"",
		s_title:"",


		initialize: function (title) {
				this.setTitle(title);
	/*		this.render();*/
		},

		template:function(data) {
			var raw = '<h1 id="h1_title"><%= h1_title %> <small id="s_title"> <%=s_title%> </small></h1>';
               return _.template(raw)(data);
		},
	    render: function () {
	        $(this.el).html(this.template(this.titleParam));
	        return this;
	    },

	     setTitle: function(title){
	     	this.h1_title = title.h1_title;
	     	this.s_title = title.s_title;
	     	this.titleParam = title;
	     	this.render();
	     },


	});


})();

