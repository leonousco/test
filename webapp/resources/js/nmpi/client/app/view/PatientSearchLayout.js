
(function () {
	'use strict';

    Nis.View.MpiSearchLayout = Uic.LayoutView.extend({
    });

    _.extend(Nis.View.MpiSearchLayout.prototype, Nis.View.HasSearchControl);


	NisMVC.PatientSearchLayout = Nis.View.MpiSearchLayout.extend({
        tagName:'div',
		className: 'col-sm-12',
        id:'page_contents',
        regions: {
            searchCondition: '#searchRegion',
            conditionSelect: '#left_up',

            conditionInput: '#right',
            result: '#bottom',
            patientInfo:'#patientInfo',
        },
        collection:new Nis.Model.PatientList(),
		initialize: function(options) {
			console.log('initialize:', options);
            Uic.LayoutView.prototype.initialize.call(this, options);
			//this.showPatientSearch();
            //this.showLocalCondition();
            this.showSearchControl();
            this.showPatientList();
            //this.showPatientInfo();
		},
        getCollection:function() {
            return this.collection;
        },
        getDefaultTemplate:function() {
            var ret =''
                +'<div id ="searchRegion" class ="col-sm-12">'
                +'</div>'
                +'<div id ="left" class ="col-sm-3">'
                //+'  <div class="page-header">'
                //+'      <h3>검색 방법</h3>'
                //+'</div>'
                    + '<div id="left_up" class="row-sm-6"></div>'
                +'</div>'
                +'<div id ="right" class ="col-sm-6"></div>'
                +'<div id="bottom" class="row-sm-12"></div>'
                +'<div id="patientInfo" class="row-sm-12"></div>'

            return ret;
        },
        onMakeSearchControl:function() {
            var view = new Nis.View.PatientSearchControl({
                collection:this.getCollection(),
            });
            return view;
        },


        showPatientInfo:function(model) {
            this.patientInfo.show(this.makePatientInfoForm(model));
        },
/*        makeGroupFormView:function(items){
            var formItems = util.select(items);
            var form = new Uic.FormView({readOnly:true, items:formItems});
            return form;
        },*/
        makePatientInfoForm:function(model) {
            var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.Patient.columns});

            var formItems = util.select(['oid', 'localId','patientName','isForeigner', 'patientFirstRrn', 'patientLastRrn', 'dateOfBirth','gender','patientPhoneNumber','patientHomeNumber','passportNumber','email','patientAddress','homePostalCode','officeName','officeNumber','officePostalCode','officeAddress','multipleBirth','birthOrder','licenseNumber','deathTime']);

            //var form1 = this.makeGroupFormView(['patientPhoneNumber', 'patientHomeNumber', 'officeNumber','email']);


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

            formLayout.setModel(model);
            formLayout.setTitle("상세 환자 정보");
            var buttons = new Uic.Buttons({
                buttons: {
                    buttonId:["visitSave"],
                },
            });
            formLayout.setFooter(buttons);
            buttons.on('click', this.onClickVisitButton.bind(this));

            //return view;
            return formLayout;
        },
        //TODO patient visit save event
        onClickVisitButton:function() {
            console.log("onClickVisitButton");
            var pmodel = this.patientInfo.currentView.getForm().getModel();
            //var oidInfoStr = localStorage.getItem('nis_oid_information');
            //var oidInfo = eval("("+oidInfoStr+")");

            var model = new Nis.Model.PatientVisit({
                oid:pmodel.get('oid'),
                localId:pmodel.get('localId'),
                eventType:Nis.Code.PatientEventType.revisit,
                hospitalName:NisMVC.App.getHospitalName(),
            });
            model.save(model.attributes, this.onSuccessSave.bind(this), this.onErrorSave.bind(this));
        },
        onSuccessSave:function() {
            console.log('onSuccessSave:');
        },
        onErrorSave:function() {
            console.log('onErrorSave:');
        },
        showPatientButton:function(param) {
            console.log('showPatientButton:');
            var view = new Uic.Form(NisMVC.uiStore.patientSearchButtomUi);
            this.searchStart.show(view);
            view.setButtonCb('#search', this.onBeforeSearchPatient.bind(this));
            view.model = new Nis.Model.PatientList();
        },
        showPatientCondition:function(options) {

            //var uiInfo = (new Nis.UiInfo.PatientInfoSearchUi()).getInfo();
            var view = new NisMVC.PatientSearchByInfo();
            view.getForm().on('click.search', this.onClickSearch.bind(this));

            this.conditionInput.show(view.getForm());
        },
        showPatientList:function() {
            console.log('showList:');

            //var uiInfo = new Nis.UiInfo.PatientList();
            /*
            var columns = (new Nis.UiInfo.ItemUtil({
                items:Nis.Model.Patient.columns
            })).select(['patientName','dateOfBirth', 'gender', 'patientPhoneNumber', 'email']);

            var options = {
                collection:this.getCollection(),
                columns:columns,
            };


            var table = new Uic.Table(options);
            table.on('click:table:item', this.onClickTableItem.bind(this));
            //var view = new Uic.TableView({pageSize:2});
            var view = new Uic.TableView();
            view.setTable(table);
            view.setCurrentPage(0);
            //view.fetch();
            */
            var view = new NisMVC.PatientsTable({
                collection:this.getCollection(),
            });
            view.on('click:table:item', this.onClickTableItem.bind(this));
            this.result.show(view);
        },
        onClickTableItem:function(model, view, options) {
            console.log("onClickTableItem:");
            this.showPatientInfo(model);
        },
        onBeforeSearchPatient:function(model, form) {
            console.log('onBeforeSearchPatient: ', model);
            var oid = form.$el.find('#oid').val();
            var localId = form.$el.find('#localID').val();
            model.searchPatientByOid(oid, localId,
                this.onSuccessSearch.bind(this), this.onFailSearch.bind(this));
        },
    });

    //_.extend(NisMVC.PatientSearchLayout.prototype, Nis.View.HasSearchControl);


})();
