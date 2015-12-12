
(function () {
	'use strict';


	Nis.Model.ConceptSet = Nis.Model.ConceptBase.extend({
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.ConceptSet.EntityName,
			}, options);
			return Nis.Model.ConceptBase.prototype.initialize.call(this, newOptions);
		},		
	}); //end of Nis.Model.Concept

	Nis.Model.ConceptSet.EntityName = "ConceptSet";

	Nis.Collection.ConceptSet = Nis.Collection.ConceptBase.extend({
		model: Nis.Model.ConceptSet,
		initialize: function(options){
		    console.log("initialize:");
			var newOptions = _.extend({
				entityName:Nis.Model.ConceptSet.EntityName,
			}, options);
		    return Nis.Collection.ConceptBase.prototype.initialize.call(this, newOptions);
		},		
	}); // end of Nis.Model.ConceptList

})();
