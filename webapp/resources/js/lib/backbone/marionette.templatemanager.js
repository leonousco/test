/* global $, _, Marionette */


Marionette.TemplateManager = (
    function (Marionette, _, $) {
    'use strict';

    return function (options) {

        options = _.extend({
            dirname: 'js/templates/',
            extname: '.html'
        }, options);

        return {
            template: function (templateId) {

                var deferred = new $.Deferred(),
                    cachedTemplate = Marionette.TemplateCache.templateCaches[templateId];

                if (cachedTemplate) {
                    deferred.resolve();
                } else {
                    $.ajax({
                        url: options.dirname + templateId + options.extname,
                        success: function (template) {
                            cachedTemplate = new Marionette.TemplateCache(templateId);
                            cachedTemplate.compiledTemplate = Marionette.TemplateCache.prototype.compileTemplate(template);
                            Marionette.TemplateCache.templateCaches[templateId] = cachedTemplate;

                            deferred.resolve();
                        },
                        error: function () {
                            deferred.reject();
                        }
                    });
                }

                return deferred.promise();
            },
            load: function (urls, callback) {
                var deferreds = [];
                //callback();
                
                
                $.each(urls, function(index, url) {
                    var cachedTemplate = Marionette.TemplateCache.templateCaches[url.templateId];
                    
                    if (cachedTemplate) {
                        deferred.resolve();
                    }
                    else {
                        console.log("load(), index:", index, ", templateId:", url.templateId);
                        deferreds.push(
                            $.get(url.path +"/"+url.templateId+'.html', function(template) {
                                cachedTemplate = new Marionette.TemplateCache(template);
                                cachedTemplate.raw = template;
                                //cachedTemplate.compiledTemplate = Marionette.TemplateCache.prototype.compileTemplate(template);
                                Marionette.TemplateCache.templateCaches[url.templateId] = cachedTemplate;
                                console.log("loaded(), index:", index, ", templateId:", url.templateId);
                            }, 'html'));
                    }                    
                });

                $.when.apply(null, deferreds).done(callback);
                
             },
           getTemplate:function(templateId) {
            	 return Marionette.TemplateCache.templateCaches[templateId];
             },             
             getCompiledTemplate:function(templateId, data) {
            	 var cachedTemplate = this.getTemplate(templateId);
            	 if(cachedTemplate.compiledTemplate) {
            		 return cachedTemplate.compiledTemplate; 
            	 }
            	 cachedTemplate.compiledTemplate = _.template(cachedTemplate.raw)(data);
            	 return cachedTemplate.compiledTemplate;
             },             
         };
    };
}

)(Marionette, _, $);



    Marionette.TemplateManager.prototype = {
        load: function () {
            return Math.sqrt((this.x*this.x)+(this.y*this.y));
        },
        toString: function () {
            return "("+this.x+", "+this.y+")";
        }
    };  