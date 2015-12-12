

(function () {
	'use strict';

	NisMVC.MPersonMgrLayout = Nis.View.RequestBased.extend({
		collection:new Nis.Model.MPersonList(),
		onInit:function() {
			this.showSearchControl();
			this.showList({
				hasHeader:true,
				hasFooter:true,					
			});
		},		
		onTitles:function(type, params){
			if(type === 'list') {
				return '의료인 목록';
			}
			else if(type === 'detail') {
				if(params.requestType === Nis.Code.RequestType.create) {
					return '의료인 등록';					
				}
				else {
					return '의료인 변경/삭제';					
				}
			}
		},			
		showSearchControl:function(){
			var view = this.makeSearchControl();
			this.searchCondition.show(view);
			this.getSearchControl().initView();
		},
		getSearchControl:function(){
			return this.searchCondition.currentView.getContents();
		},
		makeSearchControl:function(){
			var view = new Nis.View.MPersonSearchControl({
				collection:this.getCollection(),
			});
			view.on('onChange', this.onChangeSearch.bind(this));
			//return view;
			var panelLayout = new Uic.PanelLayout({hasHeader:true});
			panelLayout.setHeader('검색 조건');
			panelLayout.setContents(view);
			return panelLayout;			
		},		
		onChangeSearch:function(selected, dbid){
			console.log('onChangeSearch:', selected, dbid);
			var options = {
				queryParam:selected,
				success:this.onSuccessQuery.bind(this),
				error:this.onErrorQuery.bind(this),
			};
			this.getCollection().query(options);
		},			
		onSuccessQuery:function(resp){
			console.log('onSuccessQuery:', resp);
		},
		onErrorQuery:function(resp){
			console.log('onErrorQuery:', resp);
		},		
		onMakeListOption:function(collection){
			var itemUtil = this.collection.getItemUtil();
			var options = {
				collection:collection,
				columns:itemUtil.select(
					['id', 'name', 'dateCreated']
				),
			};
			return options;
		},
		makeCreateButtons:function(){
			var buttonId = ['add'];
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onClickCreateButton);
			return buttons;			
		},
		onClickCreateButton:function() {
			console.log('onClickCreateButton:');			
			this.showDetails();
		},	
		onTableItemSelected:function(model) {
			this.showDetails({
				model:model, 
				title:this.onTitles('detail', {model:model}),
				hasFooter:true,
			});						
		},		
		onDetailsPanelOptions:function(params){
			var ret = {
				className:'panel panel-success',
				hasHeader:true,
				hasFooter:true,
			};
			if(params.requestType === Nis.Code.RequestType.create) {
				ret.className = 'panel panel-primary';
			}
			return ret;
		},				

		makeNewModel:function(){
			var model = new Nis.Model.MPerson();			
			//var org = NisMVC.App.getOrgInfo();
			var userInfo = NisMVC.App.userInfo;
			if(userInfo) {
				//model.attributes.oid = org.oid;
				if(NisMVC.App.userInfo) {
					console.log('makeNewModel:', userInfo);
				}
				//model.attributes.name = userInfo.userName;
				model.attributes.oid = NisMVC.App.getHospitalOid();

			}			
			return model;
		},
		onDetailsOptions:function(itemUtil, params){
			var ret = {
			};
			var items;
			if(params.requestType === Nis.Code.RequestType.create) {
				items = itemUtil.select(['name', 'licenseNumber', 'specialistNumber', 'licenseType', 'email']);
				ret.items = items;
				itemUtil.setReadOnly('licenseNumber', false);
				itemUtil.setReadOnly('licenseType', false);
			}
			else {
				items = itemUtil.select(['oid', 'name', 'licenseNumber', 'specialistNumber', 'licenseType', 'email']);
				itemUtil.setReadOnly('oid', true);
				itemUtil.setReadOnly('licenseNumber', true);
				itemUtil.setReadOnly('licenseType', true);
				ret.items = items;
			}
			return ret;
		},
		requestCreate:function(){
			console.log("requestCreate:");
			var request = this.getModel();
			//var org = NisMVC.App.getOrgInfo();			
			//request.oid = org.oid + 
			//request.setOid();
			var options = {
				success:this.onSuccessCreate.bind(this),
				error:this.onErrorCreate.bind(this),
			};
			this.showProgress({
				title:'생성 처리중..',
				showProgress:true,	
			});
			request.save(options);			
		},		
		requestModify:function(){
			console.log("requestModify:");
			this.onStartRequestModify();
		},
		onStartRequestModify:function(){
			var model = this.getModel();
			var options = {
				success:this.onSuccessRequest.bind(this),
				error:this.onErrorRequest.bind(this),
			};			
			this.showProgress({
				title:'변경 처리중..',
				showProgress:true,	
			});
			model.save(options);
		},
		requestDelete:function(){
			console.log("requestModify:");
			var model = this.getModel();
			var options = {
				success:this.onSuccessRequestDelete.bind(this),
				error:this.onErrorRequestDelete.bind(this),
			};			
			this.showProgress({
				title:'삭제 처리중..',
				showProgress:true,	
			});
			model.destroy(options);
			//model.requestDelete(options);
		},		
	});

})();

