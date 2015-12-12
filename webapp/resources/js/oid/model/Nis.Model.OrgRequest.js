
(function () {
	'use strict';

    //Nis.Model.NHPServer = "nhp";
    //Nis.Model.NHPServer = "nmpi";
    Nis.Model.OrgRequestEntityName = "OrgRequest";

	Nis.Model.OrgRequest = Nis.Model.extend({
	    defaults: {
	        id: null,
	        oid: "",
	        locationCode: "",
	        classCode: "",
	        serialNumber: "",
	        email: "",
	        state: "",
	        phoneNumber: "",
	        address: "",
	        name: "",
	        language: "",
	        mrDeliveryEmail: "",
	        electronicServiceUri: "",
	        requestStatus: Nis.Code.ReqStatus.request,
	        requestType: Nis.Code.RequestType.create,
	        userReviewer:"",
	        memo:"",
	        link: "",

	        userRequestId:0,
	        createdId:0,

			accessTokenValidity:null,
			refreshTokenValidity:null,
	    },
		initialize: function (options) {
			var v = Nis.Code.ReqStatus;
			//console.log("initialize: OrgRequest " + options);
			//map key/value for validation
			this.validators = {
				name:this.validateName.bind(this),
			};
			var newOptions = _.extend({
			    entityName:Nis.Model.OrgRequestEntityName,
			    serverName:Nis.Model.NHPServer,
			}, options);
			return Nis.Model.prototype.initialize.call(this, newOptions);
		},
		validateName:function(name){
			console.log('validateName:', name);
			if(name.length > 1) {
				return true;
			}				
			return false;
		},
		validateItem: function (key) {
		    return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
		},
		fetch:function(options) {
			console.log("fetch: url():", this.url());
			var model = this;
		    $.ajax({
		        url:this.url(),
		        dataType:"json",
		        success:function (response) {
		            console.log("fetch success: " + response.body + ", options:" + options);
		            var values = response.body;
		            model.parse(response);
		            return Backbone.Model.prototype.fetch.call(model, options) ;
		        }
		    });
		},
		parse: function (response, options) {
			console.log("parse: Inside Parse ", response.statusCode);
			var value = response;
			if(response.statusCode != Nis.Code.ResponseOk) {
				return null;
			}
			if(response.body)
				value = response.body;
			//this.set(value);
			console.log(this.toJSON());
			return value;
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
		checkSerialNumber:function(options, onSuccessCb, onErrorCb) {
			console.log("checkSerialNumber: ");
			//[20151111 leo #9864]
			options = options || {};            
			var query = _.extend({
				hasQuery:true,
				queryParam: {
					locationCode: this.get('locationCode'),
					classCode: this.get('classCode'),
					serialNumber: this.get('serialNumber'),
					requestStatus: Nis.Code.ReqStatus.request,
					requestType: Nis.Code.RequestType.create,                   
				},
			}, options);
			var collection = new Nis.Model.OrganizationList();
			collection.getPagedList(query, onSuccessCb, onErrorCb);
		},
	    	// [20151107 leo #9794]
	    	/*
		confirmRequest:function(options) {
			console.log("confirmRequest:");
			//this.showProgress('sending ...');
			//this.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
			var attrs = {requestStatus:Nis.Code.ReqStatus.confirmed};
			this.save(attrs, {
				success: function(model, response) {
					console.log("confirmRequest:success: "  + response);
					//model.hideProgress();
					if(options && options.success) {
						options.success(model, response);
					}
				},
				error: function(model, response) {
					console.log("confirmRequest:error: "  + response);
					//model.hideProgress();
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
			//this.showProgress('sending ...');
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
					//model.hideProgress();
					if(options && options.success) {
						options.success(model, response);
					}
				},
				error: function(model, response) {
					console.log("rejectRequest:error: "  + response);
					//model.hideProgress();
					if(options && options.error) {
						options.error(model, response);
					}
				},
				wait:true,
			});  
			console.log("confirmRequest: after save");
		},		
		checkSerialNumber:function(options, onSuccessCb, onErrorCb) {
			console.log("checkSerialNumber: ");
			//[20151111 leo #9864]
			options = options || {};			
			var query = _.extend({
				hasQuery:true,
				queryParam: {
			        locationCode: this.get('locationCode'),
			        classCode: this.get('classCode'),
			        serialNumber: this.get('serialNumber'),
			        requestStatus: Nis.Code.ReqStatus.request,
			        requestType: Nis.Code.RequestType.create,			        
				},
			}, options);
			var collection = new Nis.Model.OrgRequestList();
			collection.getPagedList(query, onSuccessCb, onErrorCb);
		},
		*/

	}); //end of Nis.Model.OrgRequest

	_.extend(Nis.Model.OrgRequest.prototype, Nis.Model.HasNisRequest);

	Nis.Model.OrgRequestList = Nis.Collection.extend({
		model: Nis.Model.OrgRequest,
		initialize: function(options){
		    //console.log("initialize: ");
			var newOptions = _.extend({
				entityName:Nis.Model.OrgRequestEntityName,
				serverName:Nis.Model.NHPServer,
			}, options);
			this.setItemUtil(Nis.Model.OrgRequest.columns);
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
	}); //end of Nis.Model.OrgRequestList

            Nis.Model.OrgRequest.columns = [
                {
                    label:"일련번호",
                    dbid : "id",
                },
                {
                    label:"OID",
                    dbid: "oid" ,
                },
                {
                    label:"요양기관종별구분코드",
                    dbid: "classCode",
                    conceptId:'HospitalType',
                },
                {
                    label:"요양기관 등록번호",
                    dbid: "serialNumber",
                },
                {
                    label:"메일주소",
                    dbid: "email",
                    type:'email',
                },
                {
                    label:"전화번호",
                    dbid: "phoneNumber",
                },
                {
                    label:"주소",
                    dbid: "address",
                },
                {
                    label:"이름",
                    dbid: "name",
                },
                {
                    label:"의무기록전달 email",
                    dbid: "mrDeliveryEmail",
                },
                {
                    label:"electronic service uri",
                    dbid: "electronicServiceUri",
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
			    conceptId:'RequestType'
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
                { 
                    label:"토큰 유효기한",
                    dbid: "accessTokenValidity",
                    required:true,
                },
                {
                    label:"재발급 토큰 유효기한",
                    dbid: "refreshTokenValidity",
                    required:true,
                },

            ];

})();
