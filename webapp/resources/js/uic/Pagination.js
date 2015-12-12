

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.PageItemModel = Backbone.Model.extend({
        defaults : {
            page:0,
            selected:false,
        }
    });

    Uic.PageItem = Uic.ItemView.extend({
        tagName: 'li',
        events: {
            'click ' : 'onClick',
        },
        modelEvents: {
            "change": "modelChanged"
        },
        //model:Uic.PageItemModel,
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.options = _.extend({
                raw:'<a pageNo="{{page}}">{{page}}</a>',
                data: {page:1},
            }, options);
            this.options.data.page = this.options.data.page+1;
            this.render();
        },
        compileTemplate: function(data) {
            //console.log("compileTemplate: ", data);
            var tpl = Handlebars.compile(data.raw)(data.data);
            return tpl;
        },
        onClick:function(options) {
            //console.log('onClick: ', options);
            this.trigger('click:pageItem', this.model, options);
        },
        modelChanged:function(options) {
            //console.log('modelChanged: ', options);
            if(this.model.attributes.selected)
                this.$el.addClass('active');
            else
                this.$el.removeClass('active');
        },
    });

    Uic.Pagination = Uic.CompositeView.extend({
        collection:null,
        tagName: 'ul',
        className: 'pagination',
        childView: Uic.PageItem,
        childEvents: {
            'click:pageItem':'onPageItemClick',
        },
        modelEvents: {
            "change": "modelChanged" // equivalent to view.listenTo(view.model, "change:name", view.nameChanged, view)
        },
        pageCount:0,
        currentPage:0,
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.initOptions(options);
            this.collection = new Backbone.Collection();
        },
        initOptions:function(options) {
            this.options = _.extend({
                raw:'',
                data: {
                },
                totalCount:0,
                pageSize:0,
                pageCount:0,
                currentPage:0,
            }, options);
        },
        setRegion:function(region) {
            this.options.region = region;
        },
        childViewOptions: function(model, index) {
            return {
                data: {page:index},
            };
        },
        addChild: function(child, ChildView, index) {
            var view = Backbone.Marionette.CompositeView.prototype.addChild.call(this, child, ChildView, index);
            if(child.attributes.page == this.options.currentPage) {
                view.$el.addClass('active');
                child.attributes.selected = true;
            }
            else  {
                view.$el.removeClass('active');
                child.attributes.selected = false;
            }
            return view;
        },
        setTableCollection:function(tableCollection) {
            this.tableCollection = tableCollection;
            this.options.totalCount = this.receiveTotalCount();
            if(this.tableCollection) {
                if(this.options.pageSize <= 0) {
                    if(this.tableCollection.getPageSize) {
                        this.setPageSize(this.tableCollection.getPageSize());
                    }
                }
                this.tableCollection.bind("add", this.onAddItem, this);
                this.tableCollection.bind("remove", this.onRemoveItem, this);
                this.tableCollection.bind("reset", this.onResetItem, this);
            }
        },
        setPageSize:function(size) {
            this.options.pageSize = size;
        },
        receiveTotalCount:function() {
            if(this.tableCollection) {
                if(this.tableCollection.getCount) {
                    this.tableCollection.getCount(this.getQueryOption(), this.resetPageCount.bind(this));
                }
                return this.tableCollection.length;
            }
            return 0;
        },
        resetPageCount:function(value) {
            // if(this.options.totalCount != value) {
                this.options.totalCount = value;
                this.collection.reset();
                var pageCount = this.getPageCount();
                for(var i=0; i<pageCount; i++) {
                    this.addPage(true, i);
                }
                if(pageCount > 0) {
                    this.show(true, this.options.region);
                }
                else {
                    this.show(false, this.options.region);
                }
            // }
        },
        onAddItem:function(options) {
            console.log("onAddItem: ", options);
            this.receiveTotalCount();
            //this.options.totalCount++;
            //this.addPage(true);
            //this.show(true, this.options.region);
        },
        onRemoveItem:function(options) {
            console.log("onRemoveItem: ", options);
            this.receiveTotalCount();
            //this.options.totalCount--;
        },
        show:function(isShow, region) {
            if(isShow) {
                region.show(this);
            }
            else {
                region.empty();
            }
        },
        addPage:function(isAdd, pageNo) {
            if(this.options.pageSize <= 0)
                return;
            if(isAdd) {
                var newPageNo = parseInt(this.options.totalCount/this.options.pageSize);
                if(! _.isUndefined(pageNo))
                    newPageNo = pageNo;
                this.collection.add(new Uic.PageItemModel({page:newPageNo}));
            }
        },
        onPageItemClick:function(view, model, options) {
            //console.log('onPageItemClick: ', model, options);
            this.setCurrentPage(model.attributes.page);
        },
        setCurrentPage:function(pageNo) {
            //console.log('setCurrentPage: ', pageNo);
            this.tableCollection.getList(this.getQueryOption(), pageNo, this.options.pageSize);
            this.collection.each(function(m) {
                console.log('setCurrentPage: item.', m);
                if(m.attributes.page == pageNo)
                    m.set({selected:true});
                else
                    m.set({selected:false});
            });
            this.options.currentPage = pageNo;
        },
        getPageOptions:function(options) {
            options = options || {};
            options.queryParam = options.queryParam || {};
            options.queryParam.page = this.options.currentPage;
            options.queryParam.size = this.options.pageSize;
            return options;
        },
        getPageCount:function() {
            if(this.options.pageSize > 0){
                var pageCount = parseInt(this.options.totalCount/this.options.pageSize);
                var isTight = parseInt(this.options.totalCount%this.options.pageSize);
                if(pageCount == 0){
                    return 1;
                }
                else if(isTight == 0){
                    return pageCount;
                }
                else{
                    return pageCount+1;
                }
                return 
            }
            return 0;
        },
        setQueryOption:function(options) {
            this.options.queryQueryOption = options;
        },
        getQueryOption:function() {
            if(! _.isUndefined(this.options.queryQueryOption))
                return this.options.queryQueryOption;
            return null;
        },
    });

})();
