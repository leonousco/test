
(function () {
    'use strict';


    Nis.Model.PatientVisit = Nis.Model.extend({
        defaults: {
            id: null,
            oid: "",
            localId: "",
            hospitalName: "",
            eventType: "", // Create/Register/Revisit
            dateCreated: "",
            dateVoided: "",
            dateModified: "",
            userCreated: "",
            userVoided: "",
            hospitalName: "",
            link: "",
        },
        initialize: function (options) {
            console.log("initialize:     " + options);
            //map key/value for validation
            this.validators = {};
            console.log("initialize: OrgRequestList");
            var newOptions = _.extend({
                entityName:Nis.Model.PatientVisit.EntityName,
                serverName:Nis.Model.Patient.Server,
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
    }); // end of

    Nis.Model.PatientVisit.EntityName = "PatientVisit";

    Nis.Model.PatientVisitList = Nis.Collection.extend({
        model: Nis.Model.PatientVisit,
        initialize: function(options){
            console.log("initialized", this.url);
            var newOptions = _.extend({
                entityName:Nis.Model.PatientVisit.EntityName,
                serverName:Nis.Model.Patient.Server,
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
        parse: function (response) {
            console.log("Inside Parse");
            var values = response.body;
            if(values) {
                for (var i = 0, length = values.length; i < length; i++) {
                    var currentValues = values[i];
                    this.push(currentValues);
                }
            }
            console.log(this.toJSON());
            return this.models;
        },
    });//end

    Nis.Model.PatientVisit.columns = [
                {
                    label:"일련번호",
                    dbid:"id",
                },
                {
                    label:"OID",
                    dbid:"oid",
                },
                {
                    label:"Local ID",
                    dbid:"localId",
                },
                {
                    label:"병원이름",
                    dbid:"hospitalName",
                },
                {
                    label:"방문일자",
                    dbid:"dateCreated",
                    mandatory:true,
                },

            ];

})();
