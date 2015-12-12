
(function () {
	'use strict';

    Nis.View.HasSearchControl = {
		showSearchControl:function(){
			var view = this.makeSearchControl();
			this.searchCondition.show(view);
			this.getSearchControl().initView();
		},
		getSearchControl:function(){
			return this.searchCondition.currentView.getContents();
		},
		onMakeSearchControl:function() {
		},
		makeSearchControl:function(){
			var view = this.onMakeSearchControl();
			view.on('onChange', this.onChangeSearch.bind(this));
			//return view;
			var panelLayout = new Uic.PanelLayout({
				className:'panel panel-info',
				hasHeader:true
			});
			panelLayout.setHeader('검색조건');
			panelLayout.setContents(view);
			return panelLayout;
		},
		makeSearchOption:function(selected, dbid){
		    console.log('onChangeSearch:', selected, dbid);
		    var options = {
		        queryParam:selected,
		        success:this.onSuccessQuery.bind(this),
		        error:this.onErrorQuery.bind(this),
		    };
		    return options;
		},
		onChangeSearch:function(selected, dbid){
			console.log('onChangeSearch:', selected, dbid);
			var options = this.makeSearchOption(selected, dbid);
			this.getCollection().query(options);
		},
		onSuccessQuery:function(resp){
			console.log('onSuccessQuery:', resp);
		},
		onErrorQuery:function(resp){
			console.log('onErrorQuery:', resp);
		},    	
    } // end of Uic.View.HasCollectionMixin

    _.extend(Nis.View.HasSearchControl, Uic.View.HasCollectionMixin);  
    


})();

