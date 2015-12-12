
(function () {
	'use strict';


	Nis.Model.CCMVersionControlModel = Nis.Model.extend({
		defaults: {
                acceptCount: null,
                ccmName: null,
                dateCreated: null,
                dateModified: null,
                dateVoided: null,
                display: null,
                distributedBy: null,
                etc: null,
                evaluation: null,
                id: null,
                isPublic: null,
                json: null,
                link: null,
                managedBy: null,
                memo: null,
                modelId: null,
                modelName: null,
                modificationInfomation: null,
                modificcationReason: null,
                organization: null,
                purposeOfModel: null,
                reject: null,
                rejectCount: null,
                relatedIssues: null,
                requestStatus: null,
                requestType: null,
                review: null,
                reviewer: null,
                sourceOfReference: null,
		},
		// idAttribute:"userId",
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.CCMVersionControlModel.EntityName,
			    serverName:Nis.Model.CCMVersionControlModel.Server,
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
        ccmVersionRegister:function(options){
                var cData = JSON.stringify(this.attributes);
                var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/ModelIndex/approval/reqId/"+3;
                // var cUrl = "http://192.168.0.64:8080/ccm_server/api/v1/token/no-token/ModelIndex/approval/reqId/"+1;
                $.ajax({
                    type:'POST',
                    url:cUrl,
                    contentType:"plain/text",
                    data:cData.toString(),
                    success:options.success,
                    error:options.error,
                });
        },
	}); //end of Nis.Model.Concept

     Nis.Model.CCMVersionControlModel.Server = "ccm";
	Nis.Model.CCMVersionControlModel.VersionControlEntityName = "ModelIndex";

	Nis.Model.CCMVersionControlModelList = Nis.Collection.extend({
		model: Nis.Model.CCMVersionControlModel,
		initialize: function(options){
			this.idsample = options;
		    console.log("initialize: OrgRequestList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMVersionControlModel.VersionControlEntityName,
				serverName:Nis.Model.CCMVersionControlModel.Server,
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
        getEntityUrl:function(id) {
            var token = localStorage.getItem("token") || "no-token";
            // var url = entityUrl.url(id, this.getEntityName(), this.getServerName(), token);
            var url = 'http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/Metadata/model_id/'+this.idsample;
            console.log("getEntityUrl:", " url:", url, token);
            return url;
        },
	}); // end of Nis.Model.ConceptList

     Nis.Model.CCMVersionControlModel.ccmNeedVersionColumns = [
            // {
            //     label: '<input modelid="{{id}}" type="checkbox" name="board_checkbox" value="checked"/>',
            //     cell: "checkbox",
            // },
            {
                dbid: "version",
                label: "버전",
            },
            {
                dbid: "dateCreated",
                label: "생성일자",
            },       
            {
                dbid: "modificationInfomation",
                label: "수정 정보",
            },       
            {
                dbid: "acceptVersion",
                label: "승인",
                content: '<button modelid="{{id}}" spec="accept" type="type_button" class="btn btn-default">버전 승인</button>',
                cell: "button",
            },        
            {
                dbid: "rejectVersion",
                label: "거부",
                content: '<button modelid="{{id}}" spec="reject" type="type_button" class="btn btn-default">승인 거절</button>',
                cell: "button",
            }            
     ]; // end of columns


     Nis.Model.CCMVersionControlModel.ccmVersionControlColumns = [
            // {
            //     label: '<input modelid="{{id}}" type="checkbox" name="board_checkbox" value="checked"/>',
            //     cell: "checkbox",
            // },
            {
                dbid: "version",
                label: "버전",
            },
            {
                dbid: "dateCreated",
                label: "생성일자",
            },       
            {
                dbid: "modificationInfomation",
                label: "수정 정보",
            },       
            // {
            //     dbid: "acceptVersion",
            //     label: "승인",
            //     content: '<button modelid="{{id}}" spec="accept" type="type_button" class="btn btn-default">버전 승인</button>',
            //     cell: "button",
            // },        
            // {
            //     dbid: "rejectVersion",
            //     label: "거부",
            //     content: '<button modelid="{{id}}" spec="reject" type="type_button" class="btn btn-default">버전 거부</button>',
            //     cell: "button",
            // },            
     ]; // end of columns


     Nis.Model.CCMVersionControlModel.ccmManagementButtons = [
            // {
            //     data: {
            //         buttonId:"makePublic",
            //         buttonClass:"btn btn-default",
            //         buttonTitle:"선택 공개",
            //     },
            // },
            // {
            //     data: {
            //         buttonId:"makePrivate",
            //         buttonClass:"btn btn-default",
            //         buttonTitle:"선택 비공개",
            //     },
            // },
            // {
            //     data: {
            //         buttonId:"delete",
            //         buttonClass:"btn btn-default",
            //         buttonTitle:"삭제",
            //     },
            // },
     ]; // end of conceptSetButtons
     Nis.Model.CCMVersionControlModel.ccmVersionControlButtons = [
            {
                data: {
                    buttonId:"makePublic",
                    buttonClass:"btn btn-default",
                    buttonTitle:"공개 전환",
                },
            },
            {
                data: {
                    buttonId:"makePrivate",
                    buttonClass:"btn btn-default",
                    buttonTitle:"비공개 전환",
                },
            },
            {
                data: {
                    buttonId:"list",
                    buttonClass:"btn btn-default",
                    buttonTitle:"목록",
                },
            },
     ];
})();
