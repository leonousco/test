
(function () {
	'use strict';

	
	//Nis.Model.Concept.EntityName = "Concept";

	Nis.Model.ConceptBase = Nis.Model.extend({
		defaults: {
		    id: null,
		    conceptId:null,
		    displayName:null,
		    description:null,
		    code:null,
		    link: "",
		},
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
			    serverName:Nis.Model.Concept.Server,
			}, options);
			return Nis.Model.prototype.initialize.call(this, newOptions);
		},
		validateItem: function (key) {
		    return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
		},
		fetch:function(options) {
			console.log("fetch: url():", this.url());
			var model = this;
		    $.ajax({
		        url:this.url(),
		        dataType:"json",
		        success:function (response) {
		            console.log("fetch success: " + response.body + ", options:" + options);
		            var values = response.body;
		            model.parse(response);
		            return Backbone.Model.prototype.fetch.call(model, options) ;
		        }
		    });
		},
		validateAll: function () {
	        var messages = {};

	        for (var key in this.validators) {
	            if(this.validators.hasOwnProperty(key)) {
	                var check = this.validators[key](this.get(key));
	                if (check.isValid === false) {
	                    messages[key] = check.message;
	                }
	            }
	        }

	        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
	    },	    
	}); //end of Nis.Model.Concept

	Nis.Model.ConceptBase.Server = "vs";

	Nis.Collection.ConceptBase = Nis.Collection.extend({
		model: Nis.Model.ConceptBase,
		initialize: function(options){
		    console.log("initialize:");
			var newOptions = _.extend({
				serverName:Nis.Model.Concept.Server,
			}, options);
		    return Nis.Collection.prototype.initialize.call(this, newOptions);
		},
		fetch:function(options) {
			console.log("fetch:", this.url());
			var collection = this;
			$.ajax({
			    url:collection.url(),
			    dataType:"json",
			    success:function (response) {
			        console.log("fetch success: " + response.body + ", options:" + options);
			        var values = response.body;
			        collection.parse(response);
			        return Backbone.Collection.prototype.fetch.call(collection, options) ;
			    }
			});
		},
	}); // end of Nis.Model.ConceptList

})();
