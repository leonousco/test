
(function () {
	'use strict';

	NisMVC.MSearchContainer = Uic.LayoutView.extend({
        regions: {
            top: '#top_area',
            bottom: '#bottom_area',
        },
        collection:new Nis.Model.PatientList(),
        initialize:function(options) {
            Uic.LayoutView.prototype.initialize.call(this, options);
            this.top.show(this.makeSearchForm(options));
        },
        getCollection:function(){
            return this.collection;
        },
        makeSearchForm:function(options) {
            var formLayout = new Uic.FormLayout();
            formLayout.setTitle(options.titleTop);
            var view = new NisMVC.MergeSearchLayout();
            view.on('click.search', this.onClickSearch.bind(this));
            formLayout.setForm(view);
            return formLayout;
        },
        makeForm:function() {
            var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.Patient.columns});
            var formItems = util.select(['oid', 'localId','patientName','isForeigner', 'patientFirstRrn', 'patientLastRrn', 'dateOfBirth','gender','passportNumber','patientPhoneNumber','patientHomeNumber','email','patientAddress','homePostalCode','officeName','officeNumber','officePostalCode','officeAddress','multipleBirth','birthOrder','licenseNumber','deathTime']);


            var view = new Uic.FormView({readOnly:true, items:formItems});
            var formLayout = new Uic.FormLayout();
            formLayout.setTitle(this.options.titleBottom);
            formLayout.setForm(view);
            return formLayout;
        },
        onClickSearch:function(options) {
            /*
            var view = new NisMVC.PatientsTable({
                collection:this.getCollection(),
                hasQuery:true,
                queryParam:options,
            });
            //view.on('click:table:item', this.onClickTableItem.bind(this));
            this.bottom.show(view);
            */

            options.success = this.onSuccessSearch.bind(this);
            options.error = this.onErrorSearch.bind(this);
            var collection = new Nis.Model.PatientList();
            if(options.localId) {
                collection.searchPatientByOid(options);
            }
            else {
                options.hasQuery = true;
                options.queryParam = {
                    patientFirstRrn:options.patientFirstRrn,
                    patientLastRrn:options.patientLastRrn,
                }
                collection.searchPatientByQuery(options);
            }

        },
        onSuccessSearch:function(response) {
            console.log("onSuccessSearch:", response);
            var result = response;
            if(response.body)
                result  =response.body;
            if(result.length == 0) {
                var view = new Uic.Well();
                view.setText('검색결과가 없습니다.');
                //TODO : show empty dlg
                //Uic.showModal("Not Implemented !!!", "[[ Model ]]   ");
                //var view = new Uic.View("Not ....");
                this.bottom.show(view);
                return;
                //var modal = new Uic.Modal();
            }
            var patient = result[0];
            var view = this.makeForm();
            this.bottom.show(view);
            view.getForm().setModelAttrs(patient);
            this.localIdInfo = {
                oid:patient.oid,
                localId:patient.localId,
            };
        },
        onErrorSearch:function(options) {
            console.log("onErrorSearch:", options);
        },
        getLocalIdInfo:function() {
            return this.localIdInfo;
        },
        getDefaultTemplate:function() {
            var ret = ''
                +'<div id="top_area" class="row">'
                +'</div>'
                +'<div id="bottom_area" class="row"> '
                +'</div>';
            return ret;
        },
	}); // end of NisMVC.MSearchContainer

})();

