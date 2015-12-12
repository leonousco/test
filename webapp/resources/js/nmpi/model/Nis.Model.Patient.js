

(function () {
    'use strict';


    Nis.Model.PatientEntityName = "Patient";

    // ----------
    Nis.Model.Patient = Nis.Model.extend({
        defaults: {
            id: null,
            dateCreated: "",
            dateVoided: "",
            dateModified: "",
            userCreated: "",
            userVoided: "",
            link: "",

            patientFirstRrn: "",
            patientLastRrn: "",
            dateOfBirth: "",
            email: "",
            patientName: "",
            officeName: "",
            patientPhoneNumber: "",
            patientHomeNumber: "",
            officeNumber: "",
            homePostalCode: "",
            officePostalCode: "",
            licenseNumber: "",
            patientAddress: "",
            officeAddress: "",
            gender: "",
            birthOrder: "",
            countryCode: "",
            multipleBirth: "",
            deathTime: "",
            isForeigner: "",
            passportNumber: "",
            oid:null,
            localId:null,

//          requestStatus: "REQUEST",/home/baron/project/mw2015/nis/nidsweb/src/main/webapp/resources/js/nhp/model/Nis.Model.Organization.js
//          approveStatus: "CREATE",

        },
        initialize: function (options) {
            console.log("initialize:     " + options);
            //map key/value for validation
            this.validators = {};
            console.log("initialize: OrgRequestList");
            var newOptions = _.extend({
                entityName:Nis.Model.PatientEntityName,
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
        createPatientWithOid:function(oid, localId, onSuccess, onFail) {
            //TODO: [20151109 basil #9808]
            var url = this.getEntityUrl() + "/oid/" + oid + "/localId/" + localId;
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
                'success': onSuccess,
                'error': onFail
            });
        },
    });

    Nis.Model.Patient.Server = "nmpi";

    Nis.Model.PatientList = Nis.Collection.extend({
        model: Nis.Model.Patient,
        initialize: function(options){
            console.log("collection initialized");
            var newOptions = _.extend({
                entityName:Nis.Model.PatientEntityName,
                serverName:Nis.Model.Patient.Server,
            }, options);
            this.setItemUtil(Nis.Model.Patient.columns);
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
        searchPatientByOid:function(options) {
            var url = this.getEntityUrl() + "/oid/" +options.oid + "/localId/" + options.localId + "/list";
            console.log("searchPatientByOid:", url);
            var self = this;
            $.ajax({
                url: url,
                dataType: 'json',
                success: options.success,
                error: options.error,
            });
        },
        searchPatientByQuery:function(options) {
            this.getPagedList(options, options.success, options.error);
        }

    }); // end of

    Nis.Model.Patient.columns = [
                {
                    label:"일련번호",
                    dbid:"id",
                },
                {
                    label:"UUID",
                    dbid:"uuid",
                },
                {
                    label:"OID",
                    dbid:"oid",
                    placeholder:"2.16.410.123456.1.xxxxxx",
                    mandatory:true,
                },
                {
                    label:"Local ID",
                    dbid:"localId",
                    mandatory:true,
                    required:true,
                },
                {
                    label:"환자성명",
                    dbid:"patientName",
                    mandatory:true,
                    required:true,
                },
                {
                    label:"외국인 여부",
                    dbid:"isForeigner",
                    //mandatory:true,
                    //required:true,
                    type: 'radio',
                    conceptId:'IsForeigner'
                },
                {
                    label:"환자주민등록앞번호",
                    dbid:"patientFirstRrn",
                    mandatory:true,
                    required:true,
                },
                {
                    label:"환자주민등록뒷번호",
                    dbid:"patientLastRrn",
                    mandatory:true,
                    required:true,
                },
                {
                    label:"생년월일",
                    mandatory:true,
                    dbid:"dateOfBirth",
                    required:true,
                },
                {
                    label:"성별",
                    mandatory:true,
                    dbid:"gender",
                    type: 'radio',
                    conceptId:'sex'
                },
                {
                    label:"환자 휴대폰 번호",
                    //mandatory:true,
                    dbid:"patientPhoneNumber",
                    type:'mobile',
                },
                {
                    label:"환자 집전화 번호",
                    //mandatory:true,
                    dbid:"patientHomeNumber",
                    type:'tel',
                },
                {
                    label:"여권번호",
                    dbid:"passportNumber",
                },
                {
                    label:"이메일",
                    dbid:"email",
                },
                {
                    label:"환자주소",
                    dbid:"patientAddress",
                },
                {
                    label:"자택우편코드",
                    dbid:"homePostalCode",
                    type:'postalCode',
                },
                {
                    label:"직장명",
                    dbid:"officeName",
                },
                {
                    label:"직장전화번호",
                    dbid:"officeNumber",
                    type:'tel',
                },
                {
                    label:"직장우편코드",
                    dbid:"officePostalCode",
                    type:'postalCode',
                },
                {
                    label:"직장주소",
                    dbid:"officeAddress",
                },
                {
                    label:"쌍둥이 여부",
                    dbid:"multipleBirth",
                    type: 'select',
                    conceptId:'MultipleBirth'
                },
                {
                    label:"출생순위",
                    dbid:"birthOrder",
                    type: 'select',
                    conceptId:'BirthOrder'
                },
                {
                    label:"운전면허 번호",
                    dbid:"licenseNumber",
                },
                {
                    label:"사망 일시",
                    dbid:"deathTime",
                },
                {
                    label:"최초 생성일",
                    dbid:"dateCreated",
                },

            ];


})();
