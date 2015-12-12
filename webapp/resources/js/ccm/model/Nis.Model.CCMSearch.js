(function () {
    'use strict';

    // ----------
    Nis.Model.CCMSearch = Nis.Model.extend({
        defaults: {
	    		ClinicalObservation:null,
	    		Laboratory:null,
	    		ccmModel:null,
	    		ccmEntity:null,
	    		ccmModifier:null,
	    		ccmQualifier:null,
	    		ValueItem:null,
	    		ValueSet:null,
	    },
        initialize: function (options, server) {
            console.log("initialize:     " + options);
            //map key/value for validation
            this.validators = {};
            console.log("initialize: CCMSearch");
            var newOptions = _.extend({
                entityName:Nis.Model.CCMSearch.EntityName,
                serverName:Nis.Model.CCMSearch.Server,
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
        events: {
            "click #search" : "beforeSearch",
        },       
        beforeSearch: function() {
            console.log("beforeSearch : ");

            var test = document.getElementById("inputBox");
            console.log("this.model : " + test.value);

            $.ajax({
                    url : "192.168.0.64:8880/ccm_server/api/v1/token/no-token/CCMSearch/list?page=0&size=10", 
                    type: "POST",
                    data : JSON.parse(test.value),
                    contentType: "plain/text", 
                    success:function(data){
                        alert("success");
                        window.location.href="#detail";
                    }, 
                    error: function (request, status, error) {
                        alert("error");
                    }    
                });
        },

    });
    
    Nis.Model.CCMSearch.EntityName = "CCMSearch";

    Nis.Model.CCMSearchList = Nis.Collection.extend({
        model: Nis.Model.CCMSearch,
        initialize: function(options){
            console.log("initialize: CCMList");
            var newOptions = _.extend({
                entityName:Nis.Model.CCMSearch.EntityName,
                serverName:Nis.Model.CCMSearch.Server,
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

    Nis.Model.CCMSearch.columns = [
            {
                dbid: "ClinicalObservation",
                label: "ClinicalObservation",
                type:"checkbox",
            },
            {
                dbid: "Laboratory",
                label: "Laboratory",
                type:"checkbox",
            },        
            {
                dbid: "ccmEntity",
                label: "ccmEntity",
                type:"checkbox",
            },        
            {
                dbid: "ccmQualifier",
                label: "ccmQualifier",
                type:"checkbox",
            },
            {
                dbid: "ValueItem",
                label: "ValueItem",
                type:"checkbox",
            },        
            {
                dbid: "ValueSet",
                label: "ValueSet",
                type:"checkbox",
            },              
        ]; // end of columns
})();
