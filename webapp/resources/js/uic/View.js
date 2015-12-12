

var Uic = Uic || {};

(function () {
    'use strict';
    Uic.View = Marionette.View.extend({
        initialize: function (options) {
            this.initOptions(options);
            this.renderView();
        },
    });

    Uic.View.Mixin = {
        attributes: function (options) {
            //console.log("attributes: ",this.options, options);
            if(this.options == null)
                return {};
            else if(this.options.attributes) {
                return this.options.attributes;
            }
            var id = this.getAttrId(this.options);
            if(id) {
                return {
                    id:id,
                };
            }
            return {};
        },
        getAttrId:function(options) {
            return options.id;
        },
        tagName: function(options) {
            //console.log("tagName:",this.options, options);
            if(this.options && this.options.tagName)
                return this.options.tagName;
            return 'div';
        },
        className: function(options) {
            //console.log("className:",this.options, options);
            if(this.options && this.options.className)
                return this.options.className;
            if(this.className)
                return this.className;
        },
        initOptions:function(options) {
            this.options = _.extend({
                raw:this.getDefaultTemplate(options),
                data: {},
            }, options);
        },
        extendOptions: function(options) {
            this.options = _.extend(this.options, options);
        },
        compileTemplate: function(options) {
            //console.log("compileTemplate: ", data);
            if(options.raw == null)
                return null;
            var html = Handlebars.compile(options.raw)(options.data);
            return html;
        },
        renderView:function() {
            var html = this.compileTemplate(this.options);
            $(this.el).html(html);
            return this;
        },
        makeButtons:function(buttons, cbFunc) {
            var view = new Uic.Buttons({
                buttons:buttons,
            });
            if(cbFunc)
                view.on('click', cbFunc.bind(this));
            return view;
        },
        getDefaultTemplate:function(options) {
            if(options && options.raw)
                return options.raw;
            if(options.defaultTemplate)
                return options.defaultTemplate;
            return "";
        },
        getUniqId:function(prefix) {
            if(_.isUndefined(Uic.View.uniqCount)){
                Uic.View.uniqCount = 0;
            }
            if(! prefix) {
                prefix = "uid";
            }
            var id = prefix+'_'+Uic.View.uniqCount++;
            if($('#'+id).length == 0)
                return id;
            else
                return this.getUniqId(prefix);
        },
        setButtonEnble: function(buttonId, enable) {
            if(enable) {
                this.$el.find('#'+buttonId).addClass('acitive');
                this.$el.find('#'+buttonId).removeClass('disabled');
            }
            else {
                this.$el.find('#'+buttonId).addClass('disabled');
                this.$el.find('#'+buttonId).removeClass('acitive');
            }
        },
        
    } // end of Uic.View.Mixin

    _.extend(Uic.View.prototype, Uic.View.Mixin);

    Uic.View.ControlMixin = {
        //controlVaule:null,
        setControlValue:function(value) {
            this.controlValue = value;
        },
        getControlValue:function() {
            return this.controlValue;
        },
    }

    Uic.View.HasCollectionMixin = {
        getCollection:function() {
            return this.collection;
        },
    } // end of Uic.View.HasCollectionMixin


})();
