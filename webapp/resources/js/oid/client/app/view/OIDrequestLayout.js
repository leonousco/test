
(function () {
	'use strict';

	NisMVC.OIDrequestLayout = Nis.View.RequestBased.extend({
		collection:new Nis.Collection.OIDRequest(),
		onInit:function() {
			this.showSearchControl();
			this.showList({
				hasHeader:true,
				//hasFooter:true,
			});
		},
		onTitles:function(type, params){
			if(type === 'list') {
				return 'OID 요청 중인 목록';
			}
			else if(type === 'detail') {
				if(params.requestType === Nis.Code.RequestType.create) {
					return 'OID 생성';					
				}
				else {
					if(params.model.attributes.requestStatus === Nis.Code.ReqStatus.request) {
						return 'OID 요청 정보';
					}
					else if(params.model.attributes.requestStatus === Nis.Code.ReqStatus.reject) {
						return 'OID Reject 정보';
					}
					else {
						return 'OID 변경/삭제';					
					}
				}
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
			var options = {
				collection:collection,
				columns:itemUtil.select(
					['id', 'requestStatus', 'orgName', 'identifier', 'requestType']
				),
				hasQuery:true,
				queryParam: {
					//requestStatus:Nis.Code.ReqStatus.request,
					requestStatus:{op:'<>', value:Nis.Code.ReqStatus.confirmed},
				},
			};
			return options;
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
			else {
				if(params.model.attributes.requestStatus === Nis.Code.ReqStatus.request) {
					ret.className = 'panel panel-warning';
				}
				else if(params.model.attributes.requestStatus === Nis.Code.ReqStatus.reject) {
					ret.className = 'panel panel-danger';
				}
			}
			return ret;
		},				
		makeDetailsValiate:function(util, params){
			var validate = util.makeValidateRules([
				'arc','parentIdentifier','orgName'
				]);
			return validate;
		},		
		onDetailsOptions:function(itemUtil, params){
			var ret = {
			};
			var items;
			if(params.requestType === Nis.Code.RequestType.create) {
				items = itemUtil.exclude([
					'id',
					'identifier',
					'country',
					'requestType',
					'requestStatus',
					'memo',
					'userReviewer',
					'authorUserid',				
				]);				
				itemUtil.setReadOnly('arc', false);
				itemUtil.setReadOnly('parentIdentifier', false);
				itemUtil.setReadOnly('orgName', true);
				ret.items = items;
			}
			else if(params.model.attributes.requestStatus === Nis.Code.ReqStatus.reject) {
				items = itemUtil.exclude([
					'id',
					'country',
					'requestType',
					'requestStatus',
					'userReviewer',
					'authorUserid',				
				]);				
				itemUtil.setReadOnly('identifier', true);
				itemUtil.setReadOnly('arc', true);
				itemUtil.setReadOnly('parentIdentifier', true);
				itemUtil.setReadOnly('orgName', true);
				itemUtil.setReadOnly('memo', true);
				ret.items = items;
			}			
			else {
				items = itemUtil.exclude([
					'id',
					//'identifier',
					'country',
					'requestType',
					'requestStatus',
					'memo',
					'userReviewer',
					'authorUserid',				
				]);				
				itemUtil.setReadOnly('identifier', true);
				itemUtil.setReadOnly('arc', true);
				itemUtil.setReadOnly('parentIdentifier', true);
				itemUtil.setReadOnly('orgName', true);
				ret.items = items;
				if(params.model && params.model.attributes.requestStatus === Nis.Code.ReqStatus.request) {
					ret.readOnly = true;
				}
			}
			return ret;
		},
		makeNewModel:function(){
			var model = new Nis.Model.OIDRequest();
			var org = NisMVC.App.getOrgInfo();
			if(org) {
				model.attributes.orgName = org.name;
				model.attributes.orgAddress = org.address;
				model.attributes.orgEmail = org.email;
				model.attributes.orgPhone = org.phoneNumber;
				//model.attributes.orgFax = ;

				if(NisMVC.App.userInfo) {
					console.log('makeNewModel:', NisMVC.App.userInfo);
					//model.attributes.authorName = org.name;
					//model.attributes.authorEmail = org.name;
				}
			}
			return model;
		},		
		onClickButtonDetails:function(param, value, view) {
			console.log('onClickButtonDetail:', param);
			var model = this.getModel();
			switch(param) {
				case 'cancel': {
					this.hideDetails();
					break;
				}
				case 'submit': {
					this.requestCreate(model);
					//model.save(model.attributes, {success:this.onSuccessCreate.bind(this), error:this.onErrorCreate.bind(this)});
					break;
				}
				case 'modify': {
					if(model.attributes.requestType === Nis.Code.RequestType.create) {
						this.requestCreate();
					}
					if(model.attributes.requestType === Nis.Code.RequestType.delete) {
						this.requestDelete();
					}
					else {
						this.requestModify();					
					}			
					break;
				}
				case 'delete': {
					this.deleteRequest();
						break;
				}
			}
		},		
		requestModify:function(){
			console.log("requestModify:");
			var request = this.getModel();
			if(! _.isUndefined(request.attributes.taskId)){
				delete request.attributes.taskId;
			}
			//request.attributes.requestStatus = Nis.Code.ReqStatus.request;
			var options = {
				success:this.onSuccessRequest.bind(this),
				error:this.onErrorRequest.bind(this),
			};			
			this.showProgress({
				title:'변경 요청중...',
				showProgress:true,	
			});
			request.requestModify(options);
		},
		deleteRequest:function(){
			console.log("requestDelete:");
			var request = this.getModel();
			//request.attributes.requestStatus = Nis.Code.ReqStatus.request;
			//request.attributes.requestType = Nis.Code.RequestType.create

			if(! _.isUndefined(request.attributes.taskId)){
				delete request.attributes.taskId;
			}
			var options = {
				success:this.onSuccessRequestDelete.bind(this),
				error:this.onErrorRequestDelete.bind(this),
			};
			this.showProgress({
				title:'삭제 요청중...',
				showProgress:true,	
			});
			//request.requestDelete(options);
			request.destroy(options);
		},
		requestDelete:function(){
			console.log("requestDelete:");
			var request = this.getModel();
			//request.attributes.requestStatus = Nis.Code.ReqStatus.request;
			//request.attributes.requestType = Nis.Code.RequestType.create

			if(! _.isUndefined(request.attributes.taskId)){
				delete request.attributes.taskId;
			}
			var options = {
				success:this.onSuccessRequestDelete.bind(this),
				error:this.onErrorRequestDelete.bind(this),
			};
			this.showProgress({
				title:'삭제 요청중...',
				showProgress:true,	
			});
			request.requestDelete(options);
			//request.destroy(options);
		},
		onSuccessRequestDelete:function(model, response, options){
			console.log("onSuccessRequest:", model);
			this.hideDetails();
			this.hideProgress();
			this.getCollection.remove(model);
		},

	}); // end of NisMVC.OIDLayout


})();

