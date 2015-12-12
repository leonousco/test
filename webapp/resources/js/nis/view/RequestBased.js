
(function () {
	'use strict';

	Nis.View.RequestBased = Nis.View.SearchTopLayout.extend({		
		makeListFooter:function(params){
			if(params.hasFooter) {
				var buttons = this.makeButtons(
					{buttonId:['add']},
					this.onClickButtonList);
				return buttons;				
			}
		},		
		makeDetailsFooter:function(params){
			if(! this.isDetailsUpdatable(params))
				return null;
			var buttonId = this.getDetailButtons(params);
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onClickButtonDetails);
			//buttons.setEnable(false);
			return buttons;			
		},		
		getDetailButtons:function(params){
			var buttonId = [];
			if(params.requestType === Nis.Code.RequestType.create) {
				buttonId.push('submit');
				buttonId.push('cancel');				
			}
			else {
				if(params.model && params.model.attributes.requestStatus === Nis.Code.ReqStatus.request) {
					return null;
				}
				buttonId.push('modify');
				buttonId.push('delete');				
			}
			return buttonId;
		},
		makeNewModel:function(){
			return null;
		},
		onClickButtonList:function(param) {
			//console.log('onClickButtonList:', param);
			if(param === 'add') {				
				var requestType = Nis.Code.RequestType.create;
				this.showDetails({
					requestType:requestType,
					model:this.makeNewModel(), 
					title:this.onTitles('detail', {requestType:requestType}),
				});
			}
		},
		onDetailsPanelOptions:function(param){
			return {
				className:'panel panel-success',
				hasHeader:true,
				hasFooter:true,
			};
		},		
		modelChanged: function(model, collection) {
			console.log("modelChanged:", collection, ", model:", model);
			//collection.remove(model);
		},
		onTableItemSelected:function(model) {
			var requestType = Nis.Code.RequestType.modify;
			//var requestStatus = model.attributes.requestStatus;
			this.showDetails({
				requestType:requestType,
				model:model, 
				title:this.onTitles('detail', {requestType:requestType, model:model}),
			});			
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
					if(model.requestType === Nis.Code.RequestType.create) {
						this.requestCreate();
					}
					else {
						this.requestModify();					
					}			
					break;
				}
				case 'delete': {
					this.requestDelete();
						break;
				}
			}
		},
		requestCreate:function(){
			console.log("requestCreate:");
			var request = this.getModel();
			//request.attributes.requestStatus = Nis.Code.ReqStatus.request;
			//request.attributes.requestType = Nis.Code.RequestType.create
			
			if(! _.isUndefined(request.attributes.taskId)){
				delete request.attributes.taskId;
			}
			var options = {
				success:this.onSuccessCreate.bind(this),
				error:this.onErrorCreate.bind(this),
			};
			this.showProgress({
				title:'Requesting Create ...',
				showProgress:true,	
			});
			request.requestCreate(options);			
		},
		requestModify:function(){
			console.log("requestModify:");
		},
		requestDelete:function(){
			console.log("requestDelete:");
		},
		onSuccessRequest:function(model, response, options){
			console.log("onSuccessRequest:", model);
			this.hideDetails();
			this.hideProgress();
			//this.getCollection.add(model);
		},
		onErrorRequest:function(model, response, options){
			console.log("onErrorRequest:", model);
			this.showProgress({
				title:'Fail to Request ...',
				showProgress:false,	
				buttons:this.makeDlgOkButtons(),
			});
		},
		onSuccessRequestDelete:function(model, response, options){
			console.log("onSuccessRequestDelete:", model);
			this.getCollection().remove(model);
			this.hideDetails();
			this.hideProgress();
		},
		onErrorRequestDelete:function(model, response, options){
			console.log("onErrorRequestDelete:", model);			
			this.showProgress({
				title:'Fail to Request ...',
				showProgress:false,	
				buttons:this.makeDlgOkButtons(),
			});
		},
		onSuccessCreate:function(model, response, options){
			console.log("onSuccessCreate:", model);
			this.hideDetails();
			this.getCollection().add(model);
			this.hideProgress();
		},
		onErrorCreate:function(model, response, options){
			console.log("onErrorCreate:", model);
			this.showProgress({
				title:'Fail to Create ...',
				showProgress:false,	
				buttons:this.makeDlgOkButtons(),
			});
		},
		setButtonsEnble:function(enable) {
			this.setButtonEnble('confirm', enable);
			this.setButtonEnble('reject', enable);
		},
		makeButtonsPanel:function(buttons){
			var panelLayout = new Uic.PanelLayout();
			panelLayout.setContents(buttons);			
			return panelLayout;
		},

	});  // end of NisMVC.OrgInfoLayout

})();

