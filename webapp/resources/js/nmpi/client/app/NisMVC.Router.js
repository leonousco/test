
(function () {
	'use strict';

	NisMVC.appMenu = [
			{
				id:"search",
				title:'환자 검색',
			},
			{
				id:"add",
				title:'환자 등록',
			},
			{
				id:"merge",
				title:'환자 병합',
			},
			 {
			 	id:"test",
			 	title:'test',
			 },
		];


	NisMVC.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'search': NisMVC.appMenu[0].id,
			'add': NisMVC.appMenu[1].id,
			'merge': NisMVC.appMenu[2].id,
			//'userManage': NisMVC.appMenu[3].id,
			 'test':NisMVC.appMenu[3].id,
			'login':'onLogin',
		},
	});

	NisMVC.Controller = NisMVC.ClientController.extend({

		initialize: function (options) {
			console.log("initialize: options:", options);
			this.param = options;
			//this.entitys = new Nis.Model.Organization();
			options.loginLocation = 'NMPIClient.html';
			options.title = '환자 식별체계 관리시스템';
			options.headerItems = NisMVC.appMenu;
			options.subTitle = NisMVC.App.getHospitalName();
			NisMVC.useLogin = true;
			NisMVC.App.type = 'nmpiClient';
			NisMVC.App.buttonStore().addButton(Nis.UiInfo.Buttons.allButtons);
			NisMVC.ClientController.prototype.initialize.call(this, options);
		},
		onStart: function (options) {

				//this.merge();
				//this.test();
				//this.userManage();
				this.add();
				//this.search();
		},
		search: function(options) {
			console.log("search: ", options);
			var view = new NisMVC.PatientSearchLayout(NisMVC.uiStore.patientListLayoutUi);
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('search');
		},
		merge: function (options) {
			console.log("merge: ", options);
			//var view = new NisMVC.MergeInfoLayout(NisMVC.uiStore.patientMergeLayoutUi);
			var view = new NisMVC.MergeInfoLayout();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('merge');
		},
		add: function (options) {
			console.log("add: ", options);
			var view = new NisMVC.PatientAdd();
			NisMVC.App.root.showChildView('contents', view);
			this.headerView.select('add');
		},
		test: function() {
			console.log("test:");
			var view = new NisMVC.TestLayout();
			NisMVC.App.root.showChildView('contents', view);
			//NisMVC.App.root.showChildView('contents', new Uic.HBView('test'));
			this.headerView.select('test');
		},
		testModal:function() {
		      var ModalContent = Backbone.View.extend({
		        render: function() {
		          this.$el.html('Modal content');
		          return this;
		        }
		      });
		      setTimeout(function() {
		        var modal = new Backbone.BootstrapModal({
		          animate: true,
		          content: new ModalContent()
		        }).open(function(){
		        	console.log('clicked OK')
		        });
		      }, 1000);
		},

	}); //end of NisMVC.Controller

})();
