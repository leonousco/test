
(function () {
	'use strict';

	Nis.View.HasDetails = {
		showDetails:function(params){
			this.detailsRegion.show(this.makeDetails(params));
		},
		hideDetails:function(){
			this.detailsRegion.empty();			
		},
		getDetails:function() {
			if(this.detailsRegion.currentView)
				return this.detailsRegion.currentView.getContents();
			return null;
		},
		onDetailsOptions:function(util, params){
		},
		makeDetails:function(params){
			return this.makeDetailsFormView(params);
		},
		makeDetailsValiate:function(util, params){
			return null;
		},
		makeDetailsFormView:function(params){
			var util = this.getDetailsItemUtil();
			var options = this.onDetailsOptions(util, params);
			if(! this.isDetailsUpdatable(params)) {
				options.readOnly = true;
			}
			var form = new Uic.FormView(options);
			form.on('onAddressSearched', this.onAddressSearched.bind(this));
			var validate = this.makeDetailsValiate(util, params);
			if(validate)
				form.setValidate(validate);
			if(params && params.model) {
				form.setModel(params.model);
			}
			form.on('onValidated', this.onValidated.bind(this));
			return form;
		},
		getModel:function(){
			return this.getDetails().getModel();
		},
		getDetailsItemUtil:function(){
			return this.getCollection().getItemUtil();
		},
		onValidated:function(dbid, value) {
		},
		isDetailsUpdatable:function(params){
			return true;
		},
		setInputData:function(key, value){
			this.getDetails().getInput(key).setValue(value);
			this.getModel().set(key, value);
		},
	};

	_.extend(Nis.View.HasDetails, Uic.Input.HasAddressSearch);


	Nis.View.HasDetailsPanel = _.extend(Nis.View.HasDetails, {
		makeDetails:function(params){
			var form = this.makeDetailsFormView(params);
			var view = this.makeDetailsPanel(params);
			if(view) {
				view.setContents(form);				
				return view;
			}
			return form;
		},
		makeDetailsPanel:function(params){
			var view = new Uic.PanelLayout(this.onDetailsPanelOptions(params));
			view.setHeader(this.onTitles('detail', params));
			var footer = this.makeDetailsFooter(params);
			if(footer)
				view.setFooter(footer);
			return view;
		},
		makeDetailsFooter:function(params){
			return null;
		},
		onDetailsPanelOptions:function(params){
			return {hasHeader:true};
		},		
	});


})();

