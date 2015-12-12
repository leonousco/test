/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	NisMVC.ContentsLayout = Uic.LayoutView.extend({		
		tagName: function() {
		    return this.options.tagName;
		},
		className: function() {
		    return this.options.className;
		},	
		initialize: function(options) {
			console.log('initialize:', options);
			this.super().initialize.call(this, options);
			this.showList(this.param);			
		},
		showList:function(param) {
			var uiInfo ;
			var view ;

			if ( this.param.data.page_title == "add"){

				uiInfo = param.LoginUi().getFormInfo("add");
				view = new Uic.LoginUserForm(uiInfo);
                    var serverOption = {
                        serverName:"admin"
                    }
                    view.model = new Nis.Model.User("",serverOption);
			}
			else {
				uiInfo = param.LoginUi().getFormInfo();
				view = new Uic.LoginForm(uiInfo);
				view.model = new Nis.Model.Login();
			}
			//var uiInfo = new Nis.Model.AuthorityUi();			
			this.contents.show(view);
									
		},
		

	});

})();

