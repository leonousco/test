
(function () {
	'use strict';

	Nis.Model.CCMObj.MultiModelLoad = Nis.Model.CCMObj.extend({
		defaults: {
		    	dateCreated:null,
                userCreated:null,
                modelName:null,
                modelType:null,
                processType:null,
                valueRepresentaion:null,
                clinicalDomain:null,
	    		entity:null,
	    		entityConceptId:null,
	    		entityMappingCodeSystem:null,
	    		entitySnomedTerm:null,
	    		qualifier:null,
	    		qualifierCardinality:null,
	    		qualifierConceptId:null,
	    		qualifierMappingCodeSystem:null,
	    		qualifierSnomedTerm:null,
	    		valueSet:null,
	    		valueSetCardinality:null,
                valueSetDataType:null,
	    		valueSetConceptId:null,
	    		valueSetMappingCodeSystem:null,
	    		valueSetSnomedTerm:null,
	    		value:null,
	    		valueConceptId:null,
	    		valueMappingCodeSystem:null,
	    		valueSnomedTerm:null,
		},
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.MultiModelLoad.EntityName,
			}, options);
			return Nis.Model.CCMObj.prototype.initialize.call(this, newOptions);
		},
		getByModelId:function(options){
			var url = this.url() + "/model_id/" + options.modelId;
		    $.ajax({
		        url:url,
		        dataType:"json",
		        success:options.success,
		        error:options.error,
		    });			
		},
	}); //end of Nis.Model.CCMObj

	Nis.Model.CCMObj.MultiModelLoad.EntityName = "MultiModelLoad";

	Nis.Collection.CCMObj.MultiModelLoad = Nis.Collection.CCMObj.extend({
		model: Nis.Model.CCMObj.MultiModelLoad,
		initialize: function(options){
		    //console.log("initialize: CCMList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.MultiModelLoad.EntityName,
			}, options);
		    return Nis.Collection.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); // end of Nis.Collection.CCMObj

})();
