/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	Nis.View.Mpi = Nis.View.MainLayout.extend({
        id:'Mpi',
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.MainLayout.prototype.initialize.call(this, options);
            this.showMainTop();
		},
        makeMainTop:function(options) {
            var view = new Nis.View.MpiTop();
            view.on('click.mainTable', this.onClickMainTableItem.bind(this));
            return view;
        },
        onClickMainTableItem:function(model){
            this.showMainMiddle(model);
        },
        makeMainMiddle:function(model) {
            var view = new Nis.View.MpiMiddle({model:model});
            return view;
        },
    })
})();

