


var Uic = Uic || {};

(function () {
    'use strict';

    Uic = Backbone.Marionette.Object.extend({
        param:null,       
        
        constructor: function() {
            console.log("constructor:");
        },
        parse: function(data, options) {
            console.log("parse:");
        },

        initialize: function (param) {
        },
        render: function () {       
            return this;
        },  
        setParam:function(param) {
            this.param = param;
            this.render();
        },        
    });

    Uic.showModal = function(title, contents) {
        var modal = new Backbone.BootstrapModal({
            title:title,
            content:contents,
        });
        modal.open(function(args) {
                console.log("showTestModal: on modal button clicked, args:", args);
        });        
    };


    Marionette.Renderer.render = function(template, data){
        if (!template) {
            throw new Marionette.Error({
                name: 'TemplateNotFoundError',
                message: 'Cannot render the template since its false, null or undefined.'
            });
        }

        var templateFunc = _.isFunction(template) ? template : Marionette.TemplateCache.get(template);

        return templateFunc(data);
    };    


    Marionette.TemplateCache.prototype.load = function (options) {
        console.log("load: ", this.options);

        if(this.options && this.options.templateId) {
            if(this.options.templateId === 'local' && this.options.raw) {
                if(this.options.data) {
                    return Handlebars.compile(this.options.raw)(this.options.data);
                }
                else {
                    return this.options.raw;
                }
            }
        }


        var tInfo = Uic.getTemplateInfo(this.templateId);
        var useCompiledTemplate = true;
        if(tInfo) {
            if(tInfo.data) {
                useCompiledTemplate = false;
            }
        }
        if (useCompiledTemplate && this.compiledTemplate) {
            return this.compiledTemplate;
        }

        // Load the template and compile it
        var template = this.loadTemplate(this.templateId, options);
        //var template = this.loadTemplate(this.templateId);
        this.compiledTemplate = this.compileTemplate(template, options);

        return this.compiledTemplate;

    };

    Marionette.TemplateCache.prototype.compileTemplate = function (yourTemplate, options) {
        console.log("compileTemplate: ", yourTemplate);
        if ($.isFunction(yourTemplate)) {
            return yourTemplate;
        } else {
            return Handlebars.compile(yourTemplate.raw);
        }
    };


    Marionette.TemplateCache.prototype.loadTemplate = function (yourTemplateId, options) {

        var yourTemplate;
        console.log("loadTemplate: ", yourTemplateId);


        if (NisMVC.uiStore && NisMVC.uiStore[yourTemplateId]) {
            //var t = NisMVC.uiStore[yourTemplateId];
            yourTemplate = NisMVC.uiStore[yourTemplateId];                
            if(yourTemplate.data) {
                var tpl = Handlebars.compile(yourTemplate.raw)(yourTemplate.data)
                yourTemplate = Handlebars.compile(tpl);
            }
        } else {
            // load it here
        }
        return yourTemplate;
    };

    Uic.getTemplateInfo = function(yourTemplateId) {
        if (NisMVC.uiStore && NisMVC.uiStore[yourTemplateId]) {
            return  NisMVC.uiStore[yourTemplateId];                
        } 
    };


})();