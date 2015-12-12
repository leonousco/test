
(function () {
    'use strict';


    Nis.Model.CCM = Nis.Model.extend({
        defaults: {
            modelName: null,
            modelType:null,
            creator:null,
            version:null,
        },
        initialize: function (options) {
            this.validators = {};
            var newOptions = _.extend({
                entityName:Nis.Model.CCM.EntityName,
                serverName:Nis.Model.CCM.Server,
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
        parse: function (response, options) {
            console.log("parse: Inside Parse ", response.statusCode);
            var value = response;
            if(response.statusCode != Nis.Code.ResponseOk) {
                return null;
            }
            if(response.body)
                value = response.body;
            //this.set(value);
            console.log(this.toJSON());
            return value;
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

    Nis.Model.CCM.Server = "ccm";
    Nis.Model.CCM.EntityName = "CCMModel";

    Nis.Model.CCMList = Nis.Collection.extend({
        model: Nis.Model.CCM,
        initialize: function(options){
            console.log("initialize: CCMList");
            var newOptions = _.extend({
                entityName:Nis.Model.CCM.EntityName,
                serverName:Nis.Model.CCM.Server,
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

    Nis.Model.CCM.columns = [
            {
                dbid: "modelName",
                label: "Name",
                content: '<a type="type_id">{{modelName}}</a>',
                cell : "id"
            },
            {
                dbid: "modelType",
                label: "type",
            },        
            {
                dbid: "creator",
                label: "creator",
            },        
            {
                dbid: "version",
                label: "Version",
            },       
        ], // end of columns

  Nis.Model.CCM.buttons = [
            {
                data: {
                    buttonId:"modify",
                    buttonClass:"btn btn-primary",
                    buttonTitle:"Modify",
                },
            },
        ];
})();
