
(function () {
	'use strict';


	Nis.Model.CCMVersionApprovalModel = Nis.Model.extend({
		defaults: {
			dateCreated: null,
			dateVoided: null,
			dateModified: null,
			userCreated: null,
			userVoided: null,
			link: null,
			no: 0,
			version: null,
			oraganization: null,
			purposeOfModel: null,
			sourceOfReference: null,
			relatedIssues: null,
			reviewer: null,
			distributedBy: null,
			managedBy: null,
			modificationInfomation: null,
			modificcationReason: null,
		},
		// idAttribute:"userId",
		initialize: function (options) {
			this.validators = {};
			// var newOptions = _.extend({
			//     entityName:Nis.Model.CCMVersionApprovalModel.EntityName,
			//     serverName:Nis.Model.CCMVersionApprovalModel.Server,
			// }, options);
			// return Nis.Model.prototype.initialize.call(this, newOptions);
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

	Nis.Model.CCMVersionApprovalModel.Server = "ccm";
	Nis.Model.CCMVersionApprovalModel.EntityName = "EvaluationRequest";

	Nis.Model.CCMVersionApprovalModelModelList = Nis.Collection.extend({
		model: Nis.Model.CCMVersionApprovalModel,
		initialize: function(options){
			this.idsample = options;
		    console.log("initialize: OrgRequestList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMVersionApprovalModel.EntityName,
				serverName:Nis.Model.CCMVersionApprovalModel.Server,
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
})();
