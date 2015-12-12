/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	NisMVC.ContentsLayoutForm = Uic.LayoutView.extend({
		tagName: function() {
		    return this.options.tagName;
		},
		className: function() {
		    return this.options.className;
		},	
		initialize: function(options) {
			console.log('initialize:', options);
			this.super().initialize.call(this, options);			
			this.showItem(this.param);
		},		
		showItem:function(param) {
			this.showForm(param);
			//this.showDownItem(param);
		},
		showForm:function(param) {		
			var ui = new Nis.Model.UserAddForm(options);            
             //this.formInfo = ui.getInfo(options);	

			//var info = this.param.LoginUi().getFormInfo("add");					
			var info = ui.getInfo(options);	
			var view = new Uic.UserForm(info);
			view.model = new Nis.Model.User();	
			this.contents.show(view);					
			
		},

	});

})();

