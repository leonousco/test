
(function () {
	'use strict';

	Nis.View.PatientTop = Nis.View.MainTopLayout.extend({
		collection:new Nis.Model.PatientList(),
		initialize: function(options) {
			console.log('initialize:', options);
			Nis.View.MainTopLayout.prototype.initialize.call(this, {id:'PatientTop'});
			this.showTitle("환자");
			this.showSearch();
			this.showTable();
		},
		getCollection:function() {
			return this.collection;
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
			var columns = (new Nis.UiInfo.ItemUtil({
				items:Nis.Model.Patient.columns
			})).select(['id','patientName','dateOfBirth', 'gender', 'patientPhoneNumber', 'dateCreated']);

			var options = {
				collection:this.getCollection(),
				columns:columns,
			};

			var table = new Uic.Table(options);
			table.on(Uic.Table.ItemClick, this.onClickTableItem.bind(this));
			var view = new Uic.TableView();
			view.setTable(table);
			options.collection.reset(params);
			return view;
		},
		onClickTableItem:function(model, view, options){
			console.log("onClickTableItem:");
			this.trigger('click.mainTable', model);
		},
		/*
		onClickSearch:function(param){
			console.log("onClickSearch:", param);
			var patientCollection = new Nis.Model.PatientList();
			var options = {};
			options.success = this.onSuccessSearch.bind(this);
			options.error = this.onErrorSearch.bind(this);
			//var collection = this.result.currentView.getCollection();
			if(param.type === "localId") {
				options = _.extend(options, param);
				patientCollection.searchPatientByOid(options);
			}
			if(param.type === "patientInfo") {
				options.hasQuery = true;
				options.queryParam = param;
				delete options.queryParam.type;
				patientCollection.searchPatientByQuery(options);
			}
		},
		onSuccessSearch:function(response) {
			console.log("onSuccessSearch:", response);
			var result = response;
			if(response.body)
				result  =response.body;
			this.showTable(result);
			// for temporary test
			//this.trigger('click.mainTable');
		},
		onErrorSearch:function(options) {
			console.log("onErrorSearch:", options);
		},
		*/
	})

	//_.extend(Nis.View.PatientTop.prototype, Nis.View.SearchControlMixin);
	_.extend(Nis.View.PatientTop.prototype, Nis.View.HasSearchControl);

})();

