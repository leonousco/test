

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.Button = Marionette.View.extend({
        initialize: function (param) {
            this.setParam(param);
        },
        template:function(data) {
            var raw =
                '<button id="<%= buttonId %>" type="button" class="<%= buttonClass %>"> <%= buttonTitle %> </button>';
                return _.template(raw)(data);
        },
        render: function () {
            $(this.el).html(this.template(this.param));
            return this;
        },
        setParam:function(param) {
            this.param = param;
            this.render();
        },
    });


})();
