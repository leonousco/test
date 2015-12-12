

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.CollapseModel = Backbone.Model.extend({
        modelId: function(attrs) {
            return 'Uic.CollapseWell';
        },
    });

    Uic.CollapseWell = Uic.CompositeView.extend({
        template:function() {
            return '';
        },
        initialize: function (options) {
            this.collection = new Uic.CollapseButtonCollection();
            this.collection.add(new Uic.WellModel());
        },
        getChildView: function(child) {
            if(child.modelId() === Uic.WellModel.getModelId()) {
                return Uic.Well;
            }
            return Uic.CompositeView.prototype.getChildView.call(this, child);
        },           
        childViewOptions: function(child, index) {
            console.log("childViewOptions: ", " index: ", index);
            if(child.modelId() === Uic.WellModel.getModelId()) {
                return {
                    raw: '{{text}}',
                    data: {
                        text: 'text ....',
                    },
                };
            }
            //return Uic.CompositeView.prototype.childViewOptions.call(this, child, index);
        },
    });


    Uic.CollapseButtonCollection = Backbone.Collection.extend({
        //model: Uic.SButtonModel,
    });

    Uic.CollapseButton = Uic.CompositeView.extend({
        collection:null,
        initialize: function (options) {
            console.log("initialize: ", options);
            this.options = _.extend({
                controlView: null,
                collapseView:null,
                collapse_href:'collapseWell',
                class: null,
                text: null,
                button: {
                    text:'test',
                },
            }, options);

            this.template = Uic.CollapseButton.template;
            if(NisMVC.uiStore && NisMVC.uiStore[this.template]) {
            }
            else {
                this.extendOptions(this.getDefaultParam());
                this.setTemplate(this.template, this.options);                    
            }
            this.collection = new Uic.CollapseButtonCollection();
            //this.collection.add(new Uic.SButtonModel());                
            //this.makeButtonView();
            this.addItem(new Uic.SButtonModel());
            this.addItem(new Uic.CollapseModel());

        },
        addItem:function(item) {
            this.collection.add(item);
        },
        addChild: function(child, ChildView, index) {
            Uic.CompositeView.prototype.addChild.call(this, child, ChildView, index);
        },
        getChildView: function(child) {
            if(child.modelId() === Uic.SButtonModel.getModelId()) {
                return Uic.SButton;
            }
            else if(child.modelId() === 'Uic.CollapseWell') {
                return Uic.CollapseWell;
            }
            return Uic.CompositeView.prototype.getChildView.call(this, child);
        },        
        childViewOptions: function(child, index) {
            console.log("childViewOptions: ", " index: ", index, ", child:", child);
            if(child.modelId() === 'Uic.CollapseWell') {
                return this.getCollapseWellOptions();
            }
            else if(child.modelId() === '.button') {
                return this.getButtonOptions();
            }
            //return Uic.CompositeView.prototype.childViewOptions.call(this, child, index);
        },
        getCollapseWellOptions:function() {
            return {
                id:this.options.collapse_href,
            };
        },
        getButtonOptions:function() {
            return {
                button: {
                    text: 'test ...',
                },             
            };
        },

        getDefaultParam:function() {
            return {
                raw: '',
                /*
                raw: '<button role="button" data-toggle="collapse" href="#{{collapse_href}}" aria-expanded="false" aria-controls="{{collapse_href}}">' 
                    + '{{button.text}}</button>' 
                    + '<div id="{{collapse_href}}"></div>',
                    */
            };
        },
    });

    Uic.CollapseButton.template = 'Uic.CollapseButton';

})();
