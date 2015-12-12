
(function () {
    'use strict';


    Uic.ButtonItemModel = Backbone.Model.extend({
        defaults : {
            raw:null,
            data:null,
            id:null,
            class:null,
            tagName:null,
            text:null,
            type:'button',
            enable:true,
        }
    });


    Uic.Buttons = Uic.CompositeView.extend({
        className:"form-group",
        collection:null,
        childViewContainer: "#nis-button-list",
        childView: Uic.SButton,
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.initOptions(options);
            this.renderView();
            this.collection = new Backbone.Collection();
            if(options.buttons) {
                if(_.isArray(options.buttons)) {
                    this.makeButtons(options.buttons);
                }
                else if(options.buttons.buttonId){
                    var buttons = NisMVC.App.buttonStore().getButtons(options.buttons.buttonId);
                    this.makeButtons(buttons);
                }                
            }
        },
        getDefaultTemplate:function(options) {
            if(options && options.raw)
                return options.raw;
            var ret =
                   '  <div id="nis-button-list" class="nis-button-list col-sm-8"> </div>';
            return ret;
        },
        childViewOptions: function(model, index) {
            //console.log("childViewOptions: ", model);
            this.removeNulls(model.attributes);
            return {
                data: model.attributes,
                id: model.attributes.id,
            };
        },
        addItem:function(options) {
            var model = new Uic.ButtonItemModel(options);
            //console.log("addItem: ", model);
            this.collection.add(model);            
        },
        onAddChild: function(view){
            //console.log("onAddChild: ", view);
            view.on('click', this.onChildClick.bind(this));
        },
        makeButtons:function(buttons) {
            if(_.isArray(buttons)) {
                for(var i=0; i<buttons.length; i++) {
                    var btn = buttons[i];
                    if(buttons[i].data) 
                        btn = buttons[i].data;
                    var options = {
                        id:btn.buttonId,
                        class:btn.buttonClass,
                        data: {
                            text:btn.buttonTitle,
                        },
                    };
                    if(btn.icon) {
                        options.icon = btn.icon;
                    }
                    this.addItem(options);
                }                
            }
            else {
                if(buttons.buttonId) {
                    var options = {
                         buttonId:buttons.buttonId,
                    };
                    this.addItem(options);
                }
            }
        },
        onChildClick:function(text, button) {
            //console.log("onChildClick:", text, button, button.model.attributes.id);
            this.trigger('click', button.model.attributes.id, text, button);
        },
        setEnable:function(enable) {
            var models = this.collection.models;
            for(var i=0; i<models.length; i++) {
                models[i].set({enable:enable}); //attributes.enable = enable;
            }
        },
    });


})();
