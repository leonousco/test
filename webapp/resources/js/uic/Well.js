

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.WellModel = Backbone.Model.extend({
        defaults: {
            class:'',
            text: '',
        },
        modelId: function(attrs) {
            return Uic.WellModel.getModelId();
        },        
    });

    Uic.WellModel.getModelId = function() {
        return 'Uic.WellModel';
    };

    Uic.Well = Uic.ItemView.extend({
        className: 'well',
        initialize: function (options) {
            console.log("initialize: ", options);
            this.options = _.extend({
                class: 'well',
                raw:'{{text}}',
                data: {
                    text:'sss',
                },
            }, options);

            this.template = Uic.Well.template;
            if(options.model) {
                if(options.model.attributes.class) {
                    this.className = options.model.attributes.class;
                }
            }
        },
        /*
        getDefaultParam:function() {
            return {
                raw: '{{text}}',
            };
        },
        */
    });

    //Uic.Well.template = 'Uic.Well';

})();
