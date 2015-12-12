/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
    'use strict';

    NisMVC.PatientAdd = Nis.View.MainLayout.extend({
        initialize: function(options) {
            console.log('initialize:', options);
            Nis.View.MainLayout.prototype.initialize.call(this, options);
            //this.showTitle("<h3>환자 등록</h3>");
            this.showMainMiddle();
            this.showMainBottom();
        },
        makeSSNInput:function(options){
            console.log('makeSSNInput:', options);
            if(this.ssnInput) {
            }
            else {
                this.ssnInput = new Uic.SSNInputGroup(options);                
            }
            //return this.ssnInput.getInput(options.data.dbid);
            return this.ssnInput;
        },
        makeMainMiddle:function(options) {

            var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.Patient.columns});

            var formItems = util.select(['oid', 'localId','patientName','isForeigner', 'patientFirstRrn', 'patientLastRrn', 'dateOfBirth','gender','patientPhoneNumber','patientHomeNumber','passportNumber','email','patientAddress','homePostalCode','officeName','officeNumber','officePostalCode','officeAddress','multipleBirth','birthOrder','licenseNumber','deathTime']);


            formItems = util.select(['oid','localId','patientName','patientFirstRrn','patientLastRrn','dateOfBirth','gender']);
            util.getColumn('patientFirstRrn').buildCb = this.makeSSNInput.bind(this);
            util.getColumn('patientLastRrn').buildCb = this.makeSSNInput.bind(this);

            var form1 = new Uic.FormView({ items:formItems});

            formItems = util.select(['patientPhoneNumber', 'patientHomeNumber', 'officeNumber','email']);
            var form2 = new Uic.FormView({ items:formItems});

            formItems = util.select(['homePostalCode','patientAddress']);
            var form3 = new Uic.FormView({ items:formItems});

            formItems = util.select(['officeName','officeAddress','officePostalCode']);
            var form4 = new Uic.FormView({ items:formItems});

            formItems = util.select(['isForeigner','passportNumber','multipleBirth','licenseNumber','birthOrder','deathTime']);
            var form5 = new Uic.FormView({ items:formItems});

            //var view = new Uic.FormView({items:formItems});
            //return view;
            var formLayout = new Uic.FormLayout();
            formLayout.setGroups({
                groups:[
                    {
                        title:'필수 항목',
                        body:form1,
                        collapse:false,
                    },
                    {
                        title:'연락수단',
                        body:form2,
                    },
                    {
                        title:'자택',
                        body:form3,
                    },
                    {
                        title:'직장',
                        body:form4,
                    },
                    {
                        title:'기타정보',
                        body:form5,
                    },
                ],
            });
            //return view;
            var model = new Nis.Model.Patient({
                oid:NisMVC.App.getHospitalOid(),
            });
            formLayout.setModel(model);
            if(this.ssnInput) {
                this.ssnInput.setModel(model);
            }


            var validate = {
                localId:util.makeValidateRule('localId'),
                patientName:util.makeValidateRule('patientName'),
                patientFirstRrn:util.makeValidateRule('patientFirstRrn'),
                patientLastRrn:util.makeValidateRule('patientLastRrn'),
                dateOfBirth:util.makeValidateRule('dateOfBirth'),
                gender:util.makeValidateRule('gender'),
            };
            form1.setValidate(validate);
            formLayout.setTitle("환자 등록");
            return formLayout;
        },
        makeMainBottom:function(options) {
            var buttons = this.makeButtons(
                {buttonId:["submit"]},
                this.onClickButton);
            return buttons;
        },
        onClickButton:function(buttonId){
            console.log("onClickButton:", buttonId);
            var form = this.getMainMiddle();
            var oid = form.$el.find('#oid').val();
            var localId = form.$el.find('#localId').val();
            form.getModel().createPatientWithOid(oid, localId,
                this.onSuccessCreate.bind(this), this.onFailCreate.bind(this));
        },
        /*
        showItem:function(param) {
            console.log('showOrgInfo:');
            var view = new Uic.Form(NisMVC.uiStore.patientFormUi);
            view.setButtonCb('#save', this.onBeforeCreatePatient.bind(this));
            view.model = ;
            this.left.show(view);
        },
        */
        onBeforeCreatePatient:function(model, form) {
            console.log('onBeforeCreatePatient: ', model);
        },
        onSuccessCreate:function(data) {
            console.log('onSuccessCreate: ', data);
        },
        onFailCreate:function(obj, status) {
            console.log('onFailCreate: ', status);
        },
        /*
        onButtonClick:function(text, id, view) {
            console.log("onButtonClick: ", id);
            var thisView = view.parentView;
            var model = view.model;
            model.save();
        },
        */
    });

})();
