
(function () {
	'use strict';

	Nis.View.HasProgress = {
		makeProgressTitle:function(title){
			var html = '<h4>'+title+'</h4>'
			return $(html);
		},
		showProgress:function(options){
			var progress = this.getProgress();
			if(progress) {
				this.clearProgress(progress);
			}
			else{				
				progress = this.makeProgress();
			}			
			if(options.title) {
				var title = options.title;
				if(_.isString(options.title)) {
					title = this.makeProgressTitle(options.title);
				}				
				progress.setHeader(title);
			}
			if(options.showProgress)
				progress.showProgress({show:options.showProgress});
			if(options.contents)
				progress.setContent(options.contents);
			if(options.buttons)
				progress.setFooter(options.buttons);
			if(options.target)
				this.setProgressTarget(options.target);

			progress.open();	
			return progress;		
		},
		clearProgress:function(progress){
			progress.clearViews();						
		},
		makeProgress:function(options){
			this.progress = new Uic.Modal({
				hasFooter:false,
			});
			return this.progress;
		},
		hideProgress:function(options){
			var progress = this.getProgress();
			if(progress) {
				progress.close();
			}
			this.progress = null;
		},
		getProgress:function(options){
			return this.progress;
		},
		onClickButtonDlgClose:function() {
			this.hideProgress();
		},
		makeDlgOkButtons:function(cb){
			var buttonId = ['ok'];
			var cbDlg = cb;
			if(_.isUndefined(cb)) {
				cbDlg = this.onClickButtonDlgClose.bind(this);
			}
			var buttons = this.makeButtons(
				{buttonId:buttonId},
				cbDlg);
			return buttons;			
		},		
		setProgressTarget:function(progressTarget){
			this.progressTarget = progressTarget;
		},
		getProgressTarget:function(){
			return this.progressTarget;
		},

	};  // end of Nis.View.HasProgress

})();

