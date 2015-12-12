
var NisMVC = NisMVC || {};

(function () {
	'use strict';

	var NisApp = Backbone.Marionette.Application.extend({
		initialize: function(options) {
			//console.log('initialize:', options);
		},
		setRootLayout: function (options) {
			//console.log("setRootLayout: options:", options);
			this.root = new NisMVC.RootLayout(options);				
		},
		buttonStore:function() {
			if(_.isUndefined(this.buttonSet)) {
			    this.buttonSet = new Nis.ButtonStore();
			}
			return this.buttonSet;
		},
		saveOidInfo:function(options) {
			localStorage.setItem('nis_oid_information_'+this.type, JSON.stringify(options));
			/*
			{
				oid:oid,
				hospitalName:hospitalName,
				userId:userId,
			}
			*/
		},
		getOidInfo:function() {
            var oidInfoStr = localStorage.getItem('nis_oid_information_'+this.type);
            var oidInfo = eval("("+oidInfoStr+")");
            return oidInfo;
		},
		saveOrgInfo:function(organization){
			localStorage.setItem('nis_org_information_'+this.type, JSON.stringify(organization));
		},
		getOrgInfo:function() {
			var str = localStorage.getItem('nis_org_information_'+this.type);
			var info = eval("("+str+")");
			return info;
		},
		getHospitalName:function() {
			var oidInfo = this.getOidInfo();
			if(oidInfo)
				return oidInfo.hospitalName;
			return null;
		},
		getHospitalOid:function() {
			var oidInfo = this.getOidInfo();
			if(oidInfo)
				return oidInfo.oid;
			return null;
		},
		getUserId:function() {
			var oidInfo = this.getOidInfo();
			if(oidInfo)
				return oidInfo.userId;
			return null;
		},
		getToken:function() {
			return localStorage.getItem('token_'+this.type);
		},
		setToken:function(token) {
			if(_.isUndefined(token))
				localStorage.removeItem('token_'+this.type);
			else
				localStorage.setItem('token_'+this.type, token);
		},
		checkAccessLevel:function(userInfo){
		},
		getDefaultOrgInfo:function(options) {
			if(options.type === 'nmpiManager' || options.type === 'oidManager') {
				var ret = {
					oid: Nis.Model.OID.rootId,
					name:"SSIS",
					address:"Seoul",
					email: 'app.nousco@gmail.com',
					phoneNumber: '02-1122-3344',
				};
				return ret;				
			}
			return null;
		},
	    getRequredAccessLevel:function() {
	        switch(NisMVC.App.type) {
	        case 'oidClient':
	            return Nis.Code.RoleName.nidsOrgManager;                            
	        case 'nmpiClient':
	            return Nis.Code.RoleName.nidsUser;                          
	        case 'nmpiManager':
	            return Nis.Code.RoleName.nmpiManager;                           
	        case 'oidManager':
	            return Nis.Code.RoleName.oidManager;                            
	        }
	    },    		
	});

	NisMVC.App = new NisApp();
	NisMVC.templateManager = new Marionette.TemplateManager();
	NisMVC.evnMaganger = new EnvManager();
	NisMVC.code = new Nis.Code();

	NisMVC.App.on('before:start', function (options) {
		///console.log("before:start, options:", options);
			//rootLayout = options.rootLayout;
		NisMVC.App.setRootLayout(options.rootLayout);
	});

	NisMVC.App.on("start", function(options){
		//console.log("start, options:", options);
	});

})();
