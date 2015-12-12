

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.Radio = Uic.ItemView.extend({
        modelEvents: {
            "change": "modelChanged"
        },
        modelChanged:function(options) {
            console.log('modelChanged: ', options);
            if(this.model.attributes.selected) {
                this.$el.find('input').addClass('checked');
                this.$el.find('input').attr('checked', true);
            }
            else {
                this.$el.find('input').removeClass('checked');
                if(options.readOnly) {
                    this.$el.find('input').attr('checked', false);
                    this.$el.find('input').attr('disabled', 'disabled');
                }
                else
                    this.$el.find('input').attr('checked', false);
            }
        },
    });


    Uic.RadioItemModel = Backbone.Model.extend({
        defaults : {
            id:null,
            selected:false,
            value:null,
            readOnly:false,
            //conceptId:null,
        },
        initialize:function(options) {
            this.options = _.extend({
                id:null,
                tagName:'label',
                className:"radio-inline",
                raw:'<input type="{{type}}" name="{{name}}"  dbid="{{dbid}}"  value="{{value}}" conceptId="{{conceptId}}" {{checked}}> {{text}}',
                data: {
                    text:null,
                    name:'optradio',
                    type:'radio',
                    checked:'',
                },
                childView:Uic.Radio,
                concept:null,
            }, options);
            this.applyConcept();
            //console.log("initialize: ", this.options);
        },
        applyConcept:function() {
            if(this.options.concept == null)
                return;
            var data = this.options.data;
            data.text = this.options.concept.displayName;
            //data.name = this.options.concept.conceptId;
            data.value = this.options.concept.code;
            this.attributes.value = data.value;
            data.conceptId = this.options.concept.conceptId;
        },
        getUiInfo:function() {
            return this.options;
        },

    });

    _.extend(Uic.RadioItemModel.prototype, Nis.Model.ConceptMixin);

    Uic.RadioView = Uic.CompositeView.extend({
        collection:null,
        events: {
            'change input[type=radio]': 'changedRadio'
        },
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.initOptions(options);
            this.renderView();
            this.collection = new Backbone.Collection();
            if(options.conceptId) {
                var loadOption = {
                    success:this.onConceptSet.bind(this),
                    error:this.onConceptSetError.bind(this),
                };
                NisMVC.code.getConceptSet(options.conceptId, loadOption);
            }
            else if(options.items) {
                this.makeChild(options.items);
            }
        },
        onConceptSet:function(conseptSet, conceptId) {
            for(var i=0; i<conseptSet.length; i++) {
                var item = {concept:conseptSet[i], name:conceptId};
                if(this.options.readOnly) {
                    item.readOnly = this.options.readOnly;
                }
                this.addItem(item);
            }
        },
        onConceptSetError:function() {
        },
        childViewOptions: function(model, index) {
            //console.log("childViewOptions: ", model);
            var options = model.getUiInfo();
            var data = $.extend(options.data, model.attributes);
            options.data = data;
            options.data.dbid = this.options.dbid;
            options.concept = model.getConcept();
            /*
            if(index == 0) {
                options.data.checked = 'checked';
            }
            else {
                options.data.checked = '';
            }
            */
            return options;
        },
        addChild: function(child, ChildView, index) {
            var childView = child.getUiInfo().childView;
            return Backbone.Marionette.CompositeView.prototype.addChild.call(this, child, childView, index);
        },
        addItem:function(options) {
            var model = new Uic.RadioItemModel(options);
            //console.log("addItem: ", model);
            this.collection.add(model);
            this.render();
            return model;
        },
        onAddChild: function(view){
            //console.log("onAddChild: ", view);
            view.on('click', this.onChildClick.bind(this));
        },
        onChildClick:function(text, button) {
            //console.log("onChildClick:", text, button, button.model.attributes.id);
            this.trigger('click', button.model.attributes.id, text, button);
        },
        makeChild:function(items) {
            for(var i=0; i<items.length; i++) {
                this.addItem(items[i]);
            }
        },
        changedRadio: function(event) {
            var value = $(event.currentTarget).attr('value');
            this.$el.val(value);
            var name = $(event.currentTarget).attr('name');
            this.trigger('click.radio', value, name, $(event.currentTarget));
        },
        setValue:function(value) {
            this.$el.val(value);
            var model = this.collection.findWhere({value:value});
            if(model)
                model.set('selected', true);
        },
        getValue:function() {
            return this.$el.val();
        },
    });


})();
