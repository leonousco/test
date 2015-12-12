/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	Nis.View.Hospital = Nis.View.MainLayout.extend({
        id:'Hospital',
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.MainLayout.prototype.initialize.call(this, options);
            this.showMainTop();
		},
        makeMainTop:function(options) {
            var view = new Nis.View.HospitalTop();
            view.on('click.mainTable', this.onClickMainTableItem.bind(this));
            return view;
        },
        onClickMainTableItem:function(model){
            this.showMainMiddle(model);
        },
        makeMainMiddle:function(model) {
            var view = new Nis.View.HospitalMiddle({model:model});
            return view;
        },
    })
})();

