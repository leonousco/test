/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	Nis.View.VerticalLayout = Uic.FGLayout.extend({
        buildOptions:function(options){
            var newOptions = _.extend({
                id:'VLayout',
                items:[
                    {
                        regionName:'top',
                        className:'row-fluid',
                    },
                    {
                        regionName:'middle',
                        className:'row-fluid',
                    },
                    {
                        regionName:'bottom',
                        className:'row-fluid',
                    },
                ],
            }, options);
            newOptions.regions = this.makeRegions(newOptions);
            return newOptions;
        },
        showTitle:function(title){
            this.setView('top', this.makeTitle(title));
        },
        makeTitle:function(title){
            var view = new Uic.View({
                raw:'<div class = "page-header">'+'<h2>'+title+'</h2>'+'</div>',
            });
            return view;
        },
        makeButtons:function(buttons, cbFunc) {
            var view = new Uic.Buttons({
                buttons:buttons,
            });
            view.on('click', cbFunc.bind(this));
            return view;
        },
    })
})();

