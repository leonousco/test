
(function () {
	'use strict';

	Nis.Model.CCMObj.CCMEntity = Nis.Model.CCMObj.extend({
		defaults: {
		    entityId: null,
		    entity: null,
		    entityConceptId: null,
		    entityMappingCodeSystem: null,
		    entitySnomedTerm: null,
		    entityDataType: null,
		},
		ccmModifiers:[],
		ccmQualifiers:[],
		valueSets:[],
		valueItems:[],
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.CCMEntity.EntityName,
			}, options);
			return Nis.Model.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); //end of Nis.Model.CCMObj

	Nis.Model.CCMObj.CCMEntity.EntityName = "CCMEntity";

	Nis.Collection.CCMObj.CCMEntity = Nis.Collection.CCMObj.extend({
		model: Nis.Model.CCMObj.CCMEntity,
		initialize: function(options){
		    //console.log("initialize: CCMList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.CCMEntity.EntityName,
			}, options);
		    return Nis.Collection.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); // end of Nis.Collection.CCMObj

})();
