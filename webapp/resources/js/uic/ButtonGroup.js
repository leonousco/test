/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
	'use strict';


	Uic.ButtonGroup = Backbone.View.extend({
		btnList:[],

		initialize: function (param) {
			//this.param = param.param;
			this.param = param;
			for(var i=0; i<this.param.getItemCount(); i++) {
				var btnEl = new Uic.Button(this.param.getItem(i));
				var btn = btnEl.render().$el.find("button");
				this.btnList.push(btn);
			}
			this.render();
		},
		template:function(data) {
			var raw =  '  <div class="nis-button-list col-sm-8"> </div>';

	               '<div class="form-group">'
	               +'  <div class="nis-button-list col-sm-8"> </div>'
	               +' </div>';

                return _.template(raw)(data);
		},



	    render: function (data) {
	    	    	$(this.el).html(this.template());
	    	    	for(var i=0; i<this.btnList.length; i++) {
	    	    		$('.nis-button-list', this.el).append(this.btnList[i]);
	    	    	}
	    	    	//$('.nis-button-list', this.el).append(this.searchresultsView.render().el);
		     return this;
	    },
	});


})();

