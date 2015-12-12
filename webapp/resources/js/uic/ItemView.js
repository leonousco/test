

var Uic = Uic || {};

(function () {
    'use strict';
    Uic.ItemView = Marionette.ItemView.extend({
        childWidget:null,
        getTemplate: function() {
            return this.compileTemplate;
        },
        compileTemplate: function(data) {
            console.log("compileTemplate: ", data);
            var tpl = Handlebars.compile(data.raw)(data.data);
            return tpl;
        },
        serializeData: function() {
            //console.log("serializeData: "+this.options);
            return this.options;
        },     
        /*   
        extendOptions: function(options) {
            this.options = _.extend(this.options, options);
        },
        */
        addView:function(nameArg, view) {
            if(_.isUndefined(this.childWidget) || _.isNull(this.childWidget) ) {
                this.childWidget = [];                
            }
            this.childWidget.push({
                name:nameArg,
                widget:view,
            });
        },
        setText: function(text) {
            this.options.data.text = text;
            this.$el.text(this.options.data.text);
        },
        getText: function() {
            return this.options.data.text;
        },
        addClass: function(classes) {
            this.options.class = this.options.class.concat(' ', classes); 
        },
        render: function() {
            Marionette.ItemView.prototype.render.call(this);
        },        
        onRender: function() {
            //console.log("onRender: ");
        },        
        renderView:function(param) {
            console.log("renderView: ");
            if(! this.options.raw) {
                var html = Handlebars.compile(this.getRawTemplate())(this.options)
                $(this.el).html(html);                
            }
            $(this.el).addClass(this.options.class);
        },
        renderChildWidgets:function(childWidget) {
            console.log("renderChildWidgets: ");   
            if(childWidget) {
                for (var i = 0; i < childWidget.length; i++) {
                    var widget = childWidget[i];
                    //var view = this.$el.find(widget.name);
                    var view = this.$(widget.name);
                    if(view) {
                        view.replaceWith(widget.widget.$el.html());                    
                    }
                    else {
                        console.warn("onRender: cannot find widget : ", widget.name);
                    }
                }                
            }
        },        
        getRawTemplate:function() {
            if(this.options.raw)
                return this.options.raw;
            if(this.template)
                return NisMVC.uiStore[this.template].raw;
            else 
                return '';
        },
        setTemplate:function(name, template) {
            NisMVC.uiStore[name] = template;
            this.template = name;            
        },        
        makeRawHtml:function(tag, value) {
            return {raw:this.makeHtml(tag, value)};
        },
        makeHtml:function(tag, value) {
            return '<'+tag+'>' + value + '</'+tag+'>';
        },
    });

    _.extend(Uic.ItemView.prototype, Uic.View.Mixin);

})();