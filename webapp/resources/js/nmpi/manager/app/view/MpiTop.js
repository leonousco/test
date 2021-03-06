
(function () {
	'use strict';

	Nis.View.MpiTop = Nis.View.MainTopLayout.extend({
        collection:new Nis.Model.PatientList(),
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.MainTopLayout.prototype.initialize.call(this, {id:'MpiTop'});
            this.showTitle("MPI");
            this.showSearch();
            this.showTable();
		},
        makeSearch:function(options) {
            var view = new Nis.View.PatientSearchControl({
                collection:this.getCollection(),
            });
            view.initView();
            //view.on('onClickSearch', this.onClickSearch.bind(this));
            view.on('onChange', this.onChangeSearch.bind(this));
            return view;
        },
        makeTable:function(params) {

            var columns = (new Nis.UiInfo.ItemUtil({items:Nis.Model.Patient.columns}))
                .select(['id','patientName', 'gender', 'dateOfBirth']);
            var options = {
                collection:this.getCollection(),
                columns:columns,
            };
            var table = new Uic.Table(options);
            table.on(Uic.Table.ItemClick, this.onClickTableItem.bind(this));
            var view = new Uic.TableView();
            view.setTable(table);
            view.setCurrentPage(0);
            if(params) {
                options.collection.reset(params);
            }
            return view;
        },

        onClickTableItem:function(model, view, options){
            console.log("onClickTableItem:");
            this.trigger('click.mainTable', model);
        },
        onClickSearch:function(params){
            console.log('onClickSearch:', params);
            var patientCollection = new Nis.Model.PatientList();
            var options = {};
            options.success = this.onSuccessSearch.bind(this);
            options.error = this.onErrorSearch.bind(this);
            options.hasQuery = true;
            delete params.type;
            options.queryParam = params;
            patientCollection.searchPatientByQuery(options);
        },
        onSuccessSearch:function(response) {
            console.log("onSuccessSearch:", response);
            var result = response;
            if(response.body)
                result  =response.body;
            if(this.getTable())
                this.getTable().getTable().getCollection().reset(result);
            else
                this.showTable(result);

        },
        onErrorSearch:function(options) {
            console.log("onErrorSearch:", options);
        },
        /*
        getDefaultTemplate:function() {
            var ret =''
                +'<div id="topPatientTop" class="row"> top'
                +'</div>'
                +'<div id="middlePatientTop" class="row"> middle'
                +'</div>'
                +'<div id="bottomPatientTop" class="row"> bottom'
                +'</div>'
            return ret;
        },
        */
    })

    _.extend(Nis.View.MpiTop.prototype, Nis.View.HasMPISearchControl);

})();

