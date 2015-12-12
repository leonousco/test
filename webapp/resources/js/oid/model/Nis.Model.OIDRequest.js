
(function () {
	'use strict';

    Nis.Model.OidRequestEntityName = "OIDRequest";

	Nis.Model.OIDRequest = Nis.Model.OIDBase.extend({
	    defaults: {
	       id: null,
	        identifier: "",
	        arc: "",
	        parentIdentifier: "",
	        requestStatus: Nis.Code.ReqStatus.request,
	        requestType: Nis.Code.RequestType.create,
	        description: "",
	        information: "",
	        orgName: "",
	        orgAddress: "",
	        country: "",
	        orgEmail: "",
	        orgPhone: "",
	        orgFax: "",
	        orgOid: "",
	        authorName: "",
	        authorEmail: "",
	        authorUserid: "",
	        memo: "",
	        userReviewer: "",
	        dateCreated: "",
		   dateVoided: "",       
		   dateModified: "",
		   userCreated: "",
		   userVoided: "",
		   createdId:"",
	        link: "",
	    },
		initialize: function (options) {
			var v = Nis.Code.ReqStatus;
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.OIDRequest.EntityName,
			}, options);
			return Nis.Model.OIDBase.prototype.initialize.call(this, newOptions);
		},

	}); //end of Nis.Model.OrgRequest

	_.extend(Nis.Model.OIDRequest.prototype, Nis.Model.HasNisRequest);

	Nis.Model.OIDRequest.EntityName = "OIDRequest";

	Nis.Collection.OIDRequest = Nis.Collection.OIDBase.extend({
		model: Nis.Model.OIDRequest,
		initialize: function(options){
		    //console.log("initialize:");
			var newOptions = _.extend({
				entityName:Nis.Model.OIDRequest.EntityName,
			}, options);
		    return Nis.Collection.OIDBase.prototype.initialize.call(this, newOptions);
		},
		setRequestType:function(type) {
			console.log("setRequestType:", type);
			this.requestType = type;
		},		
		setReqStatus:function(status) {
			console.log("setReqStatus:", status);
			this.reqStatus = status;
		},		
		url: function() {
			var url = this.getEntityUrl();
			if(this.reqStatusType) {				
				var ret = url + "/query?requestType="+this.reqStatusType;
				ret += "&requestStatus=";
				ret += "REQUEST";
				return ret;
			}
			return  url + "/list";
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
	});  // end of Nis.Collection.OIDRequest

})();
