
(function () {
	'use strict';

	NisMVC.appMenu = [
			{
				id:"showOidViewer",
				title:'OID 뷰어',
			},
			{
				id:"showOidInfo",
				title:'OID 관리',
			},
			{
				id:"showOidRequest",
				title:'OID 요청 List',
			},
			{
				id:"userManage",
				title:'User 관리',
			},				
			{
				id:"mpersonMgr",
				title:'의료인 관리',
			},
			{
				id:"orgInfo",
				title:'의료기관 정보',
			},

		];

	NisMVC.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'showOidViewer': NisMVC.appMenu[0].id,
			'showOidInfo': NisMVC.appMenu[1].id,
			'showOidRequest': NisMVC.appMenu[2].id,
			'userManage': NisMVC.appMenu[3].id,
			'mpersonMgr': NisMVC.appMenu[4].id,
			//'addReqPerson': NisMVC.appMenu[4].id,
			'orgInfo': NisMVC.appMenu[5].id,
			'register':'onRegister',
			'login':'onLogin',
			'start':'start',
		},
	});

	NisMVC.Controller = NisMVC.ClientController.extend({

		initialize: function (options) {
			console.log("initialize: options:", options);
			this.param = options;
			//options.loginLocation = 'OIDClient.html';
			options.loginLocation = '#start';
			options.title = 'OID 관리시스템';
			options.headerItems = NisMVC.appMenu;
			options.subTitle = NisMVC.App.getHospitalName();
			NisMVC.useLogin = true;
			options.hasRegisterOnLogin = true;
			NisMVC.App.type = 'oidClient';
			NisMVC.App.buttonStore().addButton(Nis.UiInfo.Buttons.allButtons);
			NisMVC.ClientController.prototype.initialize.call(this, options);
		},
		start: function (options) {
			console.log("start: options:", options);
			NisMVC.App.buttonStore().addButton(Nis.UiInfo.Buttons.allButtons);
			var token = NisMVC.App.getToken();
			//token = "temp";
			console.log("start: token:", token);
			if(token) {
				this.options.subTitle = NisMVC.App.getHospitalName();
				this.onStart(this.options);
			}
			else {
				this.showLogin(options);
			}
			this.showFooter();
		},

		onStart: function (options) {
			//console.log("onStart:", options);
			this.showHeader(options);			
			//this.showOidViewer();
			this.showOidInfo();
			//this.showOidRequest();
			//this.mpersonMgr();
			//this.userManage();
		},
		onRegister:function() {
			console.log("onRegister:", options);
			this.hideLogin();
			var options = {};
			options.headerItems = [];
			options.hasLogout = false;
			options.hasLogin = true;
			options.isClient = true;
			options.loginLocation = 'NHPClient.html';
			options.title = '의료기관 관리';
			options.subTitle = "의료기관 등록";
			this.showHeader(options);
			this.orgInfo({
				type:'register',
			});
		},
		showOidViewer: function () {
			console.log("showOidViewer:");
			var view = new Uic.VLayout({id:'oidMainLayout'});
			view.setHeader("<h1>OID 뷰어</h1>");
			view.setContents(new Nis.View.OIDMain());
			NisMVC.App.root.showChildView('contents', view);

			this.headerView.select('showOidViewer');
		},
		showOidInfo: function(options) {
			console.log("mpersonMgr:");
			//var view = new NisMVC.OIDLayout();
			var view = new NisMVC.OIDListLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('showOidInfo');
		},
		showOidRequest: function () {
			console.log("mpersonMgr:");
			var view = new NisMVC.OIDrequestLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('showOidRequest');
		},
		orgInfo: function(options) {
			console.log("orgInfo: ", options);
			var view = new NisMVC.OrgInfoLayout(options);
			view.parentView = this;
			view.on("closeView", this.onClosedView.bind(this));
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('orgInfo');
		},
		onClosedView:function(){
			this.onLogin();
		},
		mpersonMgr: function () {
			var view = new NisMVC.MPersonMgrLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('mpersonMgr');
		},
		userManage: function() {
			console.log("userManage:");
			var view = new NisMVC.UserMgrLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('userManage');
		},
	}); // end of NisMVC.Controller

})();
