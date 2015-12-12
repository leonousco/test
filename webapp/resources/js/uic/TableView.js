
(function () {
    'use strict';

    Uic.TableView = Uic.LayoutView.extend({
        regions: {
            table: '#table',
            pagination: '#paginator',
        },
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.initOptions(options);
            this.initRegions(options);
            this.renderLayout(options);
            if(this.options.table) {
                this.setTable(this.options.table);
            }
        },
        initOptions:function(options) {
            var defaultRaw = this.getDefaultTemplate();
            this.options = _.extend({
                raw:defaultRaw,
                data: {},
            }, options);
        },
        initRegions:function(options) {
            if(options.regions) {
                this.removeRegion('table');
                this.removeRegion('pagination');
                this.addRegions(options.regions);
            }
        },
        renderLayout:function() {
            var html = Handlebars.compile(this.options.raw)(this.options.data);
            $(this.el).html(html);
        },
        render:function() {
            return this;
        },
        getDefaultTemplate:function() {
                var ret = ''
                +'<div id="table" class="table table-condensed f11 table-hover table-responsive table-nowrap" style="table-layout:fixed;"> talbe'
                +'</div>            '
                +'<nav id="paginator"> '
                +'</nav>            ';
            return ret;
        },
        setTable:function(table) {
            table.setParentView(this);
            this.table.show(table);
            if(! this.options.paginator) {
                this.setPagination(new Uic.Pagination());
            }
            if(this.options.pageSize) {
                this.options.paginator.setPageSize(this.options.pageSize);
            }
            this.options.paginator.setQueryOption(table.getQueryOption());
            this.options.paginator.setTableCollection(this.getTableCollection());

        },
        getTable:function() {
            return this.table.currentView;
        },
        getCollection:function() {
            return this.getTableCollection();
        },
        getTableCollection:function() {
            var table = this.getTable();
            if(table) {
                return table.getCollection();
            }
            return null;
        },
        setPagination:function(paginator) {
            paginator.setRegion(this.pagination);
            this.options.paginator = paginator;
        },
        getPagination:function() {
            return this.options.paginator;
        },
        getCurrentPageNo:function() {
            return this.getPagination().currentPage;
        },
        fetchList:function(options) {
            if(this.options.paginator) {
                options = this.options.paginator.getPageOptions(options);
            }
            this.getTable().fetchList(options);
        },
        onChildviewChildviewTableItemClick:function(table, itemView, model, options) {
            //console.log("onChildviewChildviewTableItemClick: ", model);
            var view = table.getParentView();
            view.trigger("itemClick", view, model, options);
        },
        setCurrentPage:function(pageNo) {
            //console.log("setCurrentPage: ", pageNo);
            this.options.paginator.setCurrentPage(pageNo);
        },
    });

})();
