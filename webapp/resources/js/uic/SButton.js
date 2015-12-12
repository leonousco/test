

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.SButtonCollection = Backbone.Collection.extend({
        model: Uic.SpanModel,
    });

    Uic.SButtonModel = Backbone.Model.extend({
        modelId: function(attrs) {
            return Uic.SButtonModel.getModelId();
        },
    });

    Uic.SButtonModel.getModelId = function() {
        return 'Uic.SButtonModel';
    };



    Uic.SButton = Uic.CompositeView.extend({
        childView: Uic.Span,
        collection:null,
        modelEvents: {
            "change": "modelChanged"
        },                
        tagName: function(options) {
            var ret = 'button';
            if(options) {
                if(options.tagName) {
                    return options.tagName;  
                }
                else if(options.data && options.data.tagName) {
                    return options.data.tagName;  
                }
            }
            return ret;
        },
        /*
        id:function(options) {
            var ret = 'Uic.SButton';
            if(options) {
                if(options.id) {
                    return options.id;  
                }
                else if(options.data && options.data.id) {
                    return options.data.id;  
                }
            }
            return ret;
        },
        */
        className: function(options) {
            //console.log("className: ", this.options);
            var ret = 'btn btn-default';
            if(this.options) {
                if(this.options.class) {
                    return this.options.class;  
                }
                else if(this.options.data && this.options.data.class) {
                    return this.options.data.class;  
                }
            }
            return ret;
        },        
        attributes: function(options) {
            var ret = {type:'button'};
            if(options) {
                if(options.attributes) {
                    return options.attributes;  
                }
                else if(options.data && options.data.attributes) {
                    return options.data.attributes;  
                }
            }
            return ret;            
        },
        initialize: function (options) {
            this.initOptions(options);
            this.collection = new Uic.SButtonCollection(); 
            if(options.data) {
                if(options.data.buttonId) {                    
                    var button = NisMVC.App.buttonStore().getButton(options.data.buttonId);
                    //console.log("initialize:", options.data.buttonId, button);
                    this.$el.addClass(button.buttonClass);
                    this.options.data.text = button.buttonTitle;
                    options.data.icon = button.icon;
                    //
                }            
                this.setEnable(this.options.data.enable);
                if(options.data.icon) {
                    var str = '<span class = "glyphicon glyphicon-'+options.data.icon +'"></span>';
                    this.options.raw = str + " {{text}}";
                    //this.addSpanClass(str);
                }                
            }
            //console.log("initialize: this.options: ", this.options);
        },
        triggers: {
        },
        events: {
            'click ' : 'onButtonClick'
        },
        initOptions:function(options) {
            //console.log("initOptions: ", options);
            if(! options)
                return;
            if(typeof options === 'string') {
                this.options = _.extend({
                    raw:'{{text}}',
                    data: {
                        text:options,
                        enable:true,
                    },
                }, options.data);
            }
            else if(options.data && options.data.data) {
                this.removeNulls(options.data.data);
                this.options = _.extend({
                    raw:'{{text}}',
                    data: {
                        text:'sss',
                        enable:true,
                    },
                }, options.data);
            }
            else {
                this.options = _.extend({
                    raw:'{{text}}',
                    data: {
                        text:'sss',
                        enable:true,
                    },
                }, options);                
            }
            if(_.isUndefined(this.options.data.enable)) {
                this.options.data.enable = true;
            }
        },        

        onButtonClick:function(options) {
            //console.log('onButtonClick: ', options);
            this.trigger('click', this.$el.text(), this);
        },
        click:function(options) {
            console.log('onButtonClick: ', options);
        },
        addSpanClass:function(value, options) {
            if(_.isString(value)) {
                this.addSpan({class:value}, options);
            }
            else if(_.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    this.addSpan({class:value[i]}, options);
                }
            }
        },
        addSpan:function(value, options) {
            if(_.isObject(value)) {
                this.addItem(value, options);
            }
            else if(_.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    this.addItem(value[i], options);
                }                
            }
        },
        addItem:function(item, options) {
            //this.collection.add(new Uic.SpanModel(item));  
            this.addModelItem(new Uic.SpanModel(item, options), options);
        },
        onRender: function() {
            //console.log("onRender: ");
        },
        buildChildView: function(child, ChildViewClass, childViewOptions){
            //console.log("buildChildView: ", " child: ", child, ", childViewOptions:", childViewOptions);
            var options = _.extend({model: child}, childViewOptions);            
            var view = new ChildViewClass(options);
            return view;
        },        
        onAddChild: function(){
            //console.log("onAddChild: ");
        },
        modelChanged:function(options) {
            //console.log('modelChanged: ', options);
            this.setEnable(this.model.attributes.enable);
        },        
        setEnable:function(enable) {
            //console.log("setEnable:", enable);
            if(enable) {
                this.$el.removeClass('disabled');
            }                
            else {
                this.$el.addClass('disabled');
            }            
        },
        getDefaultParam:function() {
            var ret = {};
            ret.raw = '{{title}}';
            ret.data = {
                title:'Title',
            };
            ret.item = {
                    raw: '{{value}}',
                    data: {
                    value:'value',
                    },
            };
            return ret;
        },
    });




})();
