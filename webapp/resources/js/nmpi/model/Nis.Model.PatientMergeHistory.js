
(function () {
    'use strict';


    Nis.Model.PatientMergeHistory = Nis.Model.extend({
        defaults: {
            id: null,
            fromOid: "",
            fromLocalId: "",
            fromMpi: "",
            toOid: "",
            toLocalId: "",
            toMpi: "",
            dateCreated: "",
            dateVoided: "",
            dateModified: "",
            userCreated: "",
            userVoided: "",
            link: "",
        },
        url : function() {
            var link = this.attributes.link;
            console.log("url(): link:", link);
            if(link) {
                return link;
            }
            //return  'http://192.168.0.169:8080/nmpi_server/api/v1' + '/' + 'Patient';
            //return entityUrl.url(this.id);
            return entityUrl.url(this.id, Nis.Model.PatientEntityName, Nis.Model.PatientServer);
        },
        initialize: function (options) {
            console.log("initialize:     " + options);
            //map key/value for validation
            this.validators = {};
            console.log("initialize: OrgRequestList");
            var newOptions = _.extend({
                entityName:Nis.Model.PatientMergeHistory.EntityName,
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
        parse: function (response) {
            console.log("Inside Parse");
            var value = response;
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
    }); // end of

    Nis.Model.PatientMergeHistory.EntityName = "PatientMergeHistory";

    Nis.Collection.PatientMergeHistory = Nis.Collection.extend({
        model: Nis.Model.PatientMergeHistory,
        initialize: function(){
            console.log("initialized", this.url);
            var newOptions = _.extend({
                entityName:Nis.Model.PatientMergeHistory.EntityName,
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
    });//end of
    Nis.Model.PatientMergeHistory.columns = [
                {
                    label:"일련번호",
                    dbid:"id",
                },
                {
                    label:"소멸 OID",
                    dbid:"fromOid",
                },
                {
                    label:"소멸 LocalID",
                    dbid:"fromLocalId",
                },
                {
                    label:"소멸 MPID",
                    dbid:"fromMpi",
                },
                {
                    label:"병합 OID",
                    dbid:"toOid",
                },
                {
                    label:"병합 LocalID",
                    dbid:"toLocalId",
                },
                {
                    label:"병합 MPID",
                    dbid:"toMpi",
                },
                {
                    label:"최초생성일",
                    dbid:"dateCreated",
                },
            ];
})();
