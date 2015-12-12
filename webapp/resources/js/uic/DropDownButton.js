

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.DropDownItemModel = Backbone.Model.extend({
        defaults: {
            item_name: '',
        },
        modelId: function(attrs) {
            return Uic.DropDownItemModel.getModelId();
        },
    });

    Uic.DropDownItemModel.getModelId = function() {
        return 'Uic.DropDownItemModel';
    };

    Uic.DropDownButtonCollection = Backbone.Collection.extend({
        model: Uic.DropDownItemModel,
    });


    Uic.DropDownItem = Uic.ItemView.extend({
        tagName: 'li',
        events: {
            'click ' : 'onClick',
        },
        cbOnClick:null,
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.options = _.extend({
                raw:'{{text}}',
                //raw:'<input type="radio" id="ID" name="{{text}}" value="{{text}}"><label for="ID">{{text}}</label>',
                data: {
                    text:'',
                },
            }, options);
            this.render();
        },
        compileTemplate: function(data) {
            //console.log("compileTemplate: ", data);
            var tpl = Handlebars.compile(data.raw)(data.data);
            return tpl;
        },
        templateHelpers: function (data) {
            //console.log("templateHelpers: ", data);
        },
        setClickListener:function(cb) {
            this.cbOnClick = cb;
        },
        onClick:function(options) {
            //var itemName = this.model.attributes.item_name;
            var itemName = $(options.target).text();
            //console.log('onClick: ', " ", itemName, " ", options);
            if(this.cbOnClick) {
                this.cbOnClick(itemName);
            }
            this.trigger('DropDownItem:selected', itemName, options);
        },
        onBeforeRender: function() {
            //console.log("onBeforeRender: ", "model:", this.model);
        },
    });



    Uic.DropDownItems = Uic.CompositeView.extend({
        tagName: 'ul',
        childView: Uic.DropDownItem,
        className:'dropdown-menu',
        childEvents: {
            'DropDownItem:selected' : 'onItemSelected',
        },
        initialize: function (options) {
            this.options = _.extend({
                raw:'{{text}}',
                data: {
                    text:'',
                },
            }, options);
            if(this.options.collection) {
                this.collection = this.options.collection;
            }
            else {
                this.collection = new Backbone.Collection();
            }
            this.render();
        },
        addItem:function(name, options) {
            //console.log("addItem: ", " name: ", name);
            if(options) {
                options.data = options.data || {};
                options.data.text = name;
            }
            this.addModelItem(new Uic.DropDownItemModel(), options);
            //this.render();
        },
        onBeforeRender: function() {
            //console.log("onBeforeRender: ", "model:", this.model);
        },
        onAddChild: function(view){
            //console.log("onAddChild: ", view);
        },
        onItemSelected:function(child, name, options) {
            //console.log("onItemSelected: ", name, " ,options:", options);
            this.trigger('selected:DropDownItems', name, options);
        },
    });


    Uic.DropDownButton = Uic.CompositeView.extend({
        collection:null,
        tagName: 'div',
        className: 'btn-group',
        buttonView:null,
        itemsView:null,
        buttonModel:null,
        itemsModel:null,
        triggerSelected:null,
        ui: {
            button: '.button',
        },
        triggers: {
        },
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.options = _.extend({
                raw:'{{text}}',
                data: {
                    text:'',
                },
                button: this.getDefaultButton(),
            }, options);

            this.triggerSelected = Uic.DropDownButton.triggerSelected;
            this.collection = new Backbone.Collection();
            this.buttonModel = new Uic.SButtonModel();
            this.addModelItem(this.buttonModel, this.options.button);

            this.buttonView = new Uic.SButton(this.options.button);
            this.buttonView.render();
            this.itemsView = new Uic.DropDownItems()
            var self = this;
            this.itemsView.on('selected:DropDownItems', function(name, options){
                //console.log("this.itemsView.on");
                self.onItemSelected(name, options);
            });
            this.itemsView.render();
        },

        onItemSelected:function(name, options) {
            //console.log("onItemSelected: ", name, " ,message:", options);
            var button = $(this.el).find('button');
            $(button).text(name);
            this.trigger(Uic.DropDownButton.triggerSelected, name, options);
        },
        showCollection: function() {
            //console.log("showCollection: ");
            this.$el.append(this.buttonView.el);
            this.$el.append(this.itemsView.el);
            //this.delegateEvents();
        },
        addItem:function(name, options) {
            //this.addModelItem(new Uic.Model({modelId:'Uic.DropDownItems'}), options);
            //console.log("addItem: =========== ", name, " ,options:", options);
            if(this.itemsView) {
                options = options || {};
                this.itemsView.addItem(name, options);
            }
        },
        getDefaultButton: function() {
            //console.log("getDefaultButton: ");
            return {
                raw: ' {{text}} <span class="caret"></span>',
                data:{
                    type:'button',
                    text:'Action',
               },
                attributes: {
                    'data-toggle':'dropdown',
                    'aria-haspopup':'true',
                    'aria-expanded':'false',
                    type:'button',
                },
                class:'btn btn-default dropdown-toggle',
           };
        },
    });

    Uic.DropDownButton.triggerSelected = 'selected:item';


})();
