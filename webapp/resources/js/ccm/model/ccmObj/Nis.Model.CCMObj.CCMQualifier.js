
(function () {
	'use strict';

	Nis.Model.CCMObj.CCMQualifier = Nis.Model.CCMObj.extend({
		defaults: {
		    qualifierId: null,
		    qualifier:null,
		    qualifierCardinality:null,
		    qualifierConceptId:null,
		    qualifierMappingCodeSystem:null,
		    qualifierSnomedTerm:null,
		    qualifierDataType:null,
		},
		values : [],
		valueSets : [],
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.CCMQualifier.EntityName,
			}, options);
			return Nis.Model.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); //end of Nis.Model.CCMObj

	Nis.Model.CCMObj.CCMQualifier.EntityName = "CCMModel";

	Nis.Collection.CCMObj.CCMQualifier = Nis.Collection.CCMObj.extend({
		model: Nis.Model.CCMObj.CCMQualifier,
		initialize: function(options){
		    //console.log("initialize: CCMList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.CCMQualifier.EntityName,
			}, options);
		    return Nis.Collection.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); // end of Nis.Collection.CCMObj

})();
