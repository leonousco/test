/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	Nis.View.HospitalTop = Nis.View.MainTopLayout.extend({
        collection:new Nis.Model.OrganizationList(),
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.MainTopLayout.prototype.initialize.call(this, {id:'HospitalTop'});
            this.showTitle("병원 목록");
            this.showSearch();
            this.showTable();
		},
        makeSearch:function(options) {
            var view = new Nis.View.OrgSearchControl({
                collection:this.getCollection(),
            });
            view.initView();
            //view.on('onClickSearch', this.onClickSearch.bind(this));
            view.on('onChange', this.onChangeSearch.bind(this));
            return view;
        },
        /*
        makeSearch:function(options) {
            var view = new Nis.View.HospitalSearchControl();
            view.on('onClickSearch', this.onClickSearch.bind(this));
            return view;
        },
        */
        makeTable:function(options) {
            var columns = (new Nis.UiInfo.ItemUtil({items:Nis.Model.OrganizationColumns})).select(['id', 'oid', 'name', 'address']);
            var options = {
                collection:this.getCollection(),
                columns:columns,
            };
            var table = new Uic.Table(options);
            table.on(Uic.Table.ItemClick, this.onClickTableItem.bind(this));
            var view = new Uic.TableView();
            view.setTable(table);
            view.setCurrentPage(0);
            return view;
        },
        onClickTableItem:function(model, view, options){
            console.log("onClickTableItem:");
            this.trigger('click.mainTable', model);
        },
        onClickSearch:function(params){
            console.log("onClickSearch:", params);
            //var patientCollection = new Nis.Model.OrganizationList();
            var options = {};
            options.success = this.onSuccessSearch.bind(this);
            options.error = this.onErrorSearch.bind(this);
            //var collection = this.result.currentView.getCollection();
                options.hasQuery = true;
                options.queryParam = params;
                this.getTable().getTable().getCollection().getPagedList(options);
        },
        onSuccessSearch:function(response) {
            console.log("onSuccessSearch:", response);
            var result = response;
            if(response.body)
                result =response.body;
            //this.showTable(result);
            this.getTable().getTable().getCollection().reset(result);
        },
        onErrorSearch:function(options) {
            console.log("onErrorSearch:", options);
        },
    }) //end of Nis.View.HospitalTop

    _.extend(Nis.View.HospitalTop.prototype, Nis.View.HasMPISearchControl);

})();

