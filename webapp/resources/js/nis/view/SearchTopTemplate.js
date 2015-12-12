
(function () {
	'use strict';

	Nis.View.SearchTopTemplate = Uic.LayoutView.extend({
		tagName: 'div',
		className: 'col-lg-12',
		id:'page_contents',
		regions: {
			searchCondition:'#top_contents',
			left: '#left',
			listRegion : '#left_down',
			detailsRegion: '#right_north',
			right_middle: '#right_middle',
			right_south: '#right_south',
			submitButtonRegon: '#right_footer',
		},
		initialize: function(options) {
			//console.log('initialize:', options);
			Uic.LayoutView.prototype.initialize.call(this, options);
			this.onInit();
		},
		onInit:function() {
		},
		getDefaultTemplate:function(options) {
		   var raw =''
				+'<div id="top" class="row-fluid">'
					+'<div id="top_contents" class="col-lg-12">'
					+'</div>'
				+'</div>'
				+'<div id="top2" class="row-fluid">'
					+'<div id="left" class="col-lg-6">'
						+'<div id="left_down" class="row-lg-6">'
						+'</div>'
					+'</div>'
					+'<div id="right" class="col-lg-6">'
						+'<div id="right_north" class="row-sm-6">'
						+'</div>'
						+'<div id="right_middle" class="row-sm-6">'
						+'</div>'
						+'<div id="right_south" class="row-sm-6">'
						+'</div>'
						+'<div id="right_footer" class="row-sm-6">'
						+'</div>'
					+'</div>';
				+'</div>';
			return raw;
		},
	});  // end of NisMVC.SearchTopLayout

})();

