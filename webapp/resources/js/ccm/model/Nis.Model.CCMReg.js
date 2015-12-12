(function () {
    'use strict';

    // ----------
    Nis.Model.CCMReg = Nis.Model.extend({
        defaults: {
                dateCreated:null,
                userCreated:null,
                modelName:null,
                modelType:null,
                processType:null,
                valueRepresentaion:null,
                clinicalDomain:null,
	    		entity:null,
	    		entityConceptId:null,
	    		entityMappingCodeSystem:null,
	    		entitySnomedTerm:null,
	    		qualifier:null,
	    		qualifierCardinality:null,
	    		qualifierConceptId:null,
	    		qualifierMappingCodeSystem:null,
	    		qualifierSnomedTerm:null,
	    		valueSet:null,
	    		valueSetCardinality:null,
                valueSetDataType:null,
	    		valueSetConceptId:null,
	    		valueSetMappingCodeSystem:null,
	    		valueSetSnomedTerm:null,
	    		value:null,
	    		valueConceptId:null,
	    		valueMappingCodeSystem:null,
	    		valueSnomedTerm:null,
	    },
        initialize: function (options, server) {
            console.log("initialize:     " + options);
            //map key/value for validation
            this.validators = {};
            console.log("initialize: CCMReg");
            var newOptions = _.extend({
                entityName:Nis.Model.CCMReg.EntityName,
                serverName:Nis.Model.CCMReg.Server,
            }, server);
            this.server = server;
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
    });
})();
