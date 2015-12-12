
(function () {
	'use strict';

	Nis.Model.Login =Nis.Model.extend({
	    defaults: {
	    		username:"",
	    		password:"",
	    		oid : "seoul"
	    },
	    idAttribute : "username",

		url : function() {
			var link = this.attributes.link;
			console.log("url(): link:", link);
			if(link) {
				return link;
			}
			return entityUrl.url(this.id);
		  },

		initialize: function (options) {
	        //map key/value for validation
	        console.log('initialize:', options);
			this.validators = {
				clientSecret :"Secert를 입력해주세요",
				accessTokenValidity : "토근유효기간을 입력해주세요",
				refreshTokenValidity : "토큰 유효시간을 입력해주세요"

			};
			// this.attributes.oid = options.oid;
			// var newOptions = _.extend({
			//     entityName:Nis.Model.Login.EntityName,
			//     serverName:Nis.Model.Login.Server,
			// }, options);
			// return Nis.Model.prototype.initialize.call(this, newOptions);


	        //this.validators.displayName = function (value) {
	        //    return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter an displayName"};
	        //};
	    },

	    validateItem: function (key) {
	        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
	    },
	    fetch:function(options,id) {
	    	console.log("fetch: url():");
	    	var model = this;
		    $.ajax({
		        url:entityUrl.url(id,"authentication"),
		        dataType:"json",
		        success:function (response) {
		            console.log("fetch success: " + response.body + ", options:" + options);
		            var value = response.body;
		            model.set(value);
		            return Backbone.Model.prototype.fetch.call(model, options) ;
		        }
		    });
	    },
		parse: function (response) {
			console.log("Inside Parse");
			var value = response;
			if(response.body)
				value = response.body;

			//this.set(value);
			console.log(this.toJSON());
			return value;
		},

		validateAll: function () {
			console.log("validation All");
	         var messages = {};
	         //validation check

	         for (var key in this.validators) {
	             if(this.validators.hasOwnProperty(key)) {
	             		var check = this.get(key).length > 0 ? {isValid: true} : {isValid: false};
	                  if (check.isValid === false) {
	                  	messages[key] = this.validators[key];
	                	}
	            	}
	        	}
	        return messages;
	    },
        getEntityUrl:function() {
            //var token = localStorage.getItem("token") || "no-token";
            var url = entityUrl.url(null, this.getEntityName(), this.getServerName());
            console.log("getEntityUrl:", " url:", url);
            return url;
        },	    
		login : function(options) {
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
						console.log("apikey get success");
						options.response = response.body;
						cthis.getToken(options);

					},
					error : function(e) {
						alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
						options.error();
					}
				});
		},
		getToken : function(options){
				console.log("getToken :", options);
				var data = options.response.split("^");
				var sendData = {
					grant_type :"password",
					client_id : data[0],
					client_secret : data[1],
					username : options.username,
					password : options.password

				}

				$.ajax({
					url : entityUrl.url(null, "oauth/token", Nis.Model.Login.Server), //"http://192.168.0.54:8080/test/oauth/token",
					type : "POST",
					data : sendData,
					//dataType: "json",
					success : function(data) {
		    			// data는 서버로부터 전송받은 결과(JSON)이므로 바로 사용한다\
		    			var token = data.value;
		    			//alert(token);
		    			localStorage.removeItem("token");
		    			localStorage.setItem("token", token);
		    			console.log(localStorage.getItem("token"));
		    			//location.href="CcmManager.html";
		    			options.location = options.location || '';
		    			location.href=options.location;
		    			options.success(options.location);

					},
					error : function(e) {
						console.error("getToken:",e);		
			    			alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
			    			options.error();
					}
				});

		},



	}); // end of Nis.Model.Login

    Nis.Model.Login.Server = "authentication_server";
    Nis.Model.Login.EntityName = "login/apikey";


	Nis.Model.LoginList = Backbone.Collection.extend({
	//Nis.Model.OrganizationList = Backbone.PageableCollection.extend({
		model: Nis.Model.ApiKey,
		//url: "http://localhost:8080/nhp_server/api/v1/Organization/list",
		url: function() {
			return entityUrl.url() + "/list";
		},

	    initialize: function(){
	        console.log("Accounts collection initialized", this.url);
	    },
	    fetch:function(options) {
	    	console.log("fetch:", this.url());
	    	var collection = this;
		    $.ajax({
		        url:collection.url(),
		        dataType:"json",
		        success:function (response) {
		            console.log("fetch success: " + response.body + ", options:" + options);
		            var values = response.body;
		            collection.parse(response);
		            return Backbone.Collection.prototype.fetch.call(collection, options) ;
		        }
		    });
	    },
		parse: function (response) {
			console.log("Inside Parse");
			var values = response.body;
			for (var i = 0, length = values.length; i < length; i++) {
				var currentValues = values[i];
				this.push(currentValues);
			}
			console.log(this.toJSON());
			return this.models;
		},
		findByName:function (key) {
			var url = entityUrl.url() + "/query?displayName="+key;
			console.log('findByName: ' + url);
			console.log('findByName: ' + key);
			var self = this;
		    $.ajax({
		        url:url,
		        dataType:"json",
		        success:function (data) {
		            console.log("search success: " + data.body.length);
		            self.reset(data.body);
		        }
		    });
		},
	});
})();
