
(function () {
	'use strict';

	NisMVC.appMenu = [
		{
			id:"userManage",
			title:'User 관리',
		},	
		{
			id:"showPatientUi",
			title:'환자',
		},
		{
			id:"showHospitalUi",
			title:'병원',
		},
		{
			id:"showMpiUi",
			title:'MPI',
		},
	];


	NisMVC.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'userManage': NisMVC.appMenu[0].id,
			'showPatientUi': NisMVC.appMenu[1].id,
			'showHospitalUi': NisMVC.appMenu[2].id,
			'showMpiUi': NisMVC.appMenu[3].id,
			'login':'onLogin',
			'start':'start',
		},
	});

	NisMVC.Controller = NisMVC.ManagerController.extend({

		initialize: function (options) {
			//console.log("initialize: options:", options);
			this.param = options;
			//options.loginLocation = 'NMPIManager.html#main';
			options.loginLocation = '#start';
			options.title = '식별체계 관리시스템';
			options.headerItems = NisMVC.appMenu;
			options.subTitle = '보건복지부';
			NisMVC.useLogin = true;
			NisMVC.App.type = 'nmpiManager';
			//NisMVC.App.mgrOrgInfo = NisMVC.App.getDefaultOrgInfo({type:NisMVC.App.type});
			NisMVC.App.buttonStore().addButton(Nis.UiInfo.Buttons.allButtons);
			NisMVC.ManagerController.prototype.initialize.call(this, options);
		},
		main: function(options) {
			console.log("main:", options);			
		},
		onStart: function (options) {
			//console.log("start: options:", options);
			this.showPatientUi();
		},
		showPatientUi: function() {
			//console.log("patient: ");
			var view = new Nis.View.Patient();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('showPatientUi');
		},
		showHospitalUi: function () {
			//console.log("hospital: ");
			var view = new Nis.View.Hospital();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('showHospitalUi');
		},
		showMpiUi: function () {
			//console.log("mpi: ");
			var view = new Nis.View.Mpi();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('showMpiUi');
		},
		userManage: function() {
			//console.log("userManage:");
			var view = new NisMVC.UserMgrLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('userManage');
		},		
	});

})();
