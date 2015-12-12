
(function () {
	'use strict';

	Nis.View.SearchTopLayout = Nis.View.SearchTopTemplate.extend({
		showSubmitButtons:function(){
			this.submitButtonRegon.show(this.makeSubmitButtons());
		},
		hideSubmitButtons:function() {
			this.submitButtonRegon.empty();
		},
		makeSubmitButtons:function(){
		},
	});  // end of NisMVC.SearchTopLayout


    _.extend(Nis.View.SearchTopLayout.prototype, Nis.View.HasSearchControl);
    _.extend(Nis.View.SearchTopLayout.prototype, Nis.View.HasListPanel);
    _.extend(Nis.View.SearchTopLayout.prototype, Nis.View.HasDetailsPanel);
    _.extend(Nis.View.SearchTopLayout.prototype, Nis.View.HasProgress);


})();

