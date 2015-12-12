
(function () {
    'use strict';


    //Uic.Backgrid = Uic.extend({
        Uic.Backgrid = Backbone.Marionette.Object.extend({
        pageableGrid:null,
        initialize: function (options) {
            this.pageableModel = this.makePageableModel(options.collection);
            options.collection = this.pageableModel;
            this.pageableGrid = new Backgrid.Grid(options);
            options.collection.fetch({reset:true});  
        },
        render: function() {
            return this.pageableGrid.render().el;
        },
        makePageableModel:function(collection) {
            var Model = Backbone.PageableCollection.extend(collection);
            return new Model();
            //var ret = new Backbone.PageableCollection(collection);
            //ret.model = collection.model;
            //ret.url = collection.url;
            //return ret;
        },
    });


})();
