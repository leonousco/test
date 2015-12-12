(function () {
	'use strict';

	NisMVC.BaseController = Backbone.Marionette.Object.extend({
		initialize: function (options) {
			//console.log("initialize: options:", options);
			this.options = options;
			var token = NisMVC.App.getToken();
			if(token) {
				this.loadUserInfo();
			}
		},
		start: function (options) {
			//console.log("start: options:", options);
			if(options)
				this.options = options;

			var token = NisMVC.App.getToken();			
			//console.log("start: token:", token);
			if(token) {
				this.showHeader(this.options);
				this.onStart(this.options);
				this.showFooter(this.entitys);				
			}
			else {
				this.showLogin({
					isClient:this.options.isClient,
					location:this.options.loginLocation,
					hasRegister:this.options.hasRegisterOnLogin || false,
					appAccessLevel:this.options.appAccessLevel,
				});
			}								
		},
		loadUserInfo:function(){
			var options = {
				token:NisMVC.App.getToken(),
				success:this.onSuccessUserInfo.bind(this),
				error:this.onErrorUserInfo.bind(this),
			}
			var model = new Nis.Model.Login();
			model.getRole(options);
		},
		onSuccessUserInfo:function(resp) {
			console.log('onSuccessUserInfo:', resp);
			NisMVC.App.userInfo = resp.userInfo;
		},
		onErrorUserInfo:function(resp) {
			console.error('onErrorUserInfo:', resp);
			//NisMVC.App.userInfo = resp.userInfo;
		},
		onStart:function(options){
			console.log("onStart:", options);
		},
		showHeader: function (options) {
			//console.log("showHeader:", options);
			var headerOptions = {
				title: options.title,
				items: options.headerItems,
				isClient:options.isClient,
				hasLogout:options.hasLogout,
				hasLogin:options.hasLogin,
				subTitle: options.subTitle || '',
				onClickLogin:this.onClickLogin.bind(this),
			};
			this.headerView = new NisMVC.HeaderView(headerOptions);
			this.headerView.on('onClickLogout', this.onClickLogout.bind(this));
			this.headerView.on('onClickLogin', this.onClickLogin.bind(this));
			NisMVC.App.root.showChildView('header', this.headerView);
		},
		showFooter: function () {
			var footer = new View.Footer();			
			NisMVC.App.root.showChildView('footer', footer);
			$('#footer').css('background-color', '#ececec'); //; width: 100%; position: relative;');			
		},
		onLogin:function(options){
			//console.log("onLogin:", options);
			this.loginDlg = new Uic.LoginDialog(this.options);
			this.loginDlg.open();
		},
		showLogin:function(options) {
			//console.log("showLogin:");
			var fragment = Backbone.history.getFragment();
			if(fragment === 'login'){
				this.onLogin(options);
				return;
			}
			else {
				var ret = this.router.navigate('login', {replace:true, trigger:true}, options);			
				//console.log("showLogin:", ret);				
			}
		},		
		hideLogin:function(){
			if(this.loginDlg) {
				this.loginDlg.hide();
				this.loginDlg = null
			}				
		},
		onClickLogout:function(){
			//console.log("onClickLogout:");
			NisMVC.App.setToken();
			this.showLogin(this.options);
		},
		onClickLogin:function(){
			//console.log("onClickLogin:");
			this.router.navigate('login', {replace:true, trigger:true});			
		},
	});

})();
