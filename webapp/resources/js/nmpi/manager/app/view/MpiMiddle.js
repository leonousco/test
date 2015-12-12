
(function () {
	'use strict';

	Nis.View.MpiMiddle = Nis.View.VerticalLayout.extend({
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.VerticalLayout.prototype.initialize.call(this, {id:'MpiMiddle'});
            this.model = options.model;
            this.showTitle("병원 방문 정보");
            this.showView('middle');
        },
        makeView:function(position) {
            if(position === 'middle') {
                return this.makeTable();
            }
            else if(position === 'bottom') {
                return this.makeDetail();
            }
		},
        makeTable:function() {
            //var columns = (new Nis.UiInfo.ItemUtil({items:Nis.Model.PatientVisit.columns})).select(['id', 'hospitalName', 'dateCreated']);
            var options = {
                collection:new Nis.Model.PatientVisitList(),
                columns:Nis.Model.PatientVisit.columns,
                hasQuery:true,
                queryParam: {
                    eventType:Nis.Code.PatientEventType.revisit,
                },
            };
            var table = new Uic.Table(options);
            table.on(Uic.Table.ItemClick, this.onClickTableItem.bind(this));
            var view = new Uic.TableView();
            view.setTable(table);
            view.setCurrentPage(0);
            return view;
        },
        onClickTableItem:function(model, view, options) {
            this.showView('bottom');
            var options = {
                oid: model.attributes.oid,
                localId: model.attributes.localId,
                success:this.onSuccessQueryPatient.bind(this),
                error:this.onErrorQueryPatient.bind(this),
            };
            var patientModel = new Nis.Model.PatientList();
            patientModel.searchPatientByOid(options);
        },
        onSuccessQueryPatient:function(resp) {
            console.log("onSuccessQueryPatient:", resp);
            var patientL = resp;
            if(resp.body)
                patientL =  resp.body;
            if(patientL.length > 0) {
                var form = this.getView('bottom');
                form.setModelAttrs(patientL[0]);
            }
        },
        onErrorQueryPatient:function(resp) {
            console.log("onErrorQueryPatient:", resp);
        },
        makeDetail:function() {
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
                formLayout.setTitle("상세 환자 정보");
                //return view;
                return formLayout;

        },

    })
})();

