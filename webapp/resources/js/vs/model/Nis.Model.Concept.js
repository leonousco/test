
(function () {
	'use strict';

	//Nis.Model.Concept.Server = "vs";

	Nis.Model.Concept = Nis.Model.ConceptBase.extend({
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.Concept.EntityName,
			}, options);
			return Nis.Model.ConceptBase.prototype.initialize.call(this, newOptions);
		},
		create:function(options) {
			var url = this.getEntityUrl() 
				+ "/conceptSetId/" 
				+ options.conceptSet.attributes.id; 
			console.log("create:", url);
			var self = this;
			$.ajax({
			    headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json; charset=utf-8'
			    },
			    'type': 'POST',
			    'url': url,
			    'data': JSON.stringify(self.toJSON()),
			    'dataType': 'json',
			    'success': options.success,
			    'error': options.error,
			});
		}
	}); //end of Nis.Model.Concept

	Nis.Model.Concept.EntityName = "Concept";	

	Nis.Collection.Concept = Nis.Collection.ConceptBase.extend({
		model: Nis.Model.Concept,
		initialize: function(options){
		    console.log("initialize:");
			var newOptions = _.extend({
				entityName:Nis.Model.Concept.EntityName,
			}, options);
		    return Nis.Collection.ConceptBase.prototype.initialize.call(this, newOptions);
		},
		getConceptListbyConceptSetId:function(options) {
			var url = this.getEntityUrl() 
				+ "/list/conceptSetId/" 
				+ options.conceptSet.attributes.id; 
			console.log("getConceptListbyConceptSetId:", url);
			$.ajax({
				url:url,
				dataType:"json",
				success:options.success,
				error:options.error,
			});			
		},
	}); // end of Nis.Model.ConceptList

})();
