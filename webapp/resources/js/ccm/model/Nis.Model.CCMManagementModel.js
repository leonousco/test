
(function () {
	'use strict';


	Nis.Model.CCMManagementModel = Nis.Model.extend({
		defaults: {
			acceptCount: null,
			dateCreated: null,
			dateModified: null,
			dateVoided: null,
			display: null,
			evaluation: null,
			id: null,
			json: null,
			link: null,
			memo: null,
			modelId: null,
			modelName: null,
			rejectCount: null,
			requestStatus: null,
			requestType: null,
			userCreated: null,
			userVoided: null,
			version: null,
		},
		idAttribute:"id",
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.CCMManagementModel.EntityName,
			    serverName:Nis.Model.CCMManagementModel.Server,
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
	    rejectCCM:function(modelId){
	            var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/ModelIndex/reject/reqId/"+modelId;
	            $.ajax({
	                url:cUrl,
	            }).done(function(){
	                console.log("this version is rejected.");
	                javascript:Backbone.history.history.back();
	            });
	    },
	    changeCCMDisplayMode:function(modelId, isPublic, options){
                var cUrl = this.changePublicUrl(modelId, isPublic);
                $.ajax({
                    url:cUrl,
                    success:options.success,
                });
	    },
        changePublicUrl:function(modelId, isPublic){
            var ret = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/CCMModel/modelId/"+modelId+"/isPublic/"+isPublic;
            return ret;
        },
	}); //end of Nis.Model.Concept

	Nis.Model.CCMManagementModel.Server = "ccm";
	Nis.Model.CCMManagementModel.EntityName = "EvaluationRequest";

	Nis.Model.CCMManagementModelList = Nis.Collection.extend({
		model: Nis.Model.CCMManagementModel,
		initialize: function(options){
			this.idsample = options;
		    console.log("initialize: OrgRequestList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMManagementModel.EntityName,
				serverName:Nis.Model.CCMManagementModel.Server,
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
            var url;
            if(this.idsample){
            	url = 'http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/EvaluationRequest/id/'+this.idsample;
            }
            else{
            	url = entityUrl.url(id, this.getEntityName(), this.getServerName(), token);
            }
            console.log("getEntityUrl:", " url:", url, token);
            return url;
        },
        searchData:function(options, keyword){
            var token = localStorage.getItem("token") || "no-token";
            // var cUrl = "http://192.168.0.153:8880/admin_server/nmpi/v1/admin/token/"+token+"/ccm/user/list?column=id&keyword="+"testCCM2";
            var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/EvaluationRequest/query?modelName="+keyword;
            // var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/like/table/EvaluationRequest/column/modelName/value/"+keyword;

            $.ajax({
                type:'GET',
                url:cUrl,
                success:options.success,
            });
        },
   //      rejectVersion:function(modelId){
			// console.log("CCMManagementModel rejectVersion:", this.url());
   //          var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/ModelIndex/reject/reqId/"+modelId;
   //          $.ajax({
   //              url:cUrl,
   //          }).done(function(){
   //              console.log("this version is rejected.");
   //              javascript:history.back();
   //          });
   //      },
	}); // end of Nis.Model.ConceptList

     Nis.Model.CCMManagementModel.ccmManagementColumns = [
            // {
            //     label: '<input modelid="{{id}}" type="checkbox" name="board_checkbox" value="checked"/>',
            //     cell: "checkbox",
            // },
            {
                dbid: "id",
                label: "번호",
            },
            {
                dbid: "modelName",
                label: "CCM 명",
            },        
            {
                dbid: "dateCreated",
                label: "생성일자",
            },       
            {
                dbid: "version",
                label: "버전",
            },       
            {
                dbid: "acceptCount",
                label: "리뷰",
            },        
            {
                dbid: "rejectCount",
                label: "반대",
            },        
            {
                dbid: "display",
                label: "공개여부",
            },        
            {
                dbid: "versionManagement",
                label: "버전관리",
                content: '<button modelid="{{id}}" type="type_button" class="btn btn-default">Version Control</button>',
                cell: "button",
            },     
     ]; // end of columns
})();
