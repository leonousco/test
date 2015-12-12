

//var Nis = Nis || {};
//var Uic = Uic || {};

(function () {
	'use strict';

	Nis.Model.Concept = Backbone.Model.extend({
		defaults: {
			id: null,
			conceptId: null,
			displayName:null,
			description: null,
			code: null,
			link: null,
		},

	}); // end of Nis.VsModel 

    Nis.Model.ConceptMixin = {
        //controlVaule:null,
        setConcept:function(value) {
            this.concept = value;
        },
        getConcept:function() {
            return this.concept;
        },
    }

	Nis.Collection.Concept = Nis.Collection.extend({
		model: Nis.Model.Concept,
	}); // end of Nis.VsModel 

})();
