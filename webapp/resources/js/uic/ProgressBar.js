
(function () {
	'use strict';

	Uic.ProgressBar = Uic.View.extend({
		className: 'progress-bar progress-bar-striped active',
		attributes: {
			role:"progressbar",
			'aria-valuenow':"100",
			'aria-valuemin':"0",
			'aria-valuemax':"100",
			style:"width: 100%",
		},
		getDefaultTemplate:function(options) {
			return '<span class="sr-only">100% Complete</span>';
			/*
			ret = 
                    +'<div class="progress" style="margin:0;">'
                    +'<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">'
                    +'<span class="sr-only">100% Complete</span>'
                    +'</div>'
                    +'</div>';
                return ret;
                */
		}
	}); // end of Uic.ProgressBar

	Uic.Progress = Uic.CompositeView.extend({
		className: 'progress',
		attributes: {
			style:"margin:0;",
		},
		initView:function(options){
			var view = new Uic.ProgressBar(options);
			$(this.el).append(view.el);
		}
	}); // end of Uic.ProgressBar


})();

