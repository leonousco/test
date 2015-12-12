(function () {
	'use strict';

	NisMVC.OrgInfoLayout = Nis.View.ConfirmBased.extend({
		collection:new Nis.Model.OrgRequestList(),
		onInit:function() {
			this.showSearchControl();
			this.showList();
			//this.showDetails();
			//this.showApiKeyInput();
			//this.showDetailsUser();
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
				requestType:Nis.Code.RequestType.create,
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
			var options = {
				collection:collection,
				columns:itemUtil.select([
					'id',
					'name',
					'dateCreated',					
					]),
				hasQuery:true,
				queryParam: {
					requestType:Nis.Code.RequestType.create,
					requestStatus:Nis.Code.ReqStatus.request,
				},
			};
			return options;
		},
		onTableItemSelected:function(model) {
			this.showDetailsL({
				model:model, 
				title:this.onTitles('detail', {model:model}),
			});						
		},
		showDetailsL:function(params){
			//Nis.View.ConfirmBased.prototype.showDetails(this, params);
			this.showDetails(params);
			//this.showApiKeyInput(params);
			this.showDetailsUser(params);
			this.showSubmitButtons();
			//this.setButtonsEnble(false);			
		},
		hideDetailsL:function(){
			//Nis.View.ConfirmBased.prototype.hideDetails(this, params);
			this.hideDetails();
			this.hideApiKeyInput();
			this.hideDetailsUser();
			this.hideSubmitButtons();
		},
		onFinishDetails:function(){
			this.hideDetailsL();
		},
		loadUserInfo:function(orgId, userRequestId) {
			console.log("loadUserInfo:", orgId, userRequestId);
			var userForm = this.getDetailsUser();
			var userModel = new Nis.Model.UserRequest();
			userModel.set({id:userRequestId});
			userForm.setModel(userModel);
			userForm.getModel().fetch();
		},
		onSuccessLoadUser:function() {
			this.getDetailsUser().setModel(userModel);
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
		onDetailsPanelOptions:function(){
			return {hasHeader:true};
		},
		showApiKeyInput:function(params) {
			this.right_middle.show(this.makeApiKeyInput());
			this.getApiKeyInput().setModel(params.model);
		},
		getApiKeyInput:function() {
			return this.right_middle.currentView.getContents();
		},
		hideApiKeyInput:function() {
			this.right_middle.empty();			
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
		showDetailsUser:function(params) {
			this.right_south.show(this.makeDetailsUser());
			this.loadUserInfo(params.model.get('id'), params.model.get('userRequestId'));
		},
		getDetailsUser:function() {
			return this.right_south.currentView.getContents();
		},		
		hideDetailsUser:function() {
			this.right_south.empty();
		},
		makeDetailsUser:function() {
			var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.UserRequest.columns});
			var form = new Uic.FormView(
				{
					readOnly:true,
					items:util.exclude([
						'id',
						'city',
						'province',
						'dateVoided',
						'dateModified',
						'userCreated',
						'userVoided',
					]),
				});
			var view = new Uic.PanelLayout({hasHeader:true});
			view.setHeader('사용자 상세 정보');
			view.setContents(form);			
			return view;
		},
		makeSubmitButtons:function(){
			var buttons = Nis.View.ConfirmBased.prototype.makeSubmitButtons.call(this);
			return this.makeButtonsPanel(buttons);
		},

	});  // end of NisMVC.OrgInfoLayout

})();

