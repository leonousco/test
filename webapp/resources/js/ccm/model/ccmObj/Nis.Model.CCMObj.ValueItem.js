
(function () {
	'use strict';

	Nis.Model.CCMObj.ValueItem = Nis.Model.CCMObj.extend({
		defaults: {
		    valueId:null,
		    value:null,
		    valueConceptId:null,
		    valueMappingCodeSystem:null,
		    valueSnomedTerm:null,
		},
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.ValueItem.EntityName,
			}, options);
			return Nis.Model.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); //end of Nis.Model.CCMObj

	Nis.Model.CCMObj.ValueItem.EntityName = "CCMModel";

	Nis.Collection.CCMObj.ValueItem = Nis.Collection.CCMObj.extend({
		model: Nis.Model.CCMObj.ValueItem,
		initialize: function(options){
		    //console.log("initialize: CCMList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.ValueItem.EntityName,
			}, options);
		    return Nis.Collection.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); // end of Nis.Collection.CCMObj
	
	Nis.Model.CCMObj.ValueItem.columns = [
            {
                dbid: "value",
                label: "Value",
            },
            {
                dbid: "valueConceptId",
                label: "Code",
            },        
            {
                dbid: "valueMappingCodeSystem",
                label: "CodeSystem",
            },        
            {
                dbid: "valueSnomedTerm",
                label: "CodeSystemName",
            },       
        ]; // end of columns
})();
