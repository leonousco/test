

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.CompositeView = Backbone.Marionette.CompositeView.extend({
        template:null,
        initialize: function (options) {
            //console.log('initialize:');
            this.initOptions(options);
            this.renderView();
        },      
        compileTemplate: function(data) {
            console.log("compileTemplate: ", data);
            var tpl = Handlebars.compile(data.raw)(data.data);
            return tpl;
        },          
        getTemplate: function() {
            return this.compileTemplate;
        },
        compileTemplate: function(data) {
            console.log("compileTemplate: ", data);
            var tpl = Handlebars.compile(data.raw)(data.data);
            return tpl;
        },
        serializeData: function() {
            return this.options;
        },        
        setTemplate:function(name, template) {
            this.template = name;            
            NisMVC.uiStore[name] = template;
        },        
        onBeforeRender: function() {
            //console.log("onBeforeRender: ", "model:", this.model);
        },        
        addChild: function(child, ChildView, index) {
            return Backbone.Marionette.CompositeView.prototype.addChild.call(this, child, ChildView, index);
        },
        getChildView: function(child) {
            return Backbone.Marionette.CompositeView.prototype.getChildView.call(this, child);
        },
        addModelItem:function(model, options) {
            if(! this.modelMap) {
                this.modelMap = new Map();
            }
            this.modelMap.set(model, options);
            this.collection.add(model, options);              
        },
        getModelOption: function(model) {
            if(! this.modelMap) 
                return null;
            return this.modelMap.get(model);
        },
        setText:function(text) {
            if(this.options && this.options.data) {
                this.options.data.text = text;
                this.$el.text(this.options.data.text);
            }
        },
        childViewOptions: function(model, index) {
            //console.log("childViewOptions: ", " index: ", index, ", model:", model);
            var ret = this.getModelOption(model);
            return ret;            
        },
        getModelByModelId: function(modelId) {
            if(! this.collection)
                return null;
            for(var i=0; i<this.collection.models.length; i++) {
                var model = this.collection.models[i];
                if(model.getModelId) {
                    if(modelId === model.getModelId()) {
                        return model;
                    }                    
                }
            }
            return null;
        },
        setParentView:function(view) {
            this.parentView = view;
        },
        getParentView:function() {
            if(this.parentView)
                return this.parentView;
            return null;
        },
        removeNulls:function(obj) {
            var isArray = obj instanceof Array;
            for (var k in obj) {
                if (obj[k]===null) 
                    isArray ? obj.splice(k,1) : delete obj[k];
                else if (typeof obj[k]=="object") 
                    this.removeNulls(obj[k]);
            }
        },
    }); // end of Uic.CompositeView

    _.extend(Uic.CompositeView.prototype, Uic.View.Mixin);

})();