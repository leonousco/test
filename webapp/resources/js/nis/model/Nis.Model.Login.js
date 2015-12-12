
(function () {
	'use strict';

	Nis.Model.Login =Nis.Model.extend({
		defaults: {
				username:"",
				password:"",
				oid : "seoul"
		},
		idAttribute : "username",
		initialize: function (options) {
		    //console.log('initialize:', options);
			this.validators = {
				clientSecret :"Secert를 입력해주세요",
				accessTokenValidity : "토근유효기간을 입력해주세요",
				refreshTokenValidity : "토큰 유효시간을 입력해주세요",
			};
			var newOptions = _.extend({
			    entityName:Nis.Model.Login.EntityName,
			    serverName:Nis.Model.Login.Server,
			}, options);
			return Nis.Model.prototype.initialize.call(this, newOptions);
		},
		validateItem: function (key) {
		    return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
		},
		getEntityUrl:function() {
		    var url = entityUrl.url(null, this.getEntityName(), this.getServerName());
		    console.log("getEntityUrl:", " url:", url);
		    return url;
		},	    
		login:function(options) {
			//this.model.url = entityUrl.url(null, "login/apikey", "authentication_server");//"http://192.168.0.54:8080/test/login/apikey";
			options.username = options.username || this.attributes.username;
			options.password = options.password || this.attributes.password;

			var cthis = this;
			console.log("showTestModal: on modal button clicked, args:",options, cthis.attributes);

			if(! _.isUndefined(NisMVC.useLogin) && ! NisMVC.useLogin) {
				localStorage.removeItem("token");
				localStorage.setItem("token", 'test-token');
				options.success(options.location);
				return;
			}
			$.ajax({
				url :  this.getEntityUrl(),
				type : "POST",
				data : JSON.stringify( cthis.attributes ),
				contentType:"application/json",
				success : function(response) {
					//console.log("apikey get success");
					options.response = response.body;
					cthis.getToken(options);
				},
				error : function(e) {
					//alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
					options.error(Nis.Model.Login.ERR_failGetKey, e);
				}
			});
		},
		getToken: function(options){
			//console.log("getToken :", options);
			var data = options.response.split("^");
			var sendData = {
				grant_type :"password",
				client_id : data[0],
				client_secret : data[1],
				username : options.username,
				password : options.password,
			}
			var self = this;

			$.ajax({
				url : entityUrl.url(null, "oauth/token", Nis.Model.Login.Server), //"http://192.168.0.54:8080/test/oauth/token",
				type : "POST",
				data : sendData,
				success : function(data) {
					options.token = data.value;
					self.getRole(options);
				},
				error : function(e) {
					console.error("getToken:",e);		
		    			//alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
		    			options.error(Nis.Model.Login.ERR_failGetToken, e);
				},
			});
		},
		getRole:function(options) {
			var url = entityUrl.url(null, "token", Nis.Model.Login.Server)
				+ "/" + options.token;
			console.log('getRole:', url);
			$.ajax({
				url:url,
				dataType:"json",
				success: function(resp){
					console.log("success:", resp);
					// TODO
					if(resp.body.roleName !== NisMVC.App.getRequredAccessLevel()) {
						options.error(Nis.Model.Login.ERR_unmatchRole, options);
					}
					else {
			    			//localStorage.removeItem("token");
			    			NisMVC.App.setToken(options.token);
			    			if(options.location) {
				    			options.location = options.location || '';
				    			location.href = options.location;			    				
			    			}
			    			options.userInfo = resp.body;		    			
						options.success(options);						
					}
				},			    	
				error:function() {
					options.error(Nis.Model.Login.ERR_failGetRole, e);
				},				
			});			
		},
	}); // end of Nis.Model.Login

    Nis.Model.Login.Server = "authentication_server";
    Nis.Model.Login.EntityName = "login/apikey";

    Nis.Model.Login.ERR_unmatchRole = -100;
    Nis.Model.Login.ERR_failGetRole = -110;
    Nis.Model.Login.ERR_failGetToken = -200;
    Nis.Model.Login.ERR_failGetKey = -300;



})();
