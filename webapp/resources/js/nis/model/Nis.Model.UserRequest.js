
(function () {
	'use strict';

    //Nis.Model.NHPServer = "nhp";
    Nis.Model.USerRequestEntityName = "UserRequest";

	Nis.Model.UserRequest = Nis.Model.extend({
	    defaults: {
		 oid: "",
		 loginId	: "",
		 userName: "",
		 password: "",
		 countryCode: "KR",
		 phoneNumber: "",
		 eMail: "",
		 address: "",
		 city: "",
		 province: "",
		 postalCode: "",
		 requestStatus: Nis.Code.ReqStatus.request,
	      requestType: Nis.Code.RequestType.create,
		 roleName: "",
		 dateCreated: "",
		 dateVoided: "",
		 dateModified: "",
		 userCreated: "",
		 userVoided: "",
		 memo: "",
		 userType:null,
		 referenceId:0,
		 createdId:0,
		 link: "",
	    },
		initialize: function (options) {
			var v = Nis.Code.ReqStatus;
			console.log("initialize: OrgRequest " + options);
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.USerRequestEntityName,
			    serverName:Nis.Model.NHPServer,
			}, options);
			return Nis.Model.prototype.initialize.call(this, newOptions);
		},
		validateItem: function (key) {
		    return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
		},
		validateAll: function () {
	        var messages = {};

	        for (var key in this.validators) {
	            if(this.validators.hasOwnProperty(key)) {
	                var check = this.validators[key](this.get(key));
	                if (check.isValid === false) {
	                    messages[key] = check.message;
	                }
	            }
	        }

	        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
	    },	    
	    	// [20151107 leo #9794]
		confirmRequest:function(options) {
			console.log("confirmRequest:");
			this.showProgress('sending ...');
			//this.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
			var attrs = {requestStatus:Nis.Code.ReqStatus.confirmed};
			this.save(attrs, {
				success: function(model, response) {
					console.log("confirmRequest:success: "  + response);
					model.hideProgress();
				},
				error: function(model, response) {
					console.log("confirmRequest:error: "  + response);
					model.hideProgress();
					if(options && options.error) {
						options.error(model, response);
					}
				},
				wait:true,
			});
			console.log("confirmRequest: after save");
		},
	    	// [20151107 leo #9800]
		rejectRequest:function(memo, options) {
			console.log("rejectRequest:");
			this.showProgress('sending ...');
			//this.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
			var attrs = {requestStatus:Nis.Code.ReqStatus.reject};
			if(memo) {
				$.extend(attrs, {
					memo:memo,
				});
			}
			this.save(attrs, {
				success: function(model, response) {
					console.log("rejectRequest:success: "  + response);
					model.hideProgress();
				},
				error: function(model, response) {
					console.log("rejectRequest:error: "  + response);
					model.hideProgress();
					if(options && options.error) {
						options.error(model, response);
					}
				},
				wait:true,
			});
			console.log("confirmRequest: after save");
		},
		getUserInfo:function(options) {
			var url = entityUrl.url(null, "User/userId/", this.getServerName(), "no-token") + options.userId;
			$.ajax({
			    url:url,
			    dataType:"json",
			    success:options.success,
			    error:options.error,
			});			
		},
		checkUserId:function(options){
			var url = entityUrl.url(null, "check/userId/", this.getServerName(), "no-token") + options.userId;
			$.ajax({
			    url:url,
			    dataType:"json",
			    success:options.success,
			    error:options.error,
			});			
		},
	});  // end of Nis.Model.OrgRequest


	_.extend(Nis.Model.UserRequest.prototype, Nis.Model.HasNisRequest);

	Nis.Model.UserRequestList = Nis.Collection.extend({
		model: Nis.Model.UserRequest,
		initialize: function(options){
		    //console.log("initialize: ");
			var newOptions = _.extend({
				entityName:Nis.Model.USerRequestEntityName,
				serverName:Nis.Model.NHPServer,
			}, options);
			this.setItemUtil(Nis.Model.UserRequest.columns);
		    return Nis.Collection.prototype.initialize.call(this, newOptions);
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
		getRequestList:function(requestType) {
			var options = this.makeRequstListOptions(requestType);
			this.getPagedList(options);
		},
		makeRequstListOptions:function(requestType) {
			var options = {
				hasQuery:true,
				queryParam: {
					requestType:requestType,
					requestStatus:Nis.Code.ReqStatus.request					
				}
			};
			return options;
		},
		getAllNidsUsers:function() {
			var url = entityUrl.url(null, "users/oid/", this.getServerName(), "no-token") + options.oid;
			$.ajax({
			    url:url,
			    dataType:"json",
			    success:options.success,
			    error:options.error,
			});						
		},
	});  // end of Nis.Model.UserRequestList


	Nis.Model.UserRequest.columns = [
	    {
	        label:"NO",
	        dbid:"id",
	    },

	    {
	        label:"사용자명",
	        dbid:"userName",
	        required:true,
	    },

	    {
	        label:"유저아이디",
	        dbid:"loginId",
	        required:true,
	    },

	    {
	        label:"패스워드",
	        dbid:"password",
	        required:true,
	    },

	    {
	        label:"핸드폰번호",
	        dbid:"phoneNumber",
	    },

	    {
	        label:"주소",
	        dbid:"address",
	    },

	    {
	        label:"시",
	        dbid:"city",
	    },

	    {
	        label:"도",
	        dbid:"province",
	    },
	    {
	        label:"우편번호",
	        dbid:"postalCode",
	        type:"postalCode",
	    },
	    
	    {
	        label:"이메일",
	        dbid:"eMail",
	        required:true,
	    },
		{
		    label:"승인상태",
		    dbid: "requestStatus",
		    type: 'select',
              conceptId:'RequestType',
		},
		{
		    label:"요청형태", 
		    dbid: "requestType",
		    type: 'select',
              conceptId:'ReqStatus',
		},
		{
		    label:"최초생성일",
		    dbid: "dateCreated",
		},
		{
		    label:"없어진 날짜",
		    dbid: "dateVoided",
		},
		{
		    label:"최근변경일",
		    dbid: "dateModified",
		},
		{
		    label:"최근변경한 사용자",
		    dbid: "userCreated",
		},
		{
		    label:"삭제한 사용자",
		    dbid: "userVoided",
		},

	];


})();
