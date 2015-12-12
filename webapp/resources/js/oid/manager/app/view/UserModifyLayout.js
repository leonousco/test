
(function () {
	'use strict';

	NisMVC.UserModifyLayout = Nis.View.ConfirmBased.extend({
		collection:new Nis.Model.UserRequestList(),
		onInit:function() {
			this.showSearchControl();
			this.showList();
			this.showDetails();
			this.setButtonsEnble(false);
		},		
		getCollection:function(){
			return this.collection;
		},
		onMakeSearchControl:function() {
			var view = new Nis.View.UserSearchControl({
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
					'userName',
					'loginId',					
					'requestType',					
					]),
				hasQuery:true,
				queryParam: {
					requestType:{op:'<>', value:reqStatusType},
					requestStatus:Nis.Code.ReqStatus.request,
				},
			};
			return options;
		},
		onDetailsOptions:function(itemUtil){
			return {
					readOnly:true,
					items:itemUtil.exclude([
						'phoneNumber',
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
			return {hasHeader:true, hasFooter:true};
		},
		makeDetailsFooter:function(){
			return Nis.View.ConfirmBased.prototype.makeSubmitButtons.call(this);
		},		
		onTitles:function(type){
			if(type === 'list') {
				return '사용자 목록';
			}
			else if(type === 'detail') {
				return '사용자 상세 정보';
			}
		},
	});  // end of NisMVC.OrgInfoLayout

})();

