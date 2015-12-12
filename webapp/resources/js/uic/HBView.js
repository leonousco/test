

var Uic = Uic || {};

(function () {
    'use strict';
    param:null,
    Uic.HBView = Backbone.View.extend({
        initialize: function (param) {
            if(param)
                this.param = param;
            else
                this.param = this.makeRawHtml('h3', 'HBView');

            if(this.param.raw == undefined) {
                if(typeof(param) == 'string')
                    this.param = this.makeRawHtml('h3', param);
            }

            if(this.param && this.param.renderOnInit) {
                this.render();
            }
        },
        render: function () {
            var html = Handlebars.compile(this.param.raw)(this.param.data);
            $(this.el).html(html);
            return this;
        },
        setParam:function(param) {
            this.render();
        },
        makeRawHtml:function(tag, value) {
            return {raw:this.makeHtml(tag, value)};
        },
        makeHtml:function(tag, value) {
            return '<'+tag+'>' + value + '</'+tag+'>';
        },
    });

    _.extend(Uic.HBView.prototype, Uic.View.Mixin);


})();
