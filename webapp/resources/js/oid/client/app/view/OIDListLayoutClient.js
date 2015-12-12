
(function () {
	'use strict';

	NisMVC.OIDListLayout = Nis.View.RequestBased.extend({
		collection:new Nis.Collection.OID(),
		onInit:function() {
			this.showSearchControl();
			this.showList({
				hasHeader:true,
				hasFooter:true,
			});
		},
		onTitles:function(type, params){
			if(type === 'list') {
				return 'OID 목록';
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
						return 'OID Reject Information';
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
			//var query = _.extend({
				//requestType:{op:'<>', value:Nis.Code.RequestType.create},
				//requestStatus:Nis.Code.ReqStatus.confirmed,				
			//}, selected);
			var options = {
				queryParam:selected,
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
					requestType:{op:'<>', value:Nis.Code.RequestType.delete},
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
			if(! this.isDetailsUpdatable(params)) {
				ret.className = 'panel panel-warning';
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
			}
			return ret;
		},
		isDetailsUpdatable:function(params){
			if(params.requestType ===  Nis.Code.RequestType.create)
				return true;
			if(params.model) {
				if(params.model.attributes.requestStatus === Nis.Code.ReqStatus.request || 
					params.model.attributes.orgOid !== NisMVC.App.getHospitalOid()) {
					return false;
				}				
			}
			return true;
		},
		makeNewModel:function(){
			var model = new Nis.Model.OIDRequest();
			var org = NisMVC.App.getOrgInfo();
			if(org) {
				model.attributes.orgName = org.name;
				model.attributes.orgAddress = org.address;
				model.attributes.orgEmail = org.email;
				model.attributes.orgPhone = org.phoneNumber;
				model.attributes.orgOid = org.oid;
				model.attributes.parentIdentifier = NisMVC.App.getHospitalOid();
				//model.attributes.orgFax = ;

				if(NisMVC.App.userInfo) {
					console.log('makeNewModel:', NisMVC.App.userInfo);
					//model.attributes.authorName = org.name;
					//model.attributes.authorEmail = org.name;
				}
			}
			return model;
		},
		onValidated:function(dbid, value) {
			var model = this.getModel();
			if(dbid === 'arc') {
				model.attributes.identifier = model.attributes.parentIdentifier + '.' + value;
			}
			else if(dbid === 'parentIdentifier') {
				model.attributes.identifier = value + '.' + model.attributes.arc;	
			}
		},	
		requestModify:function(){
			console.log("requestModify:");
			var model = this.getModel();
			var request = new Nis.Model.OIDRequest();
			request.attributes = _.extend(
			    request.attributes, model.attributes);	
			request.attributes.createdId = model.id;
			//if(! _.isUndefined(request.attributes.taskId)){
			//	delete request.attributes.taskId;
			//}

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
		requestDelete:function(){
			console.log("requestModify:");
			var model = this.getModel();
			var request = new Nis.Model.OIDRequest();
			request.attributes = _.extend(
			    request.attributes, model.attributes);	
			request.attributes.createdId = model.id;
			//if(! _.isUndefined(request.attributes.taskId)){
			//	delete request.attributes.taskId;
			//}
			var options = {
				success:this.onSuccessRequest.bind(this),
				error:this.onErrorRequest.bind(this),
			};
			request.requestDelete(options);			
		},

	}); // end of NisMVC.OIDLayout


})();

