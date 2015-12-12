
(function () {
	'use strict';
    

	Nis.Model.OID = Nis.Model.OIDBase.extend({
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
	        dateCreated: "",
		   dateVoided: "",       
		   dateModified: "",
		   userCreated: "",
		   userVoided: "",
	        link: "",
	    },
		initialize: function (options) {
			var v = Nis.Code.ReqStatus;
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.OID.EntityName,
			}, options);
			return Nis.Model.OIDBase.prototype.initialize.call(this, newOptions);
		},
	}); //end of Nis.Model.OrgRequest

	Nis.Model.OID.EntityName = "OIDEntity";
	Nis.Model.OID.rootId = '2.16.410.123456';

	Nis.Collection.OID = Nis.Collection.OIDBase.extend({
		model: Nis.Model.OID,
		initialize: function(options){
		    //console.log("initialize: ");
			var newOptions = _.extend({
				entityName:Nis.Model.OID.EntityName,
			}, options);
		    return Nis.Collection.OIDBase.prototype.initialize.call(this, newOptions);
		},
		getChildren:function(options){
			if(options.oid === 'root') {
				options.oid = Nis.Model.OID.rootId;
			}
			var newOptions = {
				hasQuery:true,
				queryParam: {
					parentIdentifier:options.oid,					
				},				
			};
			this.getPagedList(newOptions, options.success, options.error);
		},
		onSuccessGetChildren:function() {

		},
	}); // end of Nis.Collection.OID

})();
