
(function () {
	'use strict';

	Nis.View.PatientMiddle = Nis.View.VerticalLayout.extend({
        /*
        id:'PatientMiddle',
        regions: {
            top: '#top'+'PatientMiddle',
            middle: '#middle'+'PatientMiddle',
            bottom: '#bottom'+'PatientMiddle',
        },
        */
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.VerticalLayout.prototype.initialize.call(this, {id:'PatientMiddle'});
            this.model = options.model;
            //this.showTitle("환자 상세 정보");
            this.showView('middle');

		},
        makeView:function(position) {
            if(position === 'middle') {
             var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.Patient.columns});

            var formItems = util.select(['oid', 'localId','patientName','isForeigner', 'patientFirstRrn', 'patientLastRrn', 'dateOfBirth','gender','patientPhoneNumber','patientHomeNumber','passportNumber','email','patientAddress','homePostalCode','officeName','officeNumber','officePostalCode','officeAddress','multipleBirth','birthOrder','licenseNumber','deathTime']);


            formItems = util.select(['oid', 'localId','patientName','patientFirstRrn','patientLastRrn','dateOfBirth','gender']);
            var form1 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['patientPhoneNumber', 'patientHomeNumber', 'officeNumber','email']);
            var form2 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['homePostalCode','patientAddress']);
            var form3 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['officeName','officeAddress','officePostalCode']);
            var form4 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['isForeigner','passportNumber','multipleBirth','licenseNumber','birthOrder','deathTime']);
            var form5 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['oid', 'localId','patientName','patientFirstRrn','patientLastRrn','dateOfBirth','gender']);
            var form1 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['patientPhoneNumber', 'patientHomeNumber', 'officeNumber','email']);
            var form2 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['patientAddress', 'homePostalCode']);
            var form3 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['officeName','officeAddress','officePostalCode']);
            var form4 = new Uic.FormView({readOnly:true, items:formItems});

            formItems = util.select(['isForeigner','passportNumber','multipleBirth','licenseNumber','birthOrder','deathTime']);
            var form5 = new Uic.FormView({readOnly:true, items:formItems});
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
                if(! _.isUndefined(this.model))
                    formLayout.setModel(this.model);
                formLayout.setTitle("상세 환자 정보");
                return formLayout;
                //return formLayout;
            }
        },
        /*
        getDefaultTemplate:function() {
            var ret =''
                +'<div id="topPatientMiddle" class="row"> top'
                +'</div>'
                +'<div id="middlePatientMiddle" class="row"> middle'
                +'</div>'
                +'<div id="bottomPatientMiddle" class="row"> bottom'
                +'</div>'
            return ret;
        },
        */
    })
})();

