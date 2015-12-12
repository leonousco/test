
(function () {
	'use strict';

	NisMVC.appMenu = [
		{
			id:"OIDReqManager",
			title:'OID 요청 관리',
		},
		{
			id:"OIDList",
			title:'OID List',
		},
		{
			id:"addNHPReq",
			title:'의료기관 생성 관리',
		},
		{
			id:"modifyOrg",
			title:'의료기관 정보 변경 관리',
		},
		/*
		{
			id:"modifyUser",
			title:'사용자 정보 변경 관리',
		},
		*/
	];


	NisMVC.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'OIDReqManager': NisMVC.appMenu[0].id,
			'OIDList': NisMVC.appMenu[1].id,
			'addNHPReq': NisMVC.appMenu[2].id,
			'modifyOrg': NisMVC.appMenu[3].id,
			//'modifyUser': NisMVC.appMenu[4].id,
			'login':'onLogin',
			'start':'start',
		},
	});

	NisMVC.Controller = NisMVC.ManagerController.extend({

		initialize: function (options) {			
			console.log("initialize: options:", options);
			this.param = options;
			//options.loginLocation = 'OIDManager.html';
			options.loginLocation = '#start';
			options.title = 'OID 관리시스템';
			options.headerItems = NisMVC.appMenu;
			options.subTitle = '보건복지부';
			NisMVC.useLogin = true;
			NisMVC.App.type = 'oidManager';			
			options.appAccessLevel = Nis.Code.RoleName.oidManager;
			NisMVC.App.buttonStore().addButton(Nis.UiInfo.Buttons.allButtons);
			NisMVC.ManagerController.prototype.initialize.call(this, options);			
		},
		/*
		main: function(options) {
			console.log("main:", options, NisMVC.App.userInfo);
			this.showHeader();
			this.addNHPReq();
			this.showFooter();
		},
		*/		
		onStart: function (options) {
			//console.log("onStart:", options);
			this.OIDReqManager();
			//this.addNHPReq();
			//this.showFooter(this.entitys);
			//this.OIDList();
		},
		addNHPReq: function(options) {
			console.log("addNHPReq: ", options);
			var view = new NisMVC.OrgInfoLayout({
				reqStatusType:Nis.Code.RequestType.create,
			});
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('addNHPReq');
		},
		OIDList: function(options) {
			console.log("OIDList: ", options);
			var view = new NisMVC.OIDListLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('OIDList');
		},
		modifyOrg: function() {
			console.log("modifyOrg:");
			var view = new NisMVC.OrgModifyLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('modifyOrg');
		},
		modifyUser: function() {
			console.log("modifyUser:");
			var view = new NisMVC.UserModifyLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('modifyUser');
		},
		OIDReqManager: function() {
			console.log("OIDReqManager:");
			var view = new NisMVC.OIDReqManager();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('OIDReqManager');
		},

		
	});

})();
