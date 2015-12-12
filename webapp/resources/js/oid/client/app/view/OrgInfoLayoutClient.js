
(function () {
	'use strict';

	NisMVC.OrgInfoLayout = Uic.LayoutView.extend({
		tagName:'div',
		className:'col-sm-12',
		id:'page_contents',
		regions: {
		    north: '#north',
		    south: '#south',
		    button: '#button',
		},                
		initialize: function(options) {
			console.log('initialize:', options);
			Uic.LayoutView.prototype.initialize.call(this, options);
			if(options.type === 'register') {
				this.showOrgInfo();
				this.showUserInfo();
				var buttonId = ['requestCreate']; //, requestRemove'];
				var buttons = this.makeButtons(
					{buttonId:buttonId},
					this.onButtonClick);
				this.button.show(buttons);
			}	
			else {
				var queryOptions = {
					oid:NisMVC.App.getHospitalOid(),
					success:this.onSuccessOrganization.bind(this),
					error:this.onErrorOrganization.bind(this),
				};
				var collection = new Nis.Model.OrganizationList();
				collection.getByOid(queryOptions);					
			}
		},
		onSuccessOrganization:function(resp) {
			console.log("onSuccessOrganization:", resp);
			
			this.showOrgInfo(resp[0]);
			var model = new Nis.Model.UserRequest();
			var options = {
				userId:NisMVC.App.getUserId(),
				success:this.onSuccessUserInfo.bind(this),
				error:this.onErrorUserInfo.bind(this),
			};
			//model.getUserInfo(options);

		},
		onErrorOrganization:function(resp) {
			console.log("onErrorOrganization:", resp);
		},
		onSuccessUserInfo:function(resp){
			console.log("onSuccessUserInfo:", resp);
			var userInfo = resp;
			if(resp.body)
				userInfo = resp.body;
			var model = new Nis.Model.UserRequest(userInfo);
			//this.showUserInfo(model);
			
			var buttonId = ['requestRemove'];
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onButtonClick);

			this.button.show(buttons);
		},
		onErrorUserInfo:function(resp){
			console.log("onErrorUserInfo:", resp);
		},
		showOrgInfo:function(options) {
			console.log('showOrgInfo:');
			var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.OrganizationColumns});
			var formItems = util.select(['name', 'email', 'phoneNumber', 'address', 'locationCode', 'classCode', 'serialNumber']);
			var form = new Uic.FormView({items:formItems});
			var validate = {
				name:util.makeValidateRule('name'),
				email:util.makeValidateRule('email'),
				phoneNumber:util.makeValidateRule('phoneNumber'),				
			};
			form.setValidate(validate);
			if(options) {
				//form.setModelAttrs(options);
				form.setModel(new Nis.Model.OrgRequest(options));
			}
			else {
				form.setModel(new Nis.Model.OrgRequest());
			}			
			form.on('onValidated', this.onValidatedOrg.bind(this));
			var view = new Uic.PanelLayout({hasHeader:true});
			if(this.options.type !== 'register') {
				view = new Uic.PanelLayout({hasHeader:true, hasFooter:true});
			}
			view.setTitle("의료기관");
			view.setContents(form);
			if(this.options.type !== 'register') {
				var buttonId = ['requestModify', 'requestRemove'];
				var buttons = this.makeButtons(
					{buttonId:buttonId},
					this.onClickModifyOrg);
				view.setFooter(buttons);
			}
			this.north.show(view);
		},
		getOrgForm:function(){
			return this.north.currentView.getContents();
		},
		onValidatedOrg:function(key, value) {
			if(key === 'name') {
				var rlist = new Nis.Model.OrganizationList();
				rlist.query({
					queryParam:{
						name:value,
					},
					success:this.onSuccessExistedOrgReq.bind(this),
					error:this.onErrorExistedOrgReq.bind(this),
				});
			}
			else if(key === 'name') {

			}
		},
		onSuccessExistedOrgReq:function(resp){
			console.log('onSuccessExistedOrgReq:',resp);
			if(resp.length > 0) {
				this.getOrgForm().setValidatedUi(false, 'name', 'already existed Organization !!!');
			}
			else {
				this.getOrgForm().setValidatedUi(true, 'name');								
			}
		},
		onErrorExistedOrgReq:function(resp){
			console.log('onSuccessExistedOrgReq:',resp);
		},
		getUserForm:function(){
			return this.south.currentView.getContents();
		},		
		showUserInfo:function(model) {
			console.log('showUserInfo:');
			var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.UserRequest.columns});			
			var form = new Uic.FormView({
				items:util.exclude(
					['id','city', 'province', 'dateCreated', 
					'dateVoided', 'dateModified', 'userCreated', 
					'userVoided', 'requestType', 'requestStatus'
					]
				)
			});
			form.on('onValidated', this.onValidatedUser.bind(this));
			if(model) {
				form.setModel(model);
			}
			else {
				form.setModel(new Nis.Model.UserRequest());				
			}			
			form.getModel().attributes.userType = Nis.Code.RoleName.nidsOrgManager;
			var view = new Uic.PanelLayout({hasHeader:true});
			if(this.options.type !== 'register') {
				view = new Uic.PanelLayout({hasHeader:true, hasFooter:true});
			}			
			view.setTitle("사용자");
			view.setContents(form);
			if(this.options.type !== 'register') {
				var buttonId = ['requestModify'];
				var buttons = this.makeButtons(
					{buttonId:buttonId},
					this.onClickModifyPerson);
				view.setFooter(buttons);
			}
			//var view = new Uic.Form(NisMVC.uiStore.userFormUi);
			//view.setModel(new Nis.Model.UserRequest());
			this.south.show(view);
		},
		onValidatedUser:function(dbid, value){
			if(dbid === 'loginId') {
				var options = {
					userId:value,
					success:this.onSuccessCheckUserId.bind(this),
					error:this.onErrorCheckUserId.bind(this),
				}
				this.getUserForm().getModel().checkUserId(options);
			}
		},
		onSuccessCheckUserId:function(resp) {
			console.log("onSuccessCheckUserId:", resp);
			if(resp.statusCode === 200) {
				this.getUserForm().setValidatedUi(false, 'loginId', 'already existed User ID !!!');
			}
			else {
				this.getUserForm().setValidatedUi(true, 'loginId', '');				
			}
		},
		onErrorCheckUserId:function(resp) {
			console.log("onErrorCheckUserId:", resp);
		},
		onClickModifyOrg:function(text, options) {
			if(text === 'requestRemove') {
				this.requestRemove();
			}
			else if(text === 'requestModify') {
				this.requestModify();
			}			
		},
		requestRemove:function(){
			console.log("requestRemove:");
			var buttonId = ['ok', 'cancel'];
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onDlgClickRequestRemove);

			this.showProgress({
				title:'의료기관 변경',
				contents:'요청 완료 !',
				buttons:buttons,
			});
		},
		onDlgClickRequestRemove:function(param){
			if(param === 'ok') {
				var model = this.getOrgForm().getModel();
				var request = new Nis.Model.OrgRequest();
				request.attributes = _.extend(
				    request.attributes, model.attributes);	
				request.attributes.createdId = model.id;
				var options = {
					success:this.onSuccessRemove.bind(this),
					error:this.onErrorRemove.bind(this),
				};			
				this.showProgress({
					title:'삭제 요청중...',
					showProgress:true,	
				});
				request.requestDelete(options);
			}
			else {
				this.hideProgress();
			}

		},
		onSuccessRemove:function(resp) {
			console.log("onSuccessRemove:");
			this.showProgress({
				title:'의료기관 삭제',
				contents:'요청 완료 !',
				buttons:this.makeDlgOkButtons(),
			});			
		},
		onErrorRemove:function(resp) {
			console.log("onErrorRemove:");
		},

		requestModify:function(){
			console.log("requestModify:");
			var buttonId = ['ok', 'cancel'];
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onDlgClickRequestModify);

			this.showProgress({
				title:'의료기관 변경',
				contents:'요청 완료 !',
				buttons:buttons,
			});			
		},
		onDlgClickRequestModify:function(param){
			if(param === 'ok') {
				var model = this.getOrgForm().getModel();
				var request = new Nis.Model.OrgRequest();
				request.attributes = _.extend(
				    request.attributes, model.attributes);	
				request.attributes.createdId = model.id;
				var options = {
					success:this.onSuccessModify.bind(this),
					error:this.onErrorModify.bind(this),
				};			
				this.showProgress({
					title:'변경 요청중...',
					showProgress:true,	
				});
				request.requestModify(options);				
			}
			else {
				this.hideProgress();
			}
		},
		onSuccessModify:function(resp) {
			console.log("onSuccessModify:");
			this.showProgress({
				title:'의료기관 변경',
				contents:'요청 완료 !',
				buttons:this.makeDlgOkButtons(),
			});			
		},
		onErrorModify:function(resp) {
			console.log("onErrorModify:");
		},
		onClickModifyPerson:function(text, options) {
			console.log("onClickModifyPerson: ", text, options);
		},
		onButtonClick:function(text, options) {
			console.log("onButtonClick: ", text, options);
			var form = this.north.currentView.getContents();				
			if(text === 'requestCreate') {
				this.startSave(form.model);
			}
			else if(text === 'requestModify') {
				form.model.attributes.requestType = Nis.Code.RequestType.modify;
				this.startSave(form.model);
			}
			else if(text === 'requestRemove') {
				form.model.attributes.requestType = Nis.Code.RequestType.delete;
				this.startSave(form.model);
			}			
		},													
		startSave:function(model) {
			console.log("startSave: ");
			model.checkSerialNumber(null,
				(function(result) {
					if(result.length == 0) {
						this.showSaveConfirm(model);
					}
					else {
						//[20151111 leo #9864] TODO show dlg for already existed request
						console.log('startSave: ', result.length);
					}
				}).bind(this),
				(function() {
					//[20151111 leo #9864] TODO show dlg
					console.log('startSave:fail:');
					this.showProgress({
						title:'Organization Registeration Fail',
						contents:'Already existed serial number !',
						buttons:this.makeDlgOkButtons(),
					});			

				}).bind(this)
			);
		},
		onSuccessCheckSerialNumber:function(result){
		},
		onFailCheckSerialNumber:function(result){
		},
		showSaveConfirm: function(model) {
			var buttonId = ['ok', 'cancel'];
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onButtonClickSaveConfirm);

			this.showProgress({
				title:'의료기관 생성 요청',
				contents:'요청 하시겠습니까?',
				buttons:buttons,
				target:model,
				//showProgress:true,	
			});			
			/*
			var modal = new Backbone.BootstrapModal({
				title:'요청 하시겠습니까?',
				content:'요청중 발생하는 문제에 대해서 모든 책임은 본인이 부담하게 됩니다.',
			});
			modal.model = model;
			modal.parentView = this;
			modal.open((function(args) {
				console.log("showTestModal: on modal button clicked, args:", args, ", parentView:", this);
				model.requestCreate(this.onSuccessCreateOrg.bind(this), this.onFailCreateOrg.bind(this));
				//this.parentView.trigger("closeView", this.parentView);
			}).bind(this));
			*/
		},
		onButtonClickSaveConfirm:function(param){
			if(param === 'ok') {
				this.showProgress({
					title:'의료기관 생성 요청',
					hasFooter:false,
					showProgress:true,
				});
				var model = this.getProgressTarget();
				var options = {
					success:	this.onSuccessCreateOrg.bind(this), 
					error:this.onFailCreateOrg.bind(this)	,
				}
				//model.requestCreate(this.onSuccessCreateOrg.bind(this), this.onFailCreateOrg.bind(this));
				model.requestCreate(options);
			}
			else {
				this.hideProgress();
			}
		},
		onSuccessCreateOrg:function(orgModel, response) {
			console.log('onSuccessCreateOrg: ');
			var userView = this.south.currentView.getContents();
			userView.model.set({referenceId:orgModel.get('id')});
				var options = {
					success:	this.onSuccessCreateUser.bind(this), 
					error:this.onFailCreateUser.bind(this)	,
				}
			userView.model.requestCreate(options);
		},
		onFailCreateOrg:function(orgModel, response) {
			console.log('onFailCreateOrg: ', response.state(), ' ', response.status);
			this.showProgress({
				title:'Organization Registeration Fail',
				contents:'Fail to register Organization !',
				buttons:this.makeDlgOkButtons(),
			});			
		},
		onSuccessCreateUser:function(userModel, response) {
			console.log('onSuccessCreateUser: ');
			this.showProgress({
				title:'Organization Registeration',
				contents:'Complete to register Orgnization !',
				buttons:this.makeDlgOkButtons(),
			});			
			this.trigger("closeView", this);
		},
		onFailCreateUser:function(userModel, response) {
			console.log('onFailCreateUser: ', response.state(), ' ', response.status);
			this.showProgress({
				title:'Organization Creation Fail',
				contents:'Fail to register User !',
				buttons:this.makeDlgOkButtons(),
			});			
		},
		getDefaultTemplate:function(options) {
			var ret =
			    '<div id="north" class="row-sm-6"></div>'
			    +'<div id="south" class="row-sm-6"></div>'
			    +'<div id="button" class="row-sm-6"></div>'
			    ;
			return ret;
		},		
	}); // end of NisMVC.OrgInfoLayout

	_.extend(NisMVC.OrgInfoLayout.prototype, Nis.View.HasProgress);

})();

