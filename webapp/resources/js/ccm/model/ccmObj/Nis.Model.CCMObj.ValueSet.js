
(function () {
	'use strict';

	Nis.Model.CCMObj.ValueSet = Nis.Model.CCMObj.extend({
		defaults: {
		    valueSetId:null,
		    valueSet:null,
		    valueSetCardinality:null,
		    valueSetDataType:null,
		    valueSetConceptId:null,
		    valueSetMappingCodeSystem:null,
		    valueSetSnomedTerm:null,
		},
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.ValueSet.EntityName,
			}, options);
			return Nis.Model.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); //end of Nis.Model.CCMObj

	Nis.Model.CCMObj.ValueSet.EntityName = "ValueSet";

	Nis.Collection.CCMObj.ValueSet = Nis.Collection.CCMObj.extend({
		model: Nis.Model.CCMObj.ValueSet,
		initialize: function(options){
		    //console.log("initialize: CCMList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.ValueSet.EntityName,
			}, options);
		    return Nis.Collection.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); // end of Nis.Collection.CCMObj

})();
