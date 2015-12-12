/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	Nis.View.MainLayout = Nis.View.VerticalLayout.extend({
        className:'col-sm-12',
        id:'MainLayout',
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.VerticalLayout.prototype.initialize.call(this, options);
		},
        showMainTop:function(title){
            this.setView('top', this.makeMainTop(title));
        },
        makeMainTop:function(title){
            var view = new Uic.View({
                raw:'<h2>'+title+'</h2>',
            });
            return view;
        },
        getMainTop:function(){
            return this.getView('top');
        },
        showMainMiddle:function(options){
            this.setView('middle', this.makeMainMiddle(options));
        },
        getMainMiddle:function(){
            return this.getView('middle');
        },
        makeMainMiddle:function(options) {
            var view = new Uic.View({
                raw:'<h2> Main Table Area </h2>',
            });
            return view;
        },
        showMainBottom:function(options){
            this.setView('bottom', this.makeMainBottom());
        },
        getMainBottom:function(){
            return this.getView('bottom');
        },
        makeMainBottom:function(options) {
            var view = new Uic.View({
                raw:'<h2> Sub Contents Area </h2>',
            });
            return view;
        },
    })
})();

