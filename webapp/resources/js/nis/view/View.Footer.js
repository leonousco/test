
var View = View || {};

(function () {
	'use strict';

	View.Footer = Uic.HBView.extend({
		data: {
			rights:"2015 All rights reserved.",
			developer:"Designed and developed by SSIS",
		},
		initialize: function (options) {
			var defaultRaw = this.getDefaultTemplate();
			this.param = _.extend({
				raw:defaultRaw,
				data: this.data,
			}, options);
			this.render();
		},
	    getDefaultTemplate:function() {
	    		var ret = ''
				+'<div class="container">'
				+'  <div class="row">'
				+'    <div class="col-md-4">'
					+'    <img src="resources/images/nis/foot_logo.png">'
					+'    </img>'
				+'    </div> '
				
				+'    <div class="col-md-4">'
				+'      <p>{{rights}}</p>  '          
				+'    </div>    '
				//+'    <div class="col-md-4 col-md-offset-4">'
				+'    <div class="col-md-4">'
				+'  		<p>{{developer}}</p>'
				+'    </div>'
				+'  </div>'
				+'</div>';
			return ret;
	    }
	});
})();

