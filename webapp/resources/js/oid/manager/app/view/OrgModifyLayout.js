
(function () {
	'use strict';

	NisMVC.OrgModifyLayout = Nis.View.ConfirmBased.extend({
		collection:new Nis.Model.OrgRequestList(),
		onInit:function() {
			this.showSearchControl();
			this.showList();
			//this.showDetails();
			//this.showApiKeyInput();
			//this.showSubmitButtons();
			//this.setButtonsEnble(false);
		},
		onTitles:function(type){
			if(type === 'list') {
				return '의료기관 목록';
			}
			else if(type === 'detail') {
				return '의료기관 상세 정보';
			}
		},			
		/*	
		getCollection:function(){
			return this.collection;
		},
		*/
		onMakeSearchControl:function() {
			var view = new Nis.View.OrgSearchControl({
				collection:this.getCollection(),
			});
			return view;
		},		
		makeSearchOption:function(selected, dbid){
			var query = _.extend({
				requestType:{op:'<>', value:Nis.Code.RequestType.create},
				requestStatus:Nis.Code.ReqStatus.request,				
			}, selected);
			var options = {
				queryParam:query,
				success:this.onSuccessQuery.bind(this),
				error:this.onErrorQuery.bind(this),
			};
			return options;
		},
		onMakeListOption:function(collection){
			var itemUtil = this.collection.getItemUtil();
			var reqStatusType = Nis.Code.RequestType.create;
			var options = {
				collection:collection,
				columns:itemUtil.select([
					'id',
					'name',
					'requestType',
					'dateCreated',					
					]),
				hasQuery:true,
				queryParam: {
					requestType:{op:'<>', value:reqStatusType},
					requestStatus:Nis.Code.ReqStatus.request,
				},
			};
			return options;
		},
		showSubmitButtons:function(){
			this.right_south.show(this.makeSubmitButtons());
		},
		makeSubmitButtons:function(){
			var buttons = Nis.View.ConfirmBased.prototype.makeSubmitButtons.call(this);
			return this.makeButtonsPanel(buttons);			
		},
		hideSubmitButtons:function(){
			this.right_south.empty();
		},
		onTableItemSelected:function(model) {
			this.showDetailsL({
				model:model, 
				title:this.onTitles('detail', {model:model}),
			});									
			/*
			Nis.View.ConfirmBased.prototype.onTableItemSelected.call(this, model);
			if(this.getApiKeyInput())
				this.getApiKeyInput().setModel(model);
			*/
		},
		onDetailsOptions:function(itemUtil){
			return {
					readOnly:true,
					items:itemUtil.exclude([
						'id',
						'mrDeliveryEmail',
						'electronicServiceUri',
						'requestStatus',
						'requestType',
						'dateCreated',
						'dateVoided',
						'dateModified',
						'userCreated',
						'userVoided',
						'accessTokenValidity',
						'refreshTokenValidity',
					]),
			};
		},
		showDetailsL:function(params){
			//Nis.View.ConfirmBased.prototype.showDetails(this, params);
			this.showDetails(params);
			//this.showApiKeyInput(params);
			this.showSubmitButtons();
			//this.setButtonsEnble(false);			
		},
		hideDetailsL:function(){
			//Nis.View.ConfirmBased.prototype.hideDetails(this, params);
			this.hideDetails();
			//this.hideApiKeyInput();
			this.hideSubmitButtons();
		},
		onFinishDetails:function(){
			this.hideDetailsL();
		},		
		showApiKeyInput:function() {
			this.right_middle.show(this.makeApiKeyInput());
		},
		getApiKeyInput:function() {
			return this.right_middle.currentView.getContents();
		},
		makeApiKeyInput:function() {
			//var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.OrgRequest.columns});
			var util = this.getCollection().getItemUtil();
			var form = new Uic.FormView({items:util.select([
					'accessTokenValidity',
					'refreshTokenValidity',
				])});
			var view = new Uic.PanelLayout({hasHeader:true});
			view.setHeader('토큰정보');
			view.setContents(form);			
			return view;
		},

	});  // end of NisMVC.OrgInfoLayout

})();

