/*global NisMVC:true, Backbone, $ */

var NisMVC = NisMVC || {};


(function () {
	'use strict';

	// TodoList Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models

	NisMVC.Controller = Backbone.Marionette.Object.extend({

		initialize: function (options) {
			console.log("initialize: options:", options);
			this.param = options;
		},

		start: function (options) {
			console.log("start: options:", options);
			this.showHeader();
			this.showFooter();
			this.main();
    			$(".dropdown-toggle").dropdown();
		},
		showHeader: function () {
			console.log("showHeader:");
			var uiInfo = (new Nis.UiInfo.AppHeader()).getInfo().HeaderView;
			this.headerView = new NisMVC.HeaderView(uiInfo);
			NisMVC.App.root.showChildView('header', this.headerView);
		},

		showFooter: function () {
			var footer = new View.Footer();
			NisMVC.App.root.showChildView('footer', footer);
		},

		showContent: function (options) {
			var view = new NisMVC.ContentsLayout(options);
			//var view = new Uic.Form({"uiInfo":this.uiInfo});
			NisMVC.App.root.showChildView('contents', view);
		},
		main: function () {
			console.log("main:");
			var option = new Nis.UiInfo.CCMInfo();
			var view = new Nis.View.CCMInfo(option.getInfo());
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('main');
		},
		register:function(){
			console.log("register:");
			var option = new Nis.UiInfo.CCMRegister();
			var view = new Nis.View.CCMRegister(option.getInfo());
			var serverOption = {
				serverName:"ccm",
			}
			view.model = new Nis.Model.CCMReg("",serverOption);
			NisMVC.App.root.showChildView('contents', view);
		},
		viewer: function() {
			console.log("viewer:");
			var view = new Nis.View.CCMList();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('viewer');
		},
		evaluate: function () {
			console.log("evaluate:");
			var view = new Nis.View.CCMEvaluateRequest();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('evaluate');
		},
		detail: function () {
			console.log("detail:");
			//var view = new Nis.View.CCMSearchDetail();
			var view = new Nis.View.CCMSearchDetail();
			NisMVC.App.root.showChildView('contents', view);
		},
		logout: function() {
			console.log("logout:");			
            	//localStorage.removeItem("token");
            	location.href="Login.html";
		},
	});
})();
