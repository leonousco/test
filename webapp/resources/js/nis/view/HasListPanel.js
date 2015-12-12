
(function () {
	'use strict';

	Nis.View.HasList = {
		showList:function(params){
			this.listRegion.show(this.makeList(params));
		},
		getList:function() {
			return this.listRegion.currentView.getContents();
		},
		makeList: function(params) {
			return this.makeListTableView(params);
		},
		onMakeListOption:function(collection){
		},
		makeListTableView:function(params){
			var options = this.onMakeListOption(this.getCollection());
			var table = new Uic.Table(options);
			var view = new Uic.TableView();
			view.setParentView(this);
			view.setTable(table);
            	view.on("modelChanged", this.modelChanged);
            	view.on("itemClick", this.onTableItemClick.bind(this));
			view.setCurrentPage(0);
			return view;
		},
		getCollection:function(){
			return this.collection;
		},
		modelChanged: function(model, collection) {
			console.log("modelChanged:", collection, ", model:", model);
			collection.remove(model);
		},
		onTableItemClick:function(view, model, options) {
			console.log("onTableItemClick: ", model);
			this.onTableItemSelected(model);
		},
		onTableItemSelected:function(model) {
			this.getDetails().setModel(model);
			this.setButtonsEnble(true);
		},
	};  // end of NisMVC.SearchTopLayout

	Nis.View.HasListPanel = _.extend(Nis.View.HasList, {
		makeList: function(params) {
			var view = this.makeListTableView(params);
			var panelLayout = this.makeListPanel(params);
			if(panelLayout) {				
				panelLayout.setContents(view);
				return panelLayout;
			}
			return view;
		},		
		makeListPanel:function(params){
			var panelOptions = {
				hasHeader:true,
			};
			if(params)
				panelOptions = params;
			var panelLayout = new Uic.PanelLayout(panelOptions);
			panelLayout.setHeader(this.onTitles('list', params));
			var buttons = this.makeListFooter(params);
			if(buttons)
				panelLayout.setFooter(buttons);			
			return panelLayout;
		},
		makeListFooter:function(params){
			return null;
		},
		
	});


})();

