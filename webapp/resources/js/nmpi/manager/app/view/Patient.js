/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	Nis.View.Patient = Nis.View.MainLayout.extend({
        //id:'Patient',
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.MainLayout.prototype.initialize.call(this, {id:'patient'});
            this.showMainTop();
		},
        makeMainTop:function(options) {
            var view = new Nis.View.PatientTop();
            view.on('click.mainTable', this.onClickMainTableItem.bind(this));
            return view;
        },
        onClickMainTableItem:function(model){
            this.showMainMiddle(model);
        },
        makeMainMiddle:function(model) {
            var view = new Nis.View.PatientMiddle({model:model});
            return view;
        },
    })
})();

