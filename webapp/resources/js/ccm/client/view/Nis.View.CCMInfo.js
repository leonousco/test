/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
    'use strict';

    Nis.View.CCMInfo = Uic.LayoutView.extend({
            initialize: function(options) {
            console.log('initialize:', options);
            this.super().initialize.call(this, options);
        },
        showResult:function(param) {
            console.log('showResult:');
            var view = new Uic.HBView({raw:'<h2>Search Result</h2>', className:"aaa", tagName:"bb"});
            this.right.show(view);
        },

    });

})();

