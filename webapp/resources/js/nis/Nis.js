

var Nis = Nis || {};

(function () {
    'use strict';

    Nis = Backbone.Marionette.Object.extend({
        param:null,       

        constructor: function(options) {
            console.log("constructor:");
            this.param = options;
        },
        parse: function(data, options) {
            console.log("parse:");
        },
        initialize: function (param) {
            console.log("initialize:");
        },
        appContext:function() {
            return NisMVC;
        },
        paramConcat:function(obj) {
            return Nis.jsonConcat(this.param, obj);            
        },
    });

    Nis.View = Backbone.Marionette.Object.extend({
    });

    Nis.ButtonStore = Backbone.Marionette.Object.extend({
        addButton:function(options) {
            this.map = this.map || new Nis.Map();
            if(_.isArray(options)) {
                for(var i=0;i<options.length;i++) {
                    this.map.put(options[i].buttonId, options[i]);
                }
            }
            else {
                this.map.put(options.buttonId, options);
            }            
        },
        getButton:function(buttonId) {
            this.map = this.map || new Nis.Map();
            return this.map.get(buttonId);   
        },
        getButtons:function(buttonIds) {
            var ret = [];
            if(_.isString(buttonIds)) {
                ret.push(this.getButton(buttonIds));
                return ret;
            }
            for(var i=0; i<buttonIds.length; i++) {
                ret.push(this.getButton(buttonIds[i]));
            }
            return ret;
        },
    });


    Nis.jsonConcat = function(o1, obj) {
            for (var key in obj) {
                console.log("jsonConcat: ", key, ", type:", typeof(obj[key]));
                if(_.isFunction(obj[key])) {
                    o1[key] = obj[key];
                }
                else if(typeof(obj[key])=="object" && obj[key] != null) {
                    if(_.isUndefined(o1[key])) {
                       o1[key] = obj[key]; 
                    }
                    else {
                        o1[key] = this.jsonConcat(o1[key], obj[key]);                                                
                    }                    
                }
                else {
                    console.log("jsonConcat: ", key, ", type:", typeof(obj[key]));
                    console.log("jsonConcat: ",  " <= ",obj[key]);
                    if(obj[key]) {
                        o1[key] = obj[key];
                    }                    
                }                
            }
            return o1;
        };



})();


