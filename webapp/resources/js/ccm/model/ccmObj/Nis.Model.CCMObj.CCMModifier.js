
(function () {
	'use strict';

	Nis.Model.CCMObj.CCMModifier = Nis.Model.CCMObj.extend({
		defaults: {
		    id: null,
		    name:null,
		    code:null,
		    codeId:null,
		    codeSystem:null,
		    codeSystemName:null,
		    displayName:null,
		    dataType:null,
		    maxOccurs:null,
		    minOccurs:null,
		},
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.CCMModifier.EntityName,
			}, options);
			return Nis.Model.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); //end of Nis.Model.CCMObj

	Nis.Model.CCMObj.CCMModifier.EntityName = "CCMModel";

	Nis.Collection.CCMObj.CCMModifier = Nis.Collection.CCMObj.extend({
		model: Nis.Model.CCMObj.CCMModel,
		initialize: function(options){
		    //console.log("initialize: CCMList");
			var newOptions = _.extend({
				entityName:Nis.Model.CCMObj.CCMModifier.EntityName,
			}, options);
		    return Nis.Collection.CCMObj.prototype.initialize.call(this, newOptions);
		},
	}); // end of Nis.Collection.CCMObj

})();
