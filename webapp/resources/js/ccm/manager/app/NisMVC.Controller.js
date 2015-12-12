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
			// this.headerView = new NisMVC.HeaderView(uiInfo);
			this.headerView = new Nis.View.HeaderView(uiInfo);
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
		main:function(){
			console.log("main:");

			var view = new Nis.View.MainPage();
			NisMVC.App.root.showChildView('contents', view);
    			// view.on('click.checkbox', this.addManager.bind(this));
    			view.on('click.Id', this.checkManager.bind(this));
    			view.on('click.addManager', this.addManager.bind(this));

			this.headerView.select('main');
		},
		manager: function () {
			console.log("main:");

			var view = new Nis.View.ManagerManagement();
			NisMVC.App.root.showChildView('contents', view);
    			// view.on('click.checkbox', this.addManager.bind(this));
    			view.on('click.Id', this.checkManager.bind(this));
    			view.on('click.addManager', this.addManager.bind(this));

			this.headerView.select('manager');
		},
		addManager:function(id, model, element){
            	console.log('onClickId:', id, model, element);
               var option = new Nis.Model.ManagerAddFormUi();
               var view = new Uic.UserForm(option.getInfo());
               var serverOption = {
                   serverName:"admin"
               }
               view.model = new Nis.Model.User("",serverOption);
               view.model.attributes.roleName="ROLE_CCM_MANAGER";
               NisMVC.App.root.showChildView('contents', view);
    			// window.location.href="#addManager";
		},
		checkManager:function(id, model, element){
            	console.log('onClickId:', id, model, element);
            	var option = new Nis.Model.ManagerCheckFormUi();
            	var view = new Uic.UserForm(option.getInfo());
            	var serverOption = {
                	serverName:"admin"
            	}
            	view.model = new Nis.Model.User("",serverOption, model.attributes);
            	// contents.currentView.setModel(model);
            	// view.setData();
            	// view.setModel(model);
            	// this.contents.currentView.setModel(model);
            
            	NisMVC.App.root.showChildView('contents', view);
    			window.location.href="#checkManager";
            	var contents = NisMVC.App.root.contents;
            	contents.currentView.setModel(view.model);
		},
		user: function(options) {
			console.log("user:");
			// console.log("viewer: ", options);
			// var view = new NisMVC.OrgInfoLayout(NisMVC.uiStore.orgVLayoutUi);
			// NisMVC.App.root.showChildView('contents', view);
			// this.headerView.select('viewer');
			this.headerView.select('user');
		},
		approval: function() {
			console.log("approval:");

			var view = new Nis.View.ApprovalManagement();
			NisMVC.App.root.showChildView('contents', view);
    			view.on('click.approvalUserId', this.approvalUser.bind(this));
    			window.location.href="#approval";
			// console.log("evaluate:");
			// var view = new NisMVC.MProviderMgrLayout(NisMVC.uiStore.ProviderAddLayoutUi);
			// NisMVC.App.root.showChildView('contents', view);
			// this.headerView.select('evaluate');
			this.headerView.select('user');
		},
		approvalUser:function(id, model, element){
			console.log('onClickUserId:', id, model, element);
            	var option = new Nis.Model.UserApprovalFormUi();
            	var view = new Uic.UserForm(option.getInfo());
            	var serverOption = {
                	serverName:"admin"
            	}
            	view.model = new Nis.Model.User("",serverOption, model.attributes);
            	// contents.currentView.setModel(model);
            	// view.setData();
            	// view.setModel(model);
            	// this.contents.currentView.setModel(model);
            
            	NisMVC.App.root.showChildView('contents', view);
    			window.location.href="#approvalUser";
            	var contents = NisMVC.App.root.contents;
            	contents.currentView.setModel(view.model);
		},
		userInfo: function() {
			console.log("userInfo:");

			var view = new Nis.View.UserInfoManagement();
			NisMVC.App.root.showChildView('contents', view);
    			view.on('click.checkUserId', this.checkUser.bind(this));
    			view.on('click.addUser', this.addUser.bind(this));
    			window.location.href="#userInfo";
			// console.log("evaluate:");
			// var view = new NisMVC.MProviderMgrLayout(NisMVC.uiStore.ProviderAddLayoutUi);
			// NisMVC.App.root.showChildView('contents', view);
			// this.headerView.select('evaluate');
			this.headerView.select('user');
		},
		addUser:function(pageNumber){
			console.log("addUser");
               var option = new Nis.Model.UserAddFormUi();
               var view = new Uic.UserForm(option.getInfo());
               var serverOption = {
                   serverName:"admin"
               }
               view.model = new Nis.Model.User("",serverOption);
               NisMVC.App.root.showChildView('contents', view);
    			window.location.href="#addUser";
		},
		checkUser:function(id, model, element){
            	console.log('onClickCheckUserId:', id, model, element);
               var option = new Nis.Model.UserModifyFormUi();
               var view = new Uic.UserForm(option.getInfo());
               var serverOption = {
                   serverName:"admin"
               }
               view.model = new Nis.Model.User("",serverOption, model.attributes);
               NisMVC.App.root.showChildView('contents', view);
    			window.location.href="#checkUser";
            	var contents = NisMVC.App.root.contents;
            	contents.currentView.setModel(view.model);
            	// var option = new Nis.Model.UserCheckFormUi();
            	// var view = new Uic.UserForm(option.getInfo());
            	// var serverOption = {
             //    	serverName:"admin"
            	// }
            	// view.model = new Nis.Model.User("",serverOption, model.attributes);
            	// // contents.currentView.setModel(model);
            	// // view.setData();
            	// // view.setModel(model);
            	// // this.contents.currentView.setModel(model);
            
            	// NisMVC.App.root.showChildView('contents', view);
            	// var contents = NisMVC.App.root.contents;
            	// contents.currentView.setModel(model);
		},
		requestDrop: function() {
			console.log("requestDrop:");

			var view = new Nis.View.RequestDropManagement();
			NisMVC.App.root.showChildView('contents', view);
    			view.on('click.Id', this.dropUser.bind(this));
    			window.location.href="#requestDrop";
			// console.log("evaluate:");
			// var view = new NisMVC.MProviderMgrLayout(NisMVC.uiStore.ProviderAddLayoutUi);
			// NisMVC.App.root.showChildView('contents', view);
			// this.headerView.select('evaluate');
			this.headerView.select('user');
		},
		dropUser:function(id, model, element){
            	console.log('onClickDropUserId:', id, model, element);
               var option = new Nis.Model.UserDropFormUi();
               var view = new Uic.UserForm(option.getInfo());
               var serverOption = {
                   serverName:"admin"
               }
               view.model = new Nis.Model.User("",serverOption, model.attributes);
               var auth = model.attributes.roleName;
               if(auth === 'ROLE_CCM_DEVELOPER')
               		view.model.attributes.roleName = "개발자";
               else if(auth === 'ROLE_CCM_PROFESSIONAL')
               		view.model.attributes.roleName = "전문가";
               NisMVC.App.root.showChildView('contents', view);
    			window.location.href="#dropUser";
            	var contents = NisMVC.App.root.contents;
            	contents.currentView.setModel(view.model);
		},
		ccm: function () {
			console.log("ccm:");

			var view = new Nis.View.CCMManagement();
			NisMVC.App.root.showChildView('contents', view);
			view.on('click.versionControl', this.versionControl.bind(this));
			// console.log("register:");
			// var view = new NisMVC.MPersonMgrLayout(NisMVC.uiStore.mpersonMgrUi);
			// NisMVC.App.root.showChildView('contents', view);
			// this.headerView.select('register');
			this.headerView.select('ccm');
		},
		versionControl:function(model){
			console.log("ccm versionControl:");

			var view = new Nis.View.CCMVersionControl(model);
			NisMVC.App.root.showChildView('contents', view);
			view.on('click.versionInfo', this.versionInfo.bind(this));
    			window.location.href="#ccmVersionControl";
		},
		versionInfo:function(model){
			console.log("ccm versionInfo:");			

               var option = new Nis.Model.CCMVersionInfoFormUi();
               var view = new Uic.CCMVersionForm(option.getInfo());
               NisMVC.App.root.showChildView('contents', view);
            	var contents = NisMVC.App.root.contents;
            	contents.currentView.setModel(model);
    			window.location.href="#ccmVersionInfo";
		},
		logout: function() {
			console.log("logout:");			

            	localStorage.removeItem("token");
            	location.href="Login.html";
		},
	});
})();
