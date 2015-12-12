
(function () {
	'use strict';

	NisMVC.UserMgrLayout = Nis.View.ConfirmBased.extend({
		collection:new Nis.Model.UserRequestList(),
		onInit:function() {
			this.showSearchControl();
			this.showList();
			//this.showDetails();
		},		
		onMakeSearchControl:function() {
			var view = new Nis.View.UserSearchControl({
				collection:this.getCollection(),
			});
			return view;
		},				
		onMakeListOption:function(collection){
			var itemUtil = this.collection.getItemUtil();
			var reqStatusType = Nis.Code.RequestType.create;
			var options = {
				collection:this.getCollection(),
				columns:itemUtil.select(['id', 'loginId', 'userName', 'eMail']),
				hasQuery:true,
				queryParam: {
					requestStatus:Nis.Code.ReqStatus.request,
				},
			};
			return options;
		},		
		onDetailsOptions:function(itemUtil){
			return {
					readOnly:true,
					items:itemUtil.select([
						'userName', 'eMail', 'phoneNumber', 
						'address', 'city', 'province', 'postalCode', 'password'
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
		makeDetailsFooter:function(){
			return Nis.View.ConfirmBased.prototype.makeSubmitButtons.call(this);
		},		
		onTitles:function(type){
			if(type === 'list') {
				return '사용자 요청 목록';
			}
			else if(type === 'detail') {
				return '사용자 상세정보';
			}
		},

	});
})();

