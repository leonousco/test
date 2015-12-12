
(function () {
    'use strict';

    Uic.TableItemModel = Backbone.Model.extend({
        defaults: {
        },
    });

    Uic.TableItem = Uic.ItemView.extend({
        tagName: 'tr',
        events: {
            'click ' : 'onClick',
        },

        modelEvents: {
            "change": "modelChanged"
        },
        collectionEvents: {
            "add": "modelAdded" 
        },
        modelChanged:function(options) {
            //console.log("modelChanged: ", options);
            this.trigger('TableItem:modelChanged', options);
        },
        modelAdded:function(options) {
            console.log("modelAdded: ", options);
        },


        initialize: function (options) {
            //console.log("initialize: ", options);
            this.options = _.extend({
                raw:'',
                data: {},
            }, options);
            this.render();
            this.$el.mouseenter(function(){
                //if($(this).hasClass('highlight')) {
                    $(this).css('background', '#ddf2f5');
                //}
            });
            this.$el.mouseleave(function(){
                if($(this).hasClass('highlight'))
                    $(this).css('background', '#90c1e6');
                else
                    $(this).css('background', 'white');
            });                
        },
        compileTemplate: function(data) {
            //console.log("compileTemplate: ", data);
            var tpl = Handlebars.compile(data.raw)(data.data);
            return tpl;
        },
        templateHelpers: function (data) {
            //console.log("templateHelpers: ", data);
        },
        onClick:function(options) {
            //console.log('onClick: ', options);
            this.$el.siblings().css('background', 'white');
            this.$el.addClass('highlight').siblings().removeClass('highlight');
            this.$el.css('background', '#90c1e6');
            if(this.cbOnClick) {
                this.cbOnClick(itemName);
            }
            this.trigger('TableItem:click', this.model, options);
        },
    });

    Uic.Table = Uic.CompositeView.extend({
        collection:null,
        tagName: 'table',
        className: 'table',
        triggerSelected:null,
        childView: Uic.TableItem,
        ui: {
            button: '.button',
        },
        events: {
            'click [type="checkbox"]' : 'onCheckBoxClick',
            'click [type="type_id"]' : 'onIdClick',
            'click [type="type_button"]' : 'onButtonClick',
        },
        triggers: {
        },
        childEvents: {
            'TableItem:click':'onItemClick',
            'TableItem:modelChanged':'modelChangedFromItemView',
        },
        modelEvents: {
            "change": "modelChanged" // equivalent to view.listenTo(view.model, "change:name", view.nameChanged, view)
        },
        collectionEvents: {
            "add": "modelAdded" // equivalent to view.listenTo(view.collection, "add", view.itemAdded, view)
        },
        modelChangedFromItemView:function(options, model) {
            //console.log("modelChanged: ", options, ", model:", model);
            this.trigger("modelChanged", model, this.collection);
        },
        modelChanged:function(options) {
            //console.log("modelChanged: ", options);
        },
        modelAdded:function(options) {
            //console.log("modelAdded: ", options);
        },
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.options = _.extend({
                raw:null,
                data: {
                },
                itemTemplate:{
                    raw:'<td>{{id}}</td>',
                },
                collectionInfo: {
                    model:Uic.TableItemModel,
                    url:'http://localhost:8080',
                    state:{
                        pageSize:10,
                    },
                },
            }, options);
            this.$el.css("table-layout", "fixed");

            this.triggerSelected = Uic.Table.triggerSelected;
            if(this.options.columns && _.isArray(this.options.columns)) {
                this.options.raw = '<thead><tr style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">';
                this.options.itemTemplate.raw = '';
                for(var i=0; i<this.options.columns.length; i++) {
                    if(this.options.columns[i].name) {
                        this.options.columns[i].dbid = this.options.columns[i].name;
                    }
                    var dbid = this.options.columns[i].dbid;
                    this.options.raw +=  '<th>';
                    this.options.raw +=  this.options.columns[i].label;
                    this.options.raw +=  '</th>';
                    if(this.options.columns[i].cell && this.options.columns[i].cell === 'checkbox') {
                        this.options.itemTemplate.raw += '<td>';
                        this.options.itemTemplate.raw += this.options.columns[i].label;
                        this.options.itemTemplate.raw += '</td>';
                    }
                    else if(this.options.columns[i].cell && (this.options.columns[i].cell === 'id' || this.options.columns[i].cell === 'button')){
                        this.options.itemTemplate.raw += '<td>';
                        this.options.itemTemplate.raw += this.options.columns[i].content;
                        this.options.itemTemplate.raw += '</td>';
                    }
                    else {                                
                        this.options.itemTemplate.raw += '<td style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{';
                        this.options.itemTemplate.raw += dbid;
                        this.options.itemTemplate.raw += '}}</td>';
                    }
                    var conceptId = this.options.columns[i].conceptId; 
                    if(conceptId) {
                        if(_.isUndefined(this.conceptSetUtil)) {
                            this.conceptSetUtil = new Nis.ConceptSetUtil();
                        }
                        this.conceptSetUtil.addConcept(conceptId, dbid);
                    }
                }
                this.options.raw += '</tr></thead>';                    
            }
            if(this.options.collection) {
                if(this.collection)
                    this.collection = this.options.collection;
                else
                    this.collection = this.options.collection;
            }
            else {
                this.collection = new Nis.Collection();
                this.collection.model = this.options.collectionInfo.model;
                this.collection.url = this.options.collectionInfo.url;
            }

            if(this.options.childView) {
                this.childView = this.options.childView;
            }
        },
        fetch: function() {
            this.collection.fetch();
        },
        addModel: function(model) {
            this.collection.add(model);
        },
        onItemClick:function(view, model, options) {
            //console.log("onItemClick: ", options);
            this.trigger(Uic.Table.ItemClick, model, view, options);
        },
        childViewOptions: function(model, index) {
            var ret = {
                raw:this.options.itemTemplate.raw,
            }
            if(this.conceptSetUtil) {
                ret.data = this.conceptSetUtil.getDisplayNames(model.attributes);
            }
            else{
                ret.data = model.attributes;
            }
            return ret;
        },
        /*
        onRender: function(options) {
            console.log("onRender: ", options);
            //this.$el.after("<p>Test onChildviewAddChild </p> ");
        },
        */
        onChildviewAddChild:function(options) {
            //console.log("onChildviewAddChild: ", options);
        },
        getCollection:function() {
            return this.collection;
        },
        fetchList:function(options) {
            if(! _.isUndefined(this.options.queryParam)) {
                options.hasQuery = true;
                options.queryParam = options.queryParam || {};
                options.queryParam = _.extend(options.queryParam, this.options.queryParam);
            }
            this.getCollection().getPagedList(options);
        },
        setQueryParam:function(options) {
            this.options.hasQuery = true;
            this.options.queryParam = options;
        },
        getQueryParam:function() {
            if(! _.isUndefined(this.options.queryParam))
                return this.options.queryParam;
            return null;
        },
        getQueryOption:function() {
            var options = {};
            if(this.options.hasQuery)
                options.hasQuery = this.options.hasQuery;
            options.queryParam = this.getQueryParam();
            return options;
        },                
        onCheckBoxClick:function(event){
            var checkBox = $(event.currentTarget);
            var checkBoxId = $(checkBox).attr("modelid");
            var model = this.collection.get(checkBoxId);
            console.log("checkbox clicked", checkBoxId, model);
            this.trigger('click.checkbox', checkBoxId, model, checkBox);
        },
        onIdClick:function(event){
            var id = $(event.currentTarget);
            var idId = $(id).attr("modelid");
            var model = this.collection.get(idId);
            console.log("clicked id", idId);
            this.trigger('click.id', idId, model, id);
        },
        onButtonClick:function(event){
            this.trigger('click.button', event);
        },
    });

    Uic.Table.ItemClick = 'click:table:item';


})();
