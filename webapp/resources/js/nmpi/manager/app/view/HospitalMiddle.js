
(function () {
	'use strict';

	Nis.View.HospitalMiddle = Nis.View.VerticalLayout.extend({
        condition:'Register',
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.VerticalLayout.prototype.initialize.call(this, {id:'HospitalMiddle'});
            this.model = options.model;
            this.showTitle("생성 및 병합목록");
            this.showView('top');
            this.showView('middle');
		},
        makeView:function(position) {
            if(position === 'top') {
                return this.makeSelector();
            }
            else if(position === 'middle') {
                return this.makeTable();
            }
            else if(position === 'bottom') {
                return this.makeDetail();
            }
        },
        makeSelector:function() {
                var options = {
                    //className:'form-control input-lg selectpicker show-tick',
                    className:'input-lg selectpicker show-tick',
                    conceptId:'PatientSelectionCondition',
                };
                var view = new Uic.SelectPicker(options);
                view.on('onChange', this.onChangeSelector.bind(this));
                return view;
        },
        onChangeSelector:function(value, event) {
            console.log("onChangeSelector:", value);
            this.condition = value;
            this.showView('middle');
        },
        makeTable:function(){
                var columns = (new Nis.UiInfo.ItemUtil({
                    items:Nis.Model.Patient.columns
                })).select(['id', 'localId','patientName','dateOfBirth', 'gender', 'patientPhoneNumber', 'dateCreated']);
                var options = {
                    collection:new Nis.Model.PatientList(),
                    columns:columns,
                    hasQuery:true,
                    queryParam: {
                        oid:this.model.get('oid'),
                        condition:this.condition,
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
            //return view;
            formLayout.setTitle("상세 환자 정보");
            return formLayout;

        },

    })

    _.extend(Nis.View.HospitalMiddle.prototype, Nis.View.HasSearchControl);
})();

