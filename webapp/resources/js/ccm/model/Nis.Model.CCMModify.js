(function () {
    'use strict';

    // ----------
    Nis.Model.CCMModify = Nis.Model.extend({
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
                entityName:Nis.Model.CCMModify.EntityName,
                serverName:Nis.Model.CCMModify.Server,
            }, server);
            this.server = server;
            return Nis.Model.prototype.initialize.call(this, newOptions);
        },
        getByModelId:function(options){
            var url = this.url() + "/model_id/" + options.modelId;
            $.ajax({
                url:url,
                dataType:"json",
                success:options.success,
                error:options.error,
            });         
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

    Nis.Model.CCMModify.Server = "ccm";
    Nis.Model.CCMModify.EntityName = "ModifyCcm";

    Nis.Model.CCMModify.columns = [
                {
                    labelTitle:"DateCreated",
                    dbid:"dateCreated",   
                },
                {
                    labelTitle:"UserCreated",
                    dbid:"userCreated",
                },
                {
                    labelTitle:"ModelName",
                    dbid:"modelName",   
                },
                {
                    labelForName:"modelType",
                    labelTitle:"ModelType",
                    inputId:"modelType",
                    dbid:"modelType",
                    inputType:"text",
                },
                {
                    labelForName:"processType",
                    labelTitle:"ProcessType",
                    inputId:"processType",
                    dbid:"processType",
                    inputType:"text",
                },
                {
                    labelForName:"valueRepresentaion",
                    labelTitle:"ValueRepresentaion",
                    inputId:"valueRepresentaion",
                    dbid:"valueRepresentaion",
                    inputType:"text",
                },
                {
                    labelForName:"clinicalDomain",
                    labelTitle:"ClinicalDomain",
                    inputId:"clinicalDomain",
                    dbid:"clinicalDomain",
                    inputType:"text",
                },
                {
                    labelForName:"entity",
                    labelTitle:"Entity",
                    inputId:"entity",
                    dbid:"entity",
                    inputType:"text",
                },
                {
                    labelForName:"entityConceptId",
                    labelTitle:"EntityConceptId",
                    inputId:"entityConceptId",
                    dbid : "entityConceptId",
                    inputType:"text",

                },
                {
                    labelForName:"entityMappingCodeSystem",
                    labelTitle:"EntityMappingCodeSystem",
                    inputId:"entityMappingCodeSystem",
                    dbid:"entityMappingCodeSystem",
                    inputType:"text",
                },
                {
                    labelForName:"displayName",
                    labelTitle:"EntitySnomedTerm",
                    inputId:"displayName",
                    dbid : "entitySnomedTerm",
                    inputType:"text",
                },     
                {
                    labelForName:"qualifier",
                    labelTitle:"Qualifier",
                    inputId:"qualifier",
                    dbid:"qualifier",
                    inputType:"text",
                }, 
                {
                    labelTitle:"QualifierCardinality",
                    inputId:"qCardinality",
                    dbid : "qualifierCardinality",
                    inputType:"text",
                },
                {
                    labelForName:"qualifierConceptId",
                    labelTitle:"QualifierConceptId",
                    inputId:"qualifierConceptId",
                    dbid : "qualifierConceptId",
                    inputType:"text",
                },
                {
                    labelForName:"QualifierMappingCodeSystem",
                    labelTitle:"QualifierMappingCodeSystem",
                    inputId:"QualifierMappingCodeSystem",
                    dbid:"qualifierMappingCodeSystem",
                    inputType:"text",
                },
                {
                    labelForName:"qualifierSnomedTerm",
                    labelTitle:"QualifierSnomedTerm",
                    inputId:"qualifierSnomedTerm",
                    dbid : "qualifierSnomedTerm",
                    inputType:"text",
                },     
                {
                    labelForName:"valueSet",
                    labelTitle:"ValueSet",
                    inputId:"valueSet",
                    dbid:"valueSet",
                    inputType:"text",
                },                    
                 {
                    labelForName:"valueSetCardinality",
                    labelTitle:"ValueSetCardinality",
                    inputId:"valueSetCardinality",
                    dbid : "valueSetCardinality",
                    inputType:"text",
                },
                 {
                    labelForName:"valueSetDataType",
                    labelTitle:"ValueSetDataType",
                    inputId:"valueSetDataType",
                    dbid : "valueSetDataType",
                    inputType:"text",
                },
                {
                    labelForName:"ValueSetConceptId",
                    labelTitle:"ValueSetConceptId",
                    inputId:"ValueSetConceptId",
                    dbid : "valueSetConceptId",
                    inputType:"text",
                },
                {
                    labelForName:"valueSetMappingCodeSystem",
                    labelTitle:"ValueSetMappingCodeSystem",
                    inputId:"valueSetMappingCodeSystem",
                    dbid:"valueSetMappingCodeSystem",
                    inputType:"text",
                },
                {
                    labelForName:"valueSetSnomedTerm",
                    labelTitle:"ValueSetSnomedTerm",
                    inputId:"valueSetSnomedTerm",
                    dbid : "valueSetSnomedTerm",
                    inputType:"text",
                },
                  {
                    labelForName:"value",
                    labelTitle:"Value",
                    inputId:"value",
                    dbid:"value",
                    inputType:"text",
                },                    
                {
                    labelTitle:"ValueConceptId",
                    inputId:"valueConceptId",
                    dbid : "valueConceptId",
                    inputType:"text",
                },
                {
                    labelForName:"valueMappingCodeSystem",
                    labelTitle:"ValueMappingCodeSystem",
                    inputId:"valueMappingCodeSystem",
                    dbid:"valueMappingCodeSystem",
                    inputType:"text",
                },
                {
                    labelForName:"valueSnomedTerm",
                    labelTitle:"ValueSnomedTerm",
                    inputId:"valueSnomedTerm",
                    dbid : "valueSnomedTerm",
                    inputType:"text",
                }, 
            ],

           Nis.Model.CCMModify.buttons = [
            {
                data: {
                    buttonId:"save",
                    buttonClass:"btn btn-primary",
                    buttonTitle:"Save",
                },
            },
        ];
})();
