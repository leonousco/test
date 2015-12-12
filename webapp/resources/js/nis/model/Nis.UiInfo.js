
(function () {
    'use strict';

    Nis.UiInfo = Nis.extend({
        items:[],
        model:null,

        constructor: function(options) {
            console.log("constructor:");
            this.initialize(options);
        },
        parse: function(data, options) {
            console.log("parse:");
        },
        initialize: function (param) {
        },
        setParam:function(param) {
            this.items = param;
        },
        getItemCount:function() {
            return this.items.length;
        },
        setItems:function(param) {
            this.items = param;
        },
        getItem:function(index) {
            return this.items[index];
        },
        getItems:function() {
            return this.items;
        },
        addParam:function(data) {
            this.items.push(data);
        },
        makeParam2:function() {
            return {"param":this};
        },
        getModel:function() {
            return this.model;
        }
    }); //end of Nis.UiInfo

    Nis.UiInfo.ItemUtil = Backbone.Marionette.Object.extend({
        baseMap:null,
        initialize: function (options) {
            this.options.items = options.items;
            this.baseMap = this.makeMap(this.options.items);
        },
        exclude:function(items){
            var map = new Nis.Map();
            for(var i=0; i<items.length; i++) {
                map.put(items[i], items[i]);
            }
            var newItems = [];
            for(var i=0; i<this.options.items.length; i++) {
                var item = this.options.items[i];
                var temp = map.get(item.dbid);
                if(temp == null) {
                    newItems.push(item);
                }
            }
            //this.options.items = newItems;
            return newItems;
        },
        makeMap:function(items) {
            var map = new Nis.Map();
            for(var i=0; i<items.length; i++) {
                map.put(items[i].dbid, items[i]);
            }
            return map;            
        },
        select:function(items){            
            var newItems = [];
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                var temp = this.baseMap.get(item);
                if(temp != null) {
                    newItems.push(temp);
                }
            }
            return newItems;
        },
        makeValidateRules:function(itemNames) {
            var validate = {};
            for(var i=0; i<itemNames.length; i++) {
                var key = itemNames[i];
                validate[key] = this.makeValidateRule(key);
            }
            return validate;
        },
        makeValidateRule:function(itemName) {
            var item = this.baseMap.get(itemName);
            var rule = {};
            if(item.required) {
                rule.required = item.required;
            }
            if(item.minlength) {
                rule.minlength = item.minlength;
            }
            if(item.type === 'email') {
                rule.email= true;
            }
            return rule;
        },
        getColumn:function(dbid){
            return this.baseMap.get(dbid); 
        },
        setProp:function(dbid, prop, value){
            var item = this.getColumn(dbid);
            if(item)
                item[prop] = value;
        },
        setReadOnly:function(dbid, readOnly) {
            this.setProp(dbid, 'readOnly', readOnly); 
        },
    }); // end of Nis.UiInfo.ItemUtil


})();
