
(function () {
	'use strict';

	Nis.View.ConfirmBased = Nis.View.SearchTopLayout.extend({

		makeSubmitButtons:function(){
			var buttonId = ['confirm', 'reject'];
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onClickButton);
			buttons.setEnable(false);
			return buttons;
		},
		onClickButton:function(param) {
			console.log('onClickButton:', param);
			if(param === 'confirm') {
				this.confirmRequest();
			}
			else if(param === 'reject') {
				this.showRejectMemo();
			}
		},
		onClickButtonDetails:function(param, value, view) {
			console.log('onClickButtonDetail:', param);
			var model = this.getModel();
			if(param === 'confirm') {
				this.confirmRequest();
			}
			else if(param === 'reject') {
				this.showRejectMemo();
			}
		},
		modelChanged: function(model, collection) {
			console.log("modelChanged:", collection, ", model:", model);
			//collection.remove(model);
		},
		onTableItemSelected:function(model) {
			this.showDetails({
				model:model,
				title:this.onTitles('detail', {model:model}),
			});
		},
		showRejectMemo:function(){
			var buttonId = ['ok', 'cancel'];
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				this.onRejectMemo);

			var contents = new Uic.Textarea();
			contents.$el.addClass("form-control");
			this.showProgress({
				title:'거절 사유를 입력하시면 E-Mail로 전송됩니다.',
				showProgress:false,
				contents:contents,
				buttons:buttons,
			});
		},
		onRejectMemo:function(param) {
			if(param === 'cancel') {
				this.hideProgress();
				return;
			}
			var memo = this.getProgress().getContent().getControlValue();
			var model = this.getModel();
			this.showProgress({
				title:'거절 중..',
				hasFooter:false,
				showProgress:true,
			});

			console.log("onRejectMemo: ", model, memo);
			var options = {
				success:this.onSuccessReject.bind(this),
				error:this.onErrorReject.bind(this),
			};

			model.rejectRequest(memo, options);
		},
		confirmRequest:function() {
			var model = this.getModel();
			var options = {
				success:this.onSuccessConfirm.bind(this),
				error:this.onErrorConfirm.bind(this),
			};
			this.showProgress({
				title:'승인 중...',
				hasFooter:false,
				showProgress:true,
			});
	    		model.confirmRequest(options);
		},
		onSuccessReject:function(model, response){
			console.log("onSuccessReject: ", model, response);
			this.getCollection().remove(model);
			this.hideProgress();
			this.onFinishDetails();
		},
		onErrorReject:function(model, response){
			console.log("onErrorReject: ", model, response);
			this.showProgress({
				title:'거절 실패',
				contents:'다시 시도 하세요!',
				buttons:this.makeDlgOkButtons(),
			});
		},
		onSuccessConfirm:function(model, response){
			console.log("onSuccessConfirm: ", model, response);
			this.getCollection().remove(model);
			this.hideProgress();
			this.onFinishDetails();
		},
		onErrorConfirm:function(model, response){
			console.log("onErrorConfirm: ", model, response);
			//this.getCollection().remove(model);
			this.showProgress({
				title:'승인 실패',
				contents:'다시 시도 하세요!',
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
		onFinishDetails:function(){
		},
	});  // end of NisMVC.OrgInfoLayout

})();

