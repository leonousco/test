

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.SpanModel = Backbone.Model.extend({
        defaults: {
            class:'',
            value: '',
        },
        initialize: function (options) {
            console.log("initialize: ", options);
            var v = this.get('class2');
        }
    });

    Uic.Span = Uic.ItemView.extend({
        tagName: 'span',
        templateHelpers: function (data) {
            console.log("templateHelpers: ", data);
        },            
        initialize: function (options) {
            console.log("initialize: ", options);
            this.options = _.extend({
                raw:'{{text}}',
                data: {
                    text:'',
                },
            }, options);
            if(options && options.model && options.model.attributes.class) {
                this.$el.addClass(options.model.attributes.class);
            }

        },
    });

})();
