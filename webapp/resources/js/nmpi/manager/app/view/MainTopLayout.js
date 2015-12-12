/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	Nis.View.MainTopLayout = Nis.View.VerticalLayout.extend({
        getTitle:function(){
            return this.getView('top');
        },
        showSearch:function(options){
            this.setView('middle', this.makeSearch());
        },
        getSearch:function(){
            return this.getView('middle');
        },
        makeSearch:function(options) {
            var view = new Uic.View({
                raw:'<h2> Main Table Area </h2>',
            });
            return view;
        },
        showTable:function(options){
            this.setView('bottom', this.makeTable(options));
        },
        getTable:function(){
            return this.getView('bottom');
        },
        makeTable:function(options) {
            var view = new Uic.View({
                raw:'<h2> Sub Contents Area </h2>',
            });
            return view;
        },
    })
})();

