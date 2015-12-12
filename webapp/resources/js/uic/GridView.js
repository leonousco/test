

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.GridView = Backbone.View.extend({
        param:null,
        grid:null,
        gridEid:"NisGridBone",

        initialize: function (param) {
            console.log("initialize:");
            param.containerId = "#"+this.gridEid;
            var tt = this.template();
            $(this.el).html(this.template());
            this.makeGrid(param);
                var footerView = this.$(param.containerId);
                //this.buttonsView = new Uic.ButtonGroup(param);
                $(footerView).append($(this.grid.el));
        },
        template:function(data) {
            var raw = '<div id="NisGridBone"></div>';
            return _.template(raw)(data);
        },
        render: function () {
            return this;
        },
        setParam:function(param) {
        },
        makeGrid:function(param) {
            this.grid = new bbGrid.View({
                container: $(param.containerId),
                rows: param.rows,
                rowList: param.rowList,
                collection: new Backbone.Collection(),
                colModel: param.colModel,
                onRowClick: param.onRowClickCb,
              });
        },
    });

//       this.grid.collection.reset([
//        {
//            "name": "Valeria",
//               "id":"dsfhkjsf",
//            "links": "<a>Do this</a>"
//        },
//        {
//            "name": "Zoe",
//            "id":"dsfhkjsf",
//            "links": "<a>Do this</a>"
//        },
//        {
//            "name": "Autumn",
//            "id":"dsfhkjsf",
//            "links": "<a>Do this</a>"
//        },
//        {
//            "name": "Brianna",
//            "id":"dsfhkjsf",
//            "links": "<a>Do this</a>"
//        },
//        {
//            "name": "Aubrey",
//            "id":"dsfhkjsf",
//            "links": "<a>Do this</a>"
//        }
//    ]);
});
