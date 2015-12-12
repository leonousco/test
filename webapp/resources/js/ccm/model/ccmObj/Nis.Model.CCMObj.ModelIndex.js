
(function () {
	'use strict';

	Nis.Model.CCMObj.ModelIndex = Nis.Model.CCMObj.extend({
		defaults: {
		    id: null,
		    ccmModel:null,
		    ccmEntity:null,
		    ccmQualifier:null,
		    ccmModifier:null,
		    valueSet:null,
		    valueItem:null,
		    modelId:null,
		    modelName:null,
		},
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.ModelIndex.EntityName,
			}, options);
			return Nis.Model.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); //end of Nis.Model.CCMObj

	Nis.Model.CCMObj.ModelIndex.EntityName = "ModelIndex";

	Nis.Collection.CCMObj.ModelIndex = Nis.Collection.CCMObj.extend({
		model: Nis.Model.CCMObj.ModelIndex,
		initialize: function(options){
		    //console.log("initialize: CCMList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.ModelIndex.EntityName,
			}, options);
		    return Nis.Collection.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); // end of Nis.Collection.CCMObj

})();
