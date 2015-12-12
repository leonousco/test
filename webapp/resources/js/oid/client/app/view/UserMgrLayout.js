
(function () {
	'use strict';

	NisMVC.UserMgrLayout = Nis.View.RequestBased.extend({
		model:null,
		collection:new Nis.Model.UserRequestList(),
		onInit:function() {
			this.showList({
				hasHeader:true, 
				hasFooter:true,
			});
		},
		onTitles:function(type, params){
			if(type === 'list') {
				return 'User 목록';
			}
			else if(type === 'detail') {
				if(params.requestType === Nis.Code.RequestType.create) {
					return 'User Registration';					
				}				
				return 'User 상세 정보';
			}
		},		
		onMakeListOption:function(collection){
			var itemUtil = this.collection.getItemUtil();
			var options = {
				collection:collection,
				columns:itemUtil.select(
					['id', 'loginId', 'userName', 'eMail']
					),
				hasQuery:true,
				queryParam: {
					nidsClient:NisMVC.App.getHospitalOid(),
					//userType:Nis.Code.RoleName.nidsUser,
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
		onDetailsOptions:function(itemUtil, params){
			var ret = {
			};
			var items;
			if(params.requestType === Nis.Code.RequestType.create) {
				items = itemUtil.select(['loginId', 'userName', 'eMail', 'phoneNumber', 'address', 'city', 'province', 'postalCode', 'password'])
				ret.items = items;
			}
			else {
				items = itemUtil.select(['userName', 'eMail', 'phoneNumber', 'address', 'city', 'province', 'postalCode', 'password']);
				ret.items = items;
				if(params.model && params.model.attributes.requestStatus === Nis.Code.ReqStatus.request) {
					ret.readOnly = true;
				}
			}
			return ret;
		},
		makeNewModel:function(){
			var model = new Nis.Model.UserRequest();
			model.attributes.oid = NisMVC.App.getHospitalOid();
			model.attributes.userType = Nis.Code.RoleName.nidsUser;
			return model;
		},		
		isDetailsUpdatable:function(params){
			if(params.requestType ===  Nis.Code.RequestType.create)
				return true;
			if(params.model) {
				if(params.model.attributes.requestStatus === Nis.Code.ReqStatus.request || 
					params.model.attributes.oid !== NisMVC.App.getHospitalOid()) {
					return false;
				}				
			}
			return true;
		},
		requestModify:function(){
			console.log("requestModify:");
			var model = this.getModel();
			var request = new Nis.Model.UserRequest();
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
			console.log("requestDelete:");
			var model = this.getModel();
			var request = new Nis.Model.UserRequest();
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
		onAddressSearched:function(data){
			console.log('onAddressSearched:', data);
			var mData = {
				address:data.address,
				city:data.city,
				province:data.province,
				postalCode:data.postalCode,				
			};
			console.log('onAddressSearched:', mData);
			/*
			this.getDetails().getInput('address').setValue(data.address);
			this.getDetails().getInput('city').setValue(data.city);
			this.getDetails().getInput('province').setValue(data.province);
			*/
			this.getModel().set(mData);
		},		
		onErrorCreate:function(model, response, options){
			console.log('onSuccessCreate:', model, response, options);
		},
	});
})();

