/*global NisMVC:true, Backbone, $ */

var NisMVC = NisMVC || {};


(function () {
	'use strict';


	NisMVC.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			"login": "login",
			"joinUser":"joinUser"						
			
		},		
	});

	// TodoList Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models
	
	NisMVC.Controller = Backbone.Marionette.Object.extend({		

		initialize: function (options) {
			console.log("initialize: options:", options);	
			
			var token = localStorage.getItem("token");
			if ( token != null )
			{

				//token vaildation
				$.ajax({
        				// url :  "http://192.168.0.54:8080/test/data/ccm/manager?access_token="+token,        				        				        			
        				url :  "http://192.168.0.153:8880/authentication_server/data/ccm/manager?access_token="+token,        				        				        			
        				success : function(response) {
            				console.log("token exist");
            				location.href = "CcmManager.html";

        				},	
        				error : function(e) {
            				alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
        				}
    				});
			}else {	

				this.param = options;
				this.entitys = new Nis.Model.Login();
				this.uiInfo = options.LoginUi();
			}
		},

		start: function (options) {
			console.log("start: options:", options);
			this.showHeader(this.uiInfo.getHeaderInfo());
			this.showContent(this.contentsLayout());
			//this.showFooter(this.entitys);
		},
		contentsLayout:function(mode) {
			return this.param.contentsLayout(mode);
		},
		
		updateHiddenElements: function () {
			//$('#main, #footer').toggle(!!this.todoList.length);
		},

		showHeader: function (param) {
			console.log("showHeader:");
			this.headerView = new NisMVC.HeaderView(param.HeaderView);
			NisMVC.App.root.showChildView('header', this.headerView);
		},

		showFooter: function (entityList) {
			var footer = new NisMVC.FooterLayout({
				collection: entityList
			});
			NisMVC.App.root.showChildView('footer', footer);
		},

		showContent: function (options) {			
			var view = new NisMVC.ContentsLayout(options);			
			NisMVC.App.root.showChildView('contents', view);
			
		},		
		main: function () {	    			
			
			console.log("main:");
			var view = new Uic.HBView({raw:'<h1>Main</h1>', className:"aaa", tagName:"bb"});
			NisMVC.App.root.showChildView('contents', view);

			this.headerView.select('home-menu');	                                        
			
			//location.href="#userReq";
		},
		login: function(){			
			var view = new NisMVC.ContentsLayout(this.contentsLayout());			
			NisMVC.App.root.showChildView('contents', view);
		},
		joinUser: function(){
			console.log("add user");
			var view = new NisMVC.ContentsLayout(this.contentsLayout('add'));
			NisMVC.App.root.showChildView('contents', view);
			//this.headerView.select('modifyReq');
			this.headerView.select('authorityReq');	        
		}	

	});

})();
