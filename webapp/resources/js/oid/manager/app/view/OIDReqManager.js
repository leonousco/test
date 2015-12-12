
(function () {
	'use strict';

	NisMVC.OIDReqManager = Nis.View.ConfirmBased.extend({
		collection:new Nis.Collection.OIDRequest(),
		onInit:function() {
			this.showSearchControl();
			this.showList();
			//this.showDetails();
			//this.showSubmitButtons();
			//this.setButtonsEnble(false);
		},		
		onTitles:function(type){
			if(type === 'list') {
				return 'OID 목록';
			}
			else if(type === 'detail') {
				return 'OID 상세 정보';
			}
		},		
		onMakeSearchControl:function() {
			var view = new Nis.View.OIDSearchControl({
				collection:this.getCollection(),
			});
			return view;
		},		
		makeSearchOption:function(selected, dbid){
			console.log('onChangeSearch:', selected, dbid);
			var query = _.extend({
				//requestType:{op:'<>', value:Nis.Code.RequestType.create},
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
					'identifier',
					'orgName',					
					'requestType',					
					]),
				hasQuery:true,
				queryParam: {
					//requestType:{op:'<>', value:reqStatusType},
					requestStatus:Nis.Code.ReqStatus.request,
				},
			};
			return options;
		},		
		/*
		showSubmitButtons:function(){
			this.right_south.show(this.makeSubmitButtons());			
		},
		makeSubmitButtons:function(){
			var buttons = Nis.View.ConfirmBased.prototype.makeSubmitButtons.call(this);
			return this.makeButtonsPanel(buttons);
		},
		*/
		onDetailsOptions:function(itemUtil){
			return {
					readOnly:true,
					items:itemUtil.exclude([
						'id',
						'userReviewer',
						'requestStatus',
						'requestType',
						'dateCreated',
						'dateVoided',
						'dateModified',
						'userCreated',
						'userVoided',
					]),
			};
		},
		onDetailsPanelOptions:function(){
			return {
				className:'panel panel-success',
				hasHeader:true,
				hasFooter:true,
			};
		},
		makeDetailsFooter:function(params){
			//if(! this.isDetailsUpdatable(params))
			//	return null;
			var buttonId = this.getDetailButtons(params);
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onClickButtonDetails);
			//buttons.setEnable(false);
			return buttons;			
		},		
		getDetailButtons:function(params){
			var buttonId = ['confirm', 'reject'];
			return buttonId;
		},


	});  // end of NisMVC.OrgInfoLayout

})();

