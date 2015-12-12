
(function () {
	'use strict';

	Nis.Model.CCMObj = Nis.Model.extend({
		defaults: {
		    id: null,
		},
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
			    serverName:Nis.Model.CCM.Server,
			}, options);
			return Nis.Model.prototype.initialize.call(this, newOptions);
		},
	}); //end of Nis.Model.CCMObj

	Nis.Collection.CCMObj = Nis.Collection.extend({
		model: Nis.Model.CCMObj,
		initialize: function(options){
		    //console.log("initialize: CCMList");
			var newOptions = _.extend({
				serverName:Nis.Model.CCM.Server,
			}, options);
		    return Nis.Collection.prototype.initialize.call(this, newOptions);
		},
	}); // end of Nis.Collection.CCMObj

})();
