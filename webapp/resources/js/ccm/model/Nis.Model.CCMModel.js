
(function () {
	'use strict';


	Nis.Model.CCMModel = Nis.Model.extend({
		defaults: {
		    no: null,
		    userId:null,
		    oid:null,
		    id:null,
		    userName:null,
		    passWord: "",
		    countryCode:null,
		    phoneNumber:null,
		    eMail:null,
		    enable:null,
		    address:null,
		    city:null,
		    province:null,
		    postalCode:null,
		    createDate:null,
		    modifyDate:null,
		    requestType:"",
		    requestStatus:"",
		    roleName:null,
		},
		idAttribute:"userId",
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.CCMModel.EntityName,
			    serverName:Nis.Model.CCMModel.Server,
			}, options);
			return Nis.Model.prototype.initialize.call(this, newOptions);
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
	}); //end of Nis.Model.Concept

	Nis.Model.CCMModel.Server = "admin";
	Nis.Model.CCMModel.EntityName = "ccm/user";

	Nis.Model.CCMModelList = Nis.Collection.extend({
		model: Nis.Model.CCMModel,
		initialize: function(options){
		    console.log("initialize: OrgRequestList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMModel.EntityName,
				serverName:Nis.Model.CCMModel.Server,
			}, options);
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
		searchData:function(options, keyword){
	            var token = localStorage.getItem("token") || "no-token";
	            // var cUrl = "http://192.168.0.153:8880/admin_server/nmpi/v1/admin/token/"+token+"/ccm/user/list?column=id&keyword="+"testCCM2";
	            var cUrl = "http://192.168.0.153:8880/admin_server/nmpi/v1/admin/token/"+token+"/ccm/user/list?column=id&keyword="+keyword;
	            $.ajax({
	                type:'GET',
	                url:cUrl,
	                success:options.success,
	            });
		},
	}); // end of Nis.Model.ConceptList

	Nis.Model.CCMModel.ApprovalEntityName = "ccm/approval/user";

	Nis.Model.CCMApprovalModelList = Nis.Collection.extend({
		model: Nis.Model.CCMModel,
		initialize: function(options){
		    console.log("initialize: OrgRequestList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMModel.ApprovalEntityName,
				serverName:Nis.Model.CCMModel.Server,
			}, options);
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
		searchData:function(options, keyword, type){
	            var token = localStorage.getItem("token") || "no-token";
	            // var cUrl = "http://192.168.0.153:8880/admin_server/nmpi/v1/admin/token/"+token+"/ccm/user/list?column=id&keyword="+"testCCM2";
	            var cUrl = "http://192.168.0.153:8880/admin_server/nmpi/v1/admin/token/"+token+"/ccm/approval/user/list?column=id&keyword="+keyword;
	            if(type === 'DELETE'){
	            	cUrl += "&type=DELETE";
	            }
	            $.ajax({
	                type:'GET',
	                url:cUrl,
	                success:options.success,
	            });
		},
	}); // end of Nis.Model.ConceptList


     Nis.Model.CCMModel.managerManagementColumns = [
            // {
            //     label: '<input modelid="{{userId}}" type="checkbox" name="board_checkbox" value="checked"/>',
            //     cell: "checkbox",
            // },
            {
                dbid: "no",
                label: "번호",
            },
            {
                dbid: "id",
                label: "아이디",
                content: '<a modelid="{{userId}}" type="type_id">{{id}}</a>',
                cell: "id",
            },        
            {
                dbid: "userName",
                label: "이름",
            },        
            {
                dbid: "phoneNumber",
                label: "연락처",
            },        
            {
                dbid: "eMail",
                label: "이메일",
            },        
     ]; // end of columns

     Nis.Model.CCMModel.userManagementColumns = [
            // {
            //     label: '<input modelid="{{userId}}" type="checkbox" name="board_checkbox" value="checked"/>',
            //     cell: "checkbox",
            // },
            {
                dbid: "no",
                label: "번호",
            },
            {
                dbid: "id",
                label: "아이디",
                content: '<a modelid="{{userId}}" type="type_id">{{id}}</a>',
                cell: "id",
            },    
            {
                dbid: "userName",
                label: "이름",
            },        
            {
                dbid: "phoneNumber",
                label: "연락처",
            },        
            {
                dbid: "eMail",
                label: "이메일",
            },        
     ]; // end of columns

     Nis.Model.CCMModel.managerManagementButtons = [
            {
                data: {
                    buttonId:"add",
                    buttonClass:"btn btn-default",
                    buttonTitle:"추가",
                },
            },
            // {
            //     data: {
            //         buttonId:"delete",
            //         buttonClass:"btn btn-default",
            //         buttonTitle:"삭제",
            //     },
            // },
     ]; // end of conceptSetButtons


     Nis.Model.CCMModel.approvalManagementButtons = [
            // {
            //     data: {
            //         buttonId:"approval",
            //         buttonClass:"btn btn-default",
            //         buttonTitle:"승인",
            //     },
            // },
            // {
            //     data: {
            //         buttonId:"reject",
            //         buttonClass:"btn btn-default",
            //         buttonTitle:"거부",
            //     },
            // },
     ], // end of conceptSetButtons


     Nis.Model.CCMModel.userInfoManagementButtons = [
            {
                data: {
                    buttonId:"add",
                    buttonClass:"btn btn-default",
                    buttonTitle:"추가",
                },
            },
     ]; // end of conceptSetButtons
     Nis.Model.CCMModel.requestDropManagementButtons = [
            // {
            //     data: {
            //         buttonId:"approvalDrop",
            //         buttonClass:"btn btn-default",
            //         buttonTitle:"탈퇴 승인",
            //     },
            // },
     ]; // end of conceptSetButtons
})();
