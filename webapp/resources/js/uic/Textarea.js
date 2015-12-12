/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.Textarea = Uic.ItemView.extend({
        tagName:'textarea',
        events: {
            "change"        : "change",
        },        
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.initOptions(options);          
            this.setAttrs(options.data);
            this.renderView();
        },      
        getAttrId:function(options) {
            //return 'input_' + options.data.inputId;
            if(options && options.data)
                return options.data.inputId;
            else
                return "Textarea";
        },
        setAttrs:function(param) {
            if(param == null)
                return;
            if(param.type == null)
                param.type = param.inputType;
            this.setType(param.type);
            this.setAttr("dbid", param.dbid);
            this.setAttr("placeholder", param.placeholder);
            this.setAttr("value", param.inputValue);                         
        },
        setType:function(type) {
            this.setAttr("type", type);
        },
        getType:function(type) {
            return this.getAttr("type");
        },
        setAttr:function(key, val) {
            if(val) {
              $(this.element).attr(key, val);
            }
        },
        change:function() {
            var target = event.target;
            console.log("change:", target.value);
            this.setControlValue(target.value);
        },
        setValue:function(value){
            this.$el.val(value);
        },
        getValue:function(){
            return this.$el.val();
        },        
    });

    _.extend(Uic.Textarea.prototype, Uic.View.ControlMixin);


})();

